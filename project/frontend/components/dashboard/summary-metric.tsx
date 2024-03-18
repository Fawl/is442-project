import React from 'react'

export default function SummaryMetrics({ metricName, metricValue }: any) {
    return(
        <div className="mt-3 text-center sm:ml-0 sm:mt-0 sm:text-left border rounded-lg border-gray-300 p-4 shadow-md">
        <div className="text-base text-gray-500">
            {metricName}
        </div>
        <div className="mt-2">
          <p className="text-2xl">{metricValue}</p>
        </div>
      </div>
    )
}