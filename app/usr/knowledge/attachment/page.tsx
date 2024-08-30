'use client'
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { useCallback, useEffect } from "react"
import { tableAttachment } from "@@/src/constant/table";
import { StateType } from "@@/src/types/types";
import Datatable from "../../components/Datatable/Datatable";
import { getAttachment } from "@@/src/hooks/CollectionAPI";
import { useRouter } from "next/navigation";
import { AttachmentType } from "./lib/types";
import { AttachmentDataModel } from "./lib/model";

export default function AttachmentPage() {
  const { state, setState } = useGlobalContext();
  const statename = 'attachment'
  const router = useRouter()

  const initialMount = useCallback(async () => {
    const result = await getAttachment()
    const value: AttachmentDataModel[] = AttachmentDataModel.toDatatableResponse(result.data)
    const total = value.length
    let defaultValue: StateType<AttachmentType> = {
      isLoading: false,
      headers: tableAttachment,
      filter: [],
      page: 1,
      display: 10,
      range: {},
      columns: [{ data:"created_at", dir:"desc" }],
      data: [],
      allData: [],
      totalCount: 0,
      payload: null,
      groupBy: "t_ie_ca",
      onGet: () => {
        
      },
      bulk: [
        {
          name: 'Trained',
          icon: 'material-symbols:model-training',
          action: (id, index) => {
            router.push(`/usr/knowledge/training/information/${id}`)
          }
        },
        {
          name: 'Inbox',
          icon: 'solar:inbox-broken',
          action: (id, index) => {
            router.push(`usr/inbox/${id}`)
          }
        },
        {
          name: 'Simulation AI',
          icon: 'hugeicons:ai-chat-02',
          action: (id, index) => {
            alert('simulation'+id)
          }
        },
      ]
    }
    setState({ ...state, [statename]: { ...defaultValue, data: value, totalCount: total }})
  }, [state, setState, router])

  useEffect(() => {
    if(!state?.[statename]){
      initialMount()
    }
  }, [initialMount, state])

  return (
    <div className="w-full h-full p-5">
      <h1 className="font-bold text-xl">Attachment</h1>
      <p className="text-zinc-600">Input your file business here to create knowledge</p>

      <div className="py-10">
        <Datatable statename={statename} />
      </div>
    </div>
  )
}
