'use client'
import { getDetailTraining } from "@@/src/hooks/CollectionAPI"
import React, { useCallback, useEffect } from "react"
import { useGlobalContext } from "@@/src/providers/GlobalContext"
import { ServicesModel } from "../../lib/model"
import { usePathname } from "next/navigation"
import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"

export default function ServiceLayout({
    params,
    children
}: {
    children: React.ReactNode,
    params: {
        id: string
    }
}) {
    // const [data, setData] = useState<TrainingDataModel | null>(null)
    const { state, setState } = useGlobalContext()
    const pathname = usePathname()
    const tab = pathname.split('/')[pathname.split('/').length]
    const initialMount = useCallback(async () => {
        const result = await getDetailTraining(params.id)
        const model = new ServicesModel(result.data)
        setState({ ...state, 'trainingdatageneral': model })
    }, [params, setState, state])

    
    useEffect(() => {
        if(!state?.trainingdatageneral){
            initialMount()
        }
    }, [state, initialMount])

    const tabs = [
        {
            name: 'General',
            tab: 'general',
            icon: 'oui:integration-general'
        },
        {
            name: 'AI Chat Bot',
            tab: 'aichatbot',
            icon: 'simple-icons:chatbot'
        },
        {
            name: 'Attachments',
            tab: 'attachments',
            icon: ''
        },
        {
            name: 'Connections',
            tab: 'connections',
            icon: ''
        },
        {
            name: 'Settings',
            tab: 'settings',
            icon: ''
        },
    ]

    return (
        <div>
            <h1 className="font-bold">Information</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. A commodi id accusamus molestiae fuga, deleniti fugiat hic dolor enim! Quibusdam!</p>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="me-2">
                        {
                            tabs.map((t: any, index: number) => {
                                return (
                                    <Link href={t.tab} key={index}>
                                        <button className={`${tab == t.tab ? "text-primary border-primary dark:text-darkPrimary dark:border-darkPrimary":"border-transparent hover:text-primary hover:border-primary dark:hover:text-darkPrimary"} inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group`}>
                                            <Icon icon={t.icon} className="me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"/>
                                            {t.name}
                                        </button>
                                    </Link>
                                )
                            })
                        }
                    </li>
                </ul>
            </div>

            {children}
        </div>
    )
}
