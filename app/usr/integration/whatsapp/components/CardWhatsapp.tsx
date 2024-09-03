'use client'
import { postChannel } from "@@/src/hooks/CollectionAPI"
import { checkSessionWhatsapp } from "@@/src/hooks/WhatsappCollection"
import { useGlobalContext } from "@@/src/providers/GlobalContext"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useCallback, useEffect, useState } from "react"

export default function CardWhatsapp({ id }: { id: string }) {
  const [status, setStatus] = useState<string>('connected')
  const { state, setState } = useGlobalContext()

  let StatusComponent: any = {
      'authenticated': <span className="inline-block w-fit badge-green">Authenticated</span>,
      'disconnected': <span className="inline-block w-fit badge-red">Disconnected</span>,
      'connected': <span className="inline-block w-fit badge-blue">Connecting</span>
  }

  const getStatus = useCallback(async () => {
    const result = await checkSessionWhatsapp(id)
    setStatus(result.data.status ?? 'disconnected')
  }, [id])

  useEffect(() => {
    getStatus()
  }, [status, getStatus])


  const handleDelete = async () => {
    let array = state['profile']['whatsapp']
    array = array.filter((res: string) => res !== id)
    const result = await postChannel(array, 'whatsapp')
    setState({ ...state, profile: result.data })
  }
    
  return (
    <div className="border rounded-md py-2 px-5 flex items-center justify-between">
        <h1 className="font-bold">{id}</h1>
        <div className="flex items-center gap-5">
            {StatusComponent[status]}
            <button onClick={() => handleDelete()} className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100"><Icon icon={'octicon:trash-24'} className="text-xl text-red-500"/></button>
        </div>
    </div>
  )
}
