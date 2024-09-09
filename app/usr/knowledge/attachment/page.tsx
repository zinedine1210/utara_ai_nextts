'use client'
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { useCallback, useEffect } from "react"
import { tableAttachment } from "@@/src/constant/table";
import { FilterOptions, StateType } from "@@/src/types/types";
import Datatable from "../../../components/Datatable/Datatable";
import { getAttachment } from "@@/src/hooks/CollectionAPI";
import { AttachmentDataModel } from "./lib/model";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { AttachmentType } from "@@/src/types/datatabletypes";
import { Notify } from "@@/src/utils/script";
import { ResponseData } from "@@/src/types/apitypes";
import { statusOptions } from "@@/src/constant/status";
import FilterDatatable from "@@/app/components/Datatable/FilterDatatable";
import DatatableMobile from "@@/app/components/Datatable/DatatableMobile";
import ToolTips from "@@/app/components/Partials/ToolTips";
import CardMobileAttachment from "./components/CardMobileAttachment";

export default function AttachmentPage() {
  const { state, setState } = useGlobalContext();
  const statename: string = 'attachment'

  const initialMount = useCallback(async () => {
    let defaultValue: StateType<AttachmentType> = {
      isLoading: false,
      headers: tableAttachment,
      filter: [
        {
          key: 'size',
          value: 100
        },
        {
          key: 'page',
          value: 1
        }
      ],
      filterKey: [
        {
          value: 'original_file_name',
          label: 'Original File Name',
          type: 'input_text'
        },
        {
          value: 'status',
          label: 'Status',
          options: statusOptions,
          type: 'select'
        }
      ],
      page: 1,
      display: 10,
      range: {},
      columns: [{ data:"created_at", dir:"desc" }],
      data: null,
      allData: [],
      totalCount: 0,
      payload: null,
      groupBy: "createAt",
      onGet: async (filter: FilterOptions[]) => {
        setState((prev: any) => ({
          ...prev,
          ['attachment']: {
            ...prev['attachment'],
            isLoading: true
          }
        }))
        const result: ResponseData = await getAttachment(filter)
        const value: AttachmentDataModel[] = AttachmentDataModel.toDatatableResponse(result.data)
        const total = value.length
        setState((prev: any) => ({
          ...prev,
          attachment: {
            ...prev.attachment,
            isLoading: false,
            data: value,
            totalCount: total
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
      ],
      componentMobile: (item, index) => {
        return <CardMobileAttachment data={item} index={index} />
      }
    }
    setState((prev: any) => ({
      ...prev,
      [statename]: defaultValue
    }))
    setState((prev: any) => {
      prev[statename].onGet(prev[statename].filter)
      return prev
    })
  }, [setState])

  useEffect(() => {
    if(!state?.[statename]){
      initialMount()
    }
  }, [initialMount, state])
  

  return (
    <div className="w-full h-full flex flex-col md:block ">
      <div className="p-5">
        <h1 className="font-bold text-xl">Attachment</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Input your file business here to create knowledge</p>

        <div className="flex md:items-center md:justify-between mt-5">
          <div className="w-auto md:w-1/2">
            <FilterDatatable statename={statename} />
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-end gap-2">
            <ToolTips title="Usage Information">
              <p className="text-xs font-light mt-2">Select files you want to create and train, then enter to button <span className="font-bold">Training Bot</span>. <br /> Your training files will be added to the training page.</p>
            </ToolTips>
            <button className="btn-secondary" onClick={() => state[statename].onGet(state[statename].filter)}> <h1 className="hidden md:block">Refresh</h1> <Icon icon={'solar:refresh-bold-duotone'} className="text-xl" /></button>
            <Link href={`/usr/knowledge/attachment/create`} className="inline-block">
              <button className="btn-primary">
                <Icon icon={'material-symbols:upload'} className="text-xl"/>
                Upload File
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:block py-10 px-5">
        <Datatable statename={statename} />
      </div>
      <DatatableMobile statename={statename} />
    </div>
  )
}
