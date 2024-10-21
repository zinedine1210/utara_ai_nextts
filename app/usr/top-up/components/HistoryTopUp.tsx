import { IconsCollection } from "@@/src/constant/icons"
import { Icon } from "@iconify/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function HistoryTopUp({ tabHistory }) {
    const [tab, setTab] = useState<"initialize" | "pending" | "settle" | "cancel">(tabHistory ?? 'initialize')
    const router = useRouter()
    const handleTab = (input: typeof tab) => {
        setTab(input)
        router.push(`?tab=history&tabHistory=${input}`)
    }
    const initStatus = {
        'initialize': 'text-red-500'
    }
  return (
    <div className="w-1/2 border border-primary rounded-md p-5">
        <h1 className="font-bold mb-2">History Top up</h1>
        <div className="w-full flex items-center gap-2 flex-nowrap">
            <button onClick={() => handleTab("initialize")} className={`${tab == "initialize" ? "btn-primary":"btn-secondary"}`}>Initialize</button>
            <button onClick={() => handleTab("pending")} className={`${tab == "pending" ? "btn-primary":"btn-secondary"}`}>Pending</button>
            <button onClick={() => handleTab("settle")} className={`${tab == "settle" ? "btn-primary":"btn-secondary"}`}>Settle</button>
            <button onClick={() => handleTab("cancel")} className={`${tab == "cancel" ? "btn-primary":"btn-secondary"}`}>Cancel</button>
        </div>
        <div className="space-y-3">
            <div className="bg-white rounded-md shadow-md p-2">
                <div className="flex items-center justify-between">
                    <h1 className="flex items-center gap-2">
                        <Icon icon={IconsCollection.money}/>
                        Uang Elektronik
                    </h1>
                    <p className={initStatus['initialize']}></p>
                </div>
            </div>
        </div>
    </div>
  )
}
