'use client'
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { useCallback, useEffect } from "react"
import { tableServices } from "@@/src/constant/table";
import { FilterOptions, StateType } from "@@/src/types/types";
import { getServices } from "@@/src/hooks/CollectionAPI";
import { ServicesType } from "@@/src/types/datatabletypes";
import { ResponseData } from "@@/src/types/apitypes";
import { channelTypeOptions, serviceOptions, statusOptions } from "@@/src/constant/status";
import FilterDatatable from "@@/app/components/Datatable/FilterDatatable";
import DatatableMobile from "@@/app/components/Datatable/DatatableMobile";
import ToolTips from "@@/app/components/Partials/ToolTips";
import { useWindowSize } from "@@/src/hooks/usewindowsize";
import Datatable from "@@/app/components/Datatable/Datatable";
import { ServicesModel } from "./lib/model";
import CardMobileServices from "./components/CardMobileServices";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IconsCollection } from "@@/src/constant/icons";
import Link from "next/link";

export default function ServicesPage() {
  const { state, setState } = useGlobalContext();
  const statename: string = 'services'
  const windowWidth = useWindowSize();

  const initialMount = useCallback(async () => {
    let defaultValue: StateType<ServicesType> = {
      isLoading: false,
      headers: tableServices,
      // select: [],
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
          value: 'description',
          label: 'Description',
          type: 'input_text'
        },
        {
          value: 'status',
          label: 'Status',
          options: statusOptions,
          type: 'select'
        },
        {
          value: "type",
          label: "Type",
          options: serviceOptions,
          type: 'select'
        },
        {
          value: "channel",
          label: "Channel",
          options: channelTypeOptions,
          type: 'select'
        },
        {
          value: 'service_id',
          label: 'Service ID',
          type: 'input_text'
        },
        {
          value: 'channel_id',
          label: 'Channel ID',
          type: 'input_text'
        },
      ],
      page: 1,
      display: 10,
      range: {},
      columns: [{ data:"created_at", dir:"desc" }],
      data: null,
      allData: [],
      totalCount: 0,
      payload: [],
      groupBy: "createdAt",
      onGet: async (filter: FilterOptions[]) => {
        setState((prev: any) => ({
          ...prev,
          [statename]: {
            ...prev[statename],
            isLoading: true
          }
        }))
        const result: ResponseData = await getServices(filter)
        const value: ServicesModel[] = ServicesModel.toDatatableResponse(result.data).reverse()
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
        return <CardMobileServices data={item} index={index} />
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

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <div className="p-5">
          <h1 className="font-bold text-xl">Services</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Select your file to start training data</p>

          <div className="flex md:items-center md:justify-between mt-5">
              <div className="w-auto md:w-1/2">
                  <FilterDatatable statename={statename} />
              </div>
              <div className="w-full md:w-1/2 flex items-center justify-end gap-2">
                  <ToolTips title="Usage Information" position="right-0 translate-x-0">
                  <p className="text-xs font-light mt-2">Select files you want to create and train, then enter to button <span className="font-bold">Training Bot</span>. <br /> Your training files will be added to the training page.</p>
                  </ToolTips>
                  <Link href={`/usr/knowledge/services/create`}>
                    <button className="btn-primary">
                      <Icon icon={IconsCollection.service} className="text-lg"/>
                      Create Service
                    </button>
                  </Link>
              </div>
          </div>
      </div>
      {DatatableView()}
    </div>
  )
}
