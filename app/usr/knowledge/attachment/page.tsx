'use client'
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { useCallback, useEffect } from "react"
import { tableAttachment } from "@@/src/constant/table";
import { StateType } from "@@/src/types/types";
import Datatable from "../../components/Datatable/Datatable";
import { getAttachment } from "@@/src/hooks/CollectionAPI";
import { useRouter } from "next/navigation";
import { AttachmentDataModel } from "./lib/model";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { Notify } from "@@/src/utils/script";
import { AttachmentType } from "@@/src/types/datatabletypes";

export default function AttachmentPage() {
  const { state, setState } = useGlobalContext();
  const statename = 'attachment'
  const router = useRouter()

  const initialMount = useCallback(async () => {
    const result = await getAttachment()
    if(!result.success){
      Notify(result.message ?? "Something went wrong when get data", 'Info', 3000)
      return false
    }
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
      onGet: async () => {
        setState((prev: any) => ({
          ...prev,
          [statename]: {
            ...prev[statename],
            isLoading: true
          }
        }))

        const result = await getAttachment()
        const value: AttachmentDataModel[] = AttachmentDataModel.toDatatableResponse(result.data)
        const total = value.length

        setState((prev: any) => ({
          ...prev,
          [statename]: {
            ...prev[statename],
            isLoading: false,
            data: value,
            totalCount: total,
            page: 1
          }
        }))
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

      <div className="sm:flex sm:items-center sm:justify-between mt-5">
        <input type="search" placeholder="Filter by Name / Description" className="input-style w-full xl:w-auto" />

        <div className="xl:flex space-y-2 xl:space-y-0 items-center justify-between gap-2 mt-2 xl:mt-0">
          <div className="group relative">
            <div className="transition-opacity z-20 duration-300 invisible group-hover:visible opacity-0 group-hover:opacity-100 group-hover:block absolute w-72 shadow-md p-5 bg-white dark:bg-darkPrimary rounded-md top-full right-0">
              <h1 className="text-sm font-bold">Usage Information</h1>
              <p className="text-xs font-light mt-2">Select files you want to create and train, then enter to button <span className="font-bold">Training Bot</span>. <br /> Your training files will be added to the training page.</p>
            </div>
            <span className="flex items-center justify-center w-10 h-10 rounded-full text-xl font-bold bg-white dark:bg-black border hover:bg-zinc-100 ">
              <Icon icon={"bi:info"} className="w-6 h-6" />
            </span>
          </div>
          <button className="btn-secondary" onClick={() => state[statename].onGet()}>Refresh <Icon icon={'solar:refresh-bold-duotone'} /></button>
          <Link href={`/usr/knowledge/attachment/create`}><button className="btn-secondary">
            Upload File
          </button></Link>
        </div>
      </div>

      <div className="py-10">
        <Datatable statename={statename} />
      </div>
    </div>
  )
}
