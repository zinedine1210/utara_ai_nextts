import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


export default function DonatChart({ judul, value }: {
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

    const dummyData = {
        "IDR":[200000, 210000, 21000, 500000, 21000, 530000],
        "USD":[200, 210, 210, 500, 210, 530],
        "THB":[13, 33, 42, 55, 45, 100],
        "SGD":[43, 546, 234, 520, 300, 144]
    }

    const [select, setSelect] = useState("IDR")

    useEffect(() => {
        let obj = {
            options: {
                colors: ['#F97316', '#FF6060', '#EF4444', "#620000", '#3B82F6', '#22C55E'],
                dataLabels: {
                    enabled: false
                },
                plotOptions: {
                    pie: {
                        startAngle: 0,
                        endAngle: 360,
                        expandOnClick: true,
                        offsetX: 0,
                        offsetY: 0,
                        customScale: 1,
                        dataLabels: {
                            offset: 0,
                            minAngleToShowLabel: 10
                        }, 
                        donut: {
                            size: '60%',
                            background: 'transparent',
                            labels: {
                                show: true,
                                name: {
                                    show: true,
                                    fontSize: '20px',
                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                    fontWeight: 700,
                                    color: undefined,
                                    offsetY: -5,
                                    formatter: function (val: number) {
                                        return val
                                    }
                                },
                                value: {
                                    show: true,
                                    fontSize: '20px',
                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                    fontWeight: 500,
                                    color: undefined,
                                    offsetY: 5,
                                    formatter: function (val: number) {
                                        return Number(val)
                                    }
                                },
                                total: {
                                    show: true,
                                    showAlways: false,
                                    label: 'Total',
                                    fontSize: '30px',
                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                    fontWeight: 600,
                                    color: '#373d3f',
                                    formatter: function (w: any) {
                                        return w.globals.seriesTotals.reduce((a: any, b: any) => {
                                            return a + b
                                        }, 0)
                                    }
                                }
                            }
                        },      
                    }
                },
                legend: { show:false },
                labels: ['Pending', 'Reject', 'Cancel', 'Expired', 'Obscure', 'Completed']
            },
            series: [1090, 900, 302, 400, 424, 500],
        }


        setThemeNow(theme?.toString())
        setData(obj)
    }, [theme, select])

    if(data && data?.series !== null){
        return (
            <div className="bg-white dark:bg-darkPrimary rounded-md shadow-md w-full p-5">
                <h1 className="text-xl font-semibold mb-2">{judul}</h1>
                <div className="text-center mx-auto">
                    <Chart
                        options={data?.options}
                        series={data?.series}
                        type="donut"
                    />
                </div>
            </div>
        )
    }else{
        return (
            <div className="bg-zinc-200 dark:bg-gray-600 w-full rounded-xl animate-pulse h-1/2 p-5">
                
            </div>
        )
    }
}
