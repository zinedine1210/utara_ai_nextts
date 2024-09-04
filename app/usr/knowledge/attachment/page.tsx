'use client'
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { useCallback, useEffect, useState } from "react"
import { tableAttachment } from "@@/src/constant/table";
import { StateType } from "@@/src/types/types";
import Datatable from "../../../components/Datatable/Datatable";
import { getAttachment } from "@@/src/hooks/CollectionAPI";
import { useRouter } from "next/navigation";
import { AttachmentDataModel } from "./lib/model";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { AttachmentType } from "@@/src/types/datatabletypes";
import { Notify } from "@@/src/utils/script";
import InputText from "@@/app/components/Input/InputText";

export default function AttachmentPage() {
  const { state, setState } = useGlobalContext();
  const statename = 'attachment'
  const router = useRouter()
  const [keyword, setKeyword] = useState('')

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
          name: 'Delete',
          icon: 'octicon:trash-24',
          action: (id, index) => {
            Notify('Action not found to delete record ' + id, 'info', 3000)
          }
        },
        {
          name: 'Update',
          icon: 'weui:pencil-filled',
          action: (id, index) => {
            Notify('Action not found to update record ' + id, 'info', 3000)
          }
        }
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
        <div className="w-1/4">
          <InputText 
            id="searchattachment"
            name="keywrd"
            value={keyword}
            onChange={value => setKeyword(value)}
            placeholder="Filter by description.."
            prefixIcon="cil:search"
            type="search"
          />
        </div>

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
          <Link href={`/usr/knowledge/attachment/create`}>
          <button className="btn-primary">
            <Icon icon={'material-symbols:upload'} className="text-xl"/>
            Upload File
          </button>
          </Link>
        </div>
      </div>

      <div className="py-10">
        <Datatable statename={statename} />
      </div>
    </div>
  )
}
