'use client'
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { useCallback, useEffect } from "react"
import { tableTopUp } from "@@/src/constant/table";
import { FilterOptions, InitTopUpType, StateType } from "@@/src/types/types";
import { getABTest, getHistoryTopUp } from "@@/src/hooks/CollectionAPI";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { TopUpType } from "@@/src/types/datatabletypes";
import { Notify } from "@@/src/utils/script";
import { ResponseData } from "@@/src/types/apitypes";
import FilterDatatable from "@@/app/components/Datatable/FilterDatatable";
import DatatableMobile from "@@/app/components/Datatable/DatatableMobile";
import ToolTips from "@@/app/components/Partials/ToolTips";
import { useWindowSize } from "@@/src/hooks/usewindowsize";
import { ABTestModel } from "./lib/model";
import CardTopUp from "./components/CardTopUp";
import Datatable from "@@/app/components/Datatable/Datatable";
import { IconsCollection } from "@@/src/constant/icons";

export default function ABTestPage({ service_id }: {
    service_id: number
}) {
  const { state, setState } = useGlobalContext();
  const statename: string = 'abtest'
  const windowWidth = useWindowSize();

  const initialMount = useCallback(async (service_id: number) => {
    let defaultValue: StateType<TopUpType> = {
      isLoading: false,
      headers: tableTopUp,
      filter: [
        // {
        //     key: 'size',
        //     value: 100
        // },
        // {
        //     key: 'page',
        //     value: 1
        // },
        {
            key: 'status',
            value: "ACTIVE"
        }
        // {
        //     key: 'service_id',
        //     value: service_id
        // }
      ],
      filterKey: [
        {
            label: "Start Date",
            value: "start_date",
            type: "input_date"
        },
        {
            label: "End Date",
            value: "end_date",
            type: "input_date"
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
      groupBy: "createAt",
      onGet: async (filter: FilterOptions[]) => {
        setState((prev: any) => ({
          ...prev,
          [statename]: {
            ...prev[statename],
            isLoading: true
          }
        }))
        const result: ResponseData = await getABTest(filter)
        console.log(result)
        const value: ABTestModel[] = ABTestModel.toDatatableResponse(result.data).reverse()
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
      bulk: [
        {
          name: 'Checkout',
          icon: IconsCollection.save,
          action: (id, index) => {
            setState((prev: any) => {
              let obj: InitTopUpType
              const findData: ABTestModel = prev[statename].data.find((res: ABTestModel) => res.id == id)
              if(findData){
                obj = {
                  currency: findData.currency,
                  id: findData.id,
                  org_id: findData.orgId,
                  status: findData.status,
                  total_amount: findData.totalAmount,
                  trans_id: findData.transId
                }
                console.log(obj, findData)
                return { ...prev, initTopUp: obj }
              }else return prev
            })
          }
        }
      ],
      componentMobile: (item, index) => {
        return <CardTopUp data={item} index={index} />
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
      initialMount(service_id)
    }
  }, [initialMount, state])

  const DatatableView = () => {
    if(windowWidth < 820 && windowWidth !== 0){
      return (
        <div className="w-full md:hidden h-full overflow-y-hidden">
          <DatatableMobile statename={statename} />
        </div>
      )
    }else{
      return (
        <div className="hidden md:block pb-10 px-5 overflow-y-auto">
          <Datatable statename={statename} />
        </div>
      )
    }
  }
  

  return (
    <div className="w-auto h-full flex flex-col">
        ajskajsk
    </div>
  )
}
