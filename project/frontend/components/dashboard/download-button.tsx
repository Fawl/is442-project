export default function DownloadButton({ summaryMetrics, revenueByMonth, eventList }: any) {
    const generateCsv = (summaryMetrics: any, revenueByMonth: any, eventList: any) => {
        const formatDate = (dateString: string) => {
            return dateString.substring(0, 10)
        }

        const formatDuration = (start: string, end: string) => {
            return `${start.substring(11, 19)}-${end.substring(11, 19)}`
        }

        const objectToCSV = (data: { eventName: any ;priceSum: any ;ticketsSold: any ;ticketsrefunded: any ;venue: any ;start_time: string ;end_time: string ;purchaseTime: any[] }) => {
            const eventName = data.eventName
            const priceSum = data.priceSum
            const ticketsSold = data.ticketsSold
            const refunded = data.ticketsrefunded
            const venue = data.venue
            const eventDate = formatDate(data.start_time)
            const duration = formatDuration(data.start_time, data.end_time)
            const purchaseTime = data.purchaseTime.join('|')
            return `${eventName},${priceSum},${ticketsSold},${refunded},${venue},${eventDate},${duration},${purchaseTime}`
        }

        const summaryMetricsHeading = "totalRevenue,ticketsSold,averageTicketPrice"
        const summaryMetricsRow = `${summaryMetrics.totalRevenue},${summaryMetrics.ticketsSold},${summaryMetrics.averageTicketPrice}`
        const revenueByMonthHeading = "jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec"
        const revenueByMonthRow = revenueByMonth.map((obj: any) => `${obj.revenue}`).join(',')
        const headings = "eventName,priceSum,ticketsSold,refunded,venue,eventDate,duration,ticketPurchasedTime"
        const csvData = [summaryMetricsHeading, summaryMetricsRow, '', revenueByMonthHeading, revenueByMonthRow, '', headings, ...eventList.map(objectToCSV)].join('\n')

        const blob = new Blob([csvData], { type: 'text/csvcharset=utf-8' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'EventSalesDashboard.csv')
        link.click()

        URL.revokeObjectURL(url)
    }

    return (
        <div className="flex flex-row-reverse">
            <button
                type="button"
                className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                onClick={() => generateCsv(summaryMetrics, revenueByMonth, eventList)}
            >
                Generate CSV
            </button>
        </div>
    )
}