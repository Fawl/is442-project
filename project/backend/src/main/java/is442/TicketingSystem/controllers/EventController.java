package is442.TicketingSystem.controllers;

import is442.TicketingSystem.models.*;
import is442.TicketingSystem.services.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/event")
public class EventController {

	@Autowired
	protected EventRepository eventRepository;

	// ALL ?
	@GetMapping("/all")
	public ResponseEntity<List<Event>> getAll(@RequestParam(required = false) Long id) {
		if (Objects.isNull(id)) {
			return ResponseEntity.ok(eventRepository.findAll());
		} else {
			try {
				return ResponseEntity.ok(eventRepository.findByCreatedBy(id));
			} catch (Exception e) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Shit aint work: " + e.getMessage());
			}
		}
	}

	// ALL
	// TODO: Might need to consider getting registerable events OR future events,
	// unless its done by frontend ofc
	// This one is just taking within 6 months of RIGHT NOW or within 6 months of
	// starting datetime
	@GetMapping("/dates")
	public List<Event> findOngoing(
			@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-ddThh:mm:ss") LocalDateTime before,
			@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-ddThh:mm:ss") LocalDateTime after) {
		if (Objects.isNull(after)) {
			after = LocalDateTime.now();
		}

		if (Objects.isNull(before)) {
			before = after.plusMonths(6);
		}

		return eventRepository.findByStartTimeAfterAndEndTimeBeforeAndCancelledFalse(after, before);
	}

	// ALL
	@GetMapping("/{date}")
	public List<Event> findByPublishedDateAfter(
			@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDateTime date) {
		return eventRepository.findByOngoingEvents(date);
	}

	@GetMapping("/report")
	public ResponseEntity<byte[]> createReport(@RequestParam Long id) {
		Optional<Event> ev = eventRepository.findById(id);

		if (!ev.isPresent()) return ResponseEntity.notFound().build();

		List<Ticket> tickets = ev.get().getTickets();
        Workbook wb = new XSSFWorkbook();
        Sheet sheet = wb.createSheet(ev.get().getTitle());

		// Headerstyle
		CellStyle headerStyle = wb.createCellStyle();
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        headerStyle.setWrapText(true);
        headerStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        Font headerFont = wb.createFont();
        headerFont.setFontHeightInPoints((short) 16);
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
		headerStyle.setBorderBottom(BorderStyle.THICK);

        Row headerRow = sheet.createRow(0);
        String[] columns = {"Customer Name",
							"Customer Email",
							"Ticket Id",
							"Redeemed Status",
							"Purchase Date",
							"Ticket Price / $"};
        for (int i = 0; i < columns.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(columns[i]);
			cell.setCellStyle(headerStyle);
        }


		// Data rows
        int rowNum = 1;
		int revenue = 0;
        for (Ticket ticket : tickets) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(ticket.getBoughtBy().getName());
            row.createCell(1).setCellValue(ticket.getBoughtBy().getEmail());
            row.createCell(2).setCellValue(ticket.getId());

			revenue += ticket.getPrice();
			String redeemed = "";
			if (ticket.getRedeemed()) {
				redeemed = "attended";
			} else if (ticket.getRefunded()) {
				redeemed = "refunded";
				revenue -= ticket.getPrice();
			}

            row.createCell(3).setCellValue(redeemed);
            Cell date = row.createCell(4);
			date.setCellValue(ticket.getPurchaseTime().format(DateTimeFormatter.ofPattern("HH:mm:ss dd-MM-yyyy")));

            row.createCell(5).setCellValue(ticket.getPrice());
        }



		// Summary
		CellStyle summaryStyle = wb.createCellStyle();
		summaryStyle.cloneStyleFrom(headerStyle);
		summaryStyle.setBorderBottom(BorderStyle.THIN);
		summaryStyle.setBorderTop(BorderStyle.THIN);
		summaryStyle.setFillForegroundColor(IndexedColors.BRIGHT_GREEN.getIndex());

		rowNum++;
		int totalTicekts = tickets.size();
		Row row = sheet.createRow(rowNum++);
		Cell summaryLabel = row.createCell(4);
		summaryLabel.setCellValue("Total");
		summaryLabel.setCellStyle(summaryStyle);
		row.createCell(5).setCellValue(totalTicekts);
		
		row = sheet.createRow(rowNum++);
		summaryLabel = row.createCell(4);
		summaryLabel.setCellValue("Refunded");
		summaryLabel.setCellStyle(summaryStyle);
		tickets.removeIf((ele) -> ele.getRefunded());
		row.createCell(5).setCellValue(totalTicekts - tickets.size());

		row = sheet.createRow(rowNum++);
		summaryLabel = row.createCell(4);
		summaryLabel.setCellValue("Revenue");
		summaryLabel.setCellStyle(summaryStyle);
		row.createCell(5).setCellValue(revenue);

		// Some formatting
		for (int i = 0; i < columns.length; i++) {
            sheet.autoSizeColumn(i);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

		try {
			wb.write(outputStream);
			wb.close();
		} catch (Exception e) {
			System.out.println("Error in processing excel: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
		}

		LocalDateTime today = LocalDateTime.now();
		String todayFormat = String.format("%d_%d_%d", today.getDayOfMonth(), today.getMonth().getValue(), today.getYear());

        // Set response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("filename", String.format("report-ev%d-%s.xlsx", ev.get().getId(), todayFormat));

        // Return the Excel file as byte array
        return ResponseEntity
                .ok()
                .headers(headers)
                .body(outputStream.toByteArray());
	}
	

	// er fuck it
	@GetMapping
	public ResponseEntity<Optional<Event>> getEvent(@RequestParam long id) {
		Optional<Event> res = eventRepository.findById(id);
		return new ResponseEntity<Optional<Event>>(res, res.isPresent() ? HttpStatus.OK : HttpStatus.NOT_FOUND);
	}

}
