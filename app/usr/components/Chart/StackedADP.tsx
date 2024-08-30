import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


export default function StackedADP({ judul, value }: {
    judul: string,
    value?: any
}) {
    const { theme, setTheme } = useTheme()
    const [themeNow, setThemeNow] = useState<string | undefined>("light")
    const [data, setData] = useState<any>(null)
    
    const option = [
        { label:"IDR", icon:"Rp", value:"IDR" },
        // { label:"USD", icon:"$", value:"USD" },
        // { label:"THB", icon:"฿", value:"THB" },
        // { label:"SGD", icon:"$", value:"SGD" }
    ]

    const [select, setSelect] = useState("IDR")

    useEffect(() => {
        let obj = {
            series: [{
                name: 'QR',
                data: [44, 55, 41, 67, 22, 43]
            }, {
                name: 'PRODUCT B',
                data: [13, 23, 20, 8, 13, 27]
            }, {
                name: 'PRODUCT C',
                data: [11, 17, 15, 15, 21, 14]
            }, {
                name: 'PRODUCT D',
                data: [21, 7, 25, 13, 22, 8]
            }],
            options : {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: true
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                        }
                    }
                }],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        borderRadius: 10,
                        dataLabels: {
                        total: {
                            enabled: true,
                            style: {
                            fontSize: '13px',
                            fontWeight: 900
                            }
                        }
                        }
                    },
                },
                xaxis: {
                    type: 'datetime',
                    categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
                        '01/05/2011 GMT', '01/06/2011 GMT'
                    ],
                },
                legend: {
                    position: 'right',
                    offsetY: 40
                },
                fill: {
                    opacity: 1
                }
            }
        }
      

        setThemeNow(theme)
        setData(obj)
        // console.log("kesni");
    }, [theme, select])

    if(data && data?.series !== null){
        return (
          <div className="bg-white dark:bg-darkPrimary rounded-2xl p-5 w-full xl:w-3/5 h-fit">
              <div className="flex items-center justify-between">
                  <h1 className="font-bold text-2xl text-light mb-10">{judul}</h1>
              </div>
              <div className="xl:flex items-center gap-10">
                  <Chart
                      options={data?.options}
                      series={data?.series}
                      type="bar"
                      className="w-full"
                  />
              </div>
          </div>
        )
    }else{
        <div className="bg-zinc-200 w-full rounded-xl animate-pulse h-56">
        </div>
    }
}
