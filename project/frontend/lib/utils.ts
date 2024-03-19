import { clsx, type ClassValue } from "clsx";
import {
  addMinutes,
  format,
  isAfter,
  isBefore,
  parseISO,
  subDays,
  subMonths,
} from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isMoreThan6MonthsOrLessThan1Day = (dateString: any) => {
  const currentDate = new Date();
  const targetDate = dateString;

  // Check if the date is more than 6 months away
  const sixMonths = subMonths(targetDate, 6);
  const isMoreThan6Months = isBefore(currentDate, sixMonths);

  // Check if the date is less than 1 day ago
  const oneDayAhead = subDays(targetDate, 1);
  const isLessThan1Day = isAfter(currentDate, oneDayAhead);

  return isMoreThan6Months || isLessThan1Day;
};

export function convertISOToSGTObject(isoDateTimeStr: string) {
  // Parse ISO datetime string
  const dateTime = parseISO(isoDateTimeStr);

  // Singapore Timezone Offset from UTC (in minutes)
  const sgtOffset = +8 * 60;

  // Add the offset to the datetime
  const sgtDateTime = addMinutes(dateTime, sgtOffset);

  // Extract components
  const sgtYear = sgtDateTime.getFullYear();
  const sgtMonth = sgtDateTime.getMonth() + 1; // Month is 0-indexed
  const sgtDay = sgtDateTime.getDate();
  const sgtHour = sgtDateTime.getHours();
  const sgtMinute = sgtDateTime.getMinutes();
  const sgtSecond = sgtDateTime.getSeconds();

  // Create an object representing the datetime in Singapore Timezone (SGT)
  const sgtDateTimeObj = {
    year: sgtYear,
    month: sgtMonth,
    day: sgtDay,
    hour: sgtHour,
    minute: sgtMinute,
    second: sgtSecond,
  };

  return sgtDateTimeObj;
}

export function convertISOToSingaporeTime(isoTimestamp: string): string {
  // Parse ISO timestamp
  const timestamp = parseISO(isoTimestamp);

  // Convert to Singapore time (UTC+8)
  const singaporeTime = new Date(timestamp.getTime() + 8 * 60 * 60 * 1000); // Adding 8 hours for Singapore time

  // Format the time
  const sgTime = format(singaporeTime, "HH:mm:ss");

  return sgTime;
}

// TODO: REMOVE THIS TO REPLACE WITH BACKEND LOGIC
export const sortByStartTimeAndFilterPast = (events: Event[]): Event[] => {
  // Filter out events that are earlier than today's date
  const currentDate = new Date();
  const filteredEvents = events.filter(
    // @ts-ignore
    (event) => new Date(event.startTime) >= currentDate
  );

  // Sort remaining events by start time
  return filteredEvents.sort((a, b) => {
    // @ts-ignore
    const startTimeA = new Date(a.startTime);
    // @ts-ignore
    const startTimeB = new Date(b.startTime);
    return startTimeA.getTime() - startTimeB.getTime();
  });
};
