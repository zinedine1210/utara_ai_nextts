import dynamic from 'next/dynamic';
import React, { useState } from 'react'
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


export default function BasicBar() {

    const [data, setData] = useState({
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    })

  return (
    <div className="bg-white dark:bg-darkPrimary rounded-md p-5 shadow-md w-full">
        <div className="row">
            <div className="mixed-chart">
            <Chart
                options={data.options}
                series={data.series}
                type="bar"
                className="w-full"
            />
            </div>
        </div>
    </div>
  )
}
