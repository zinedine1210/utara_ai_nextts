'use client'
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { useCallback, useEffect } from "react"
import { tableAttachment } from "@@/src/constant/table";
import { FilterOptions, StateType } from "@@/src/types/types";
import { getAttachment, postTraining } from "@@/src/hooks/CollectionAPI";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AttachmentType } from "@@/src/types/datatabletypes";
import { ResponseData } from "@@/src/types/apitypes";
import { statusOptions } from "@@/src/constant/status";
import FilterDatatable from "@@/app/components/Datatable/FilterDatatable";
import DatatableMobile from "@@/app/components/Datatable/DatatableMobile";
import ToolTips from "@@/app/components/Partials/ToolTips";
import { useWindowSize } from "@@/src/hooks/usewindowsize";
import { AttachmentDataModel } from "../../attachment/lib/model";
import CardMobileAttachment from "../../attachment/components/CardMobileAttachment";
import Datatable from "@@/app/components/Datatable/Datatable";
import { IconsCollection } from "@@/src/constant/icons";
import ModalCreateTraining from "../components/ModalCreateTraining";
import { Notify } from "@@/src/utils/script";

export default function CreateTrainPage() {
  const { state, setState } = useGlobalContext();
  const statename: string = 'attachment'
  const windowWidth = useWindowSize();

  const initialMount = useCallback(async () => {
    let defaultValue: StateType<AttachmentType> = {
      isLoading: false,
      headers: tableAttachment,
      select: [],
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
      payload: [],
      groupBy: "createAt",
      onGet: async (filter: FilterOptions[]) => {
        setState((prev: any) => ({
          ...prev,
          [statename]: {
            ...prev[statename],
            isLoading: true
          }
        }))
        const result: ResponseData = await getAttachment(filter)
        const value: AttachmentDataModel[] = AttachmentDataModel.toDatatableResponse(result.data).reverse()
        const total = value.length
        setState((prev: any) => ({
          ...prev,
          [statename]: {
            ...prev[statename],
            isLoading: false,
            data: value,
            totalCount: total
          }
        }))
      },
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

  const DatatableView = () => {
    if(windowWidth < 820 && windowWidth !== 0){
      return (
        <div className="w-full md:hidden h-full flex-1 pb-44">
          <DatatableMobile statename={statename} />
        </div>
      )
    }else{
      return (
        <div className="hidden md:block px-5 flex-1 overflow-y-auto pb-20">
          <Datatable statename={statename} />
        </div>
      )
    }
  }

  const handleSubmit = async () => {
    const objPayload: FilterOptions[] = state[statename].payload
    const result = await postTraining(objPayload)
    console.log(result)
  }
  
  const modalName: string = "modalcreatetraining"
  const modalCreate = () => state[statename].select.length > 0 ? setState((prev: any) => ({ ...prev, modal: { name: modalName, data: state[statename].select }})) : Notify('Please select one file', 'info', 3000)
  return (
    <div className="w-full h-full overflow-hidden flex flex-col pt-10">
      <ModalCreateTraining name={modalName}/>
      <div className="p-5">
          <h1 className="font-bold text-xl">Create Training</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Select your file to start training data</p>

          <div className="flex md:items-center md:justify-between mt-5">
              <div className="w-auto md:w-1/2">
                  <FilterDatatable statename={statename} />
              </div>
              <div className="w-full md:w-1/2 flex items-center justify-end gap-2">
                  <ToolTips title="Usage Information" position="right-0 translate-x-0">
                  <p className="text-xs font-light mt-2">Select files you want to create and train, then enter to button <span className="font-bold">Training Bot</span>. <br /> Your training files will be added to the training page.</p>
                  </ToolTips>
              </div>
          </div>
      </div>
      {DatatableView()}
      <div className="backdrop-blur-md w-full absolute bottom-0 left-0 px-5 py-2 flex items-center justify-between">
          <h1 className="text-zinc-600 text-sm"><span className="font-bold text-3xl">{state[statename]?.select.length}</span> {state[statename]?.select.length == 1 ? "File":"Files"} Selected</h1>
          <button className="btn-primary" disabled={state[statename]?.select.length == 0 ? true:false} onClick={() => modalCreate()}>
              {/* <IoCreate className='text-white font-bold text-lg'/> */}
              <Icon icon={IconsCollection.train} className="text-white font-bold text-lg"/>
              <span>Training AI ChatBot</span>
          </button>
      </div>
    </div>
  )
}
