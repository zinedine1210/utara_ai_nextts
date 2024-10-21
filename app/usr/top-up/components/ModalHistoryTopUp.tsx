import Modal from "@@/app/components/Partials/Modal"
import HistoryPage from "@@/lib/history/HistoryPage"
import { IconsCollection } from "@@/src/constant/icons"
import { Icon } from "@iconify/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ModalHistoryTopUp({ tabHistory, modalName }) {
    const [tab, setTab] = useState<"initialize" | "pending" | "settle" | "cancel">(tabHistory ?? 'initialize')
    const router = useRouter()
    const handleTab = (input: typeof tab) => {
        setTab(input)
        router.push(`?tab=history&tabHistory=${input}`)
    }
    const initStatus = {
        'initialize': 'text-red-500'
    }
    const handleBack = () => {
        router.push(`/usr/top-up`)
    }
  return (
    <Modal name={modalName} disableClose={true}>
        <div className="w-full rounded-md">
            <HistoryPage />

            <footer>
                <button type="button" onClick={() => handleBack()} className="btn-secondary">Close</button>
            </footer>
        </div>
    </Modal>
  )
}
