'use client'

import { getEnume, getUnanswered, postTrainingUnanswered } from "@@/src/hooks/CollectionAPI"
import { useGlobalContext } from "@@/src/providers/GlobalContext"
import { ResponseData } from "@@/src/types/apitypes"
import { FilterOptions, Options, StateType } from "@@/src/types/types"
import { useCallback, useEffect, useState } from "react"
import { UnansweredModel } from "./lib/model"
import { tableTopUp } from "@@/src/constant/table"
import { UnansweredType } from "@@/src/types/datatabletypes"
import { useWindowSize } from "@@/src/hooks/usewindowsize"
import { Notify } from "@@/src/utils/script"
import CardUnanswered from "./components/CardUnanswered"
import { Icon } from "@iconify/react"
import { IconsCollection } from "@@/src/constant/icons"
import Loading from "@@/app/loading"

export default function UnansweredPage({ serviceId }) {
  const { state, setState } = useGlobalContext()
  const statename: string = 'unanswered'
  const windowWidth = useWindowSize();
  const [tab, setTab] = useState(1)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const statusPriority = {
    "NEW": 1,
    "ANSWERED": 2,
    "TRAINED": 3,
    "IGNORED": 4
  };

  const mapData: undefined | UnansweredModel[] = state?.[statename]?.data
  const isLoading: boolean = state?.[statename]?.isLoading

  const initialMount = useCallback(async () => {
    let arrayOptionStatus: Options[] = []
    const getEnum = await getEnume('/unanswered_model/UnansweredStatus')
    if(getEnum.success){
      Object.entries(getEnum.data).map((item, index: number) => {
        let disabled: boolean = false
        if(item[0] == "ANSWERED" || item[0] == "TRAINED") disabled = true
        arrayOptionStatus.push({
          label: item[0],
          value: item[1],
          disabled
        })
      })
    }
    
    let defaultValue: StateType<UnansweredType> = {
      isLoading: false,
      headers: tableTopUp,
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
          label: "Status",
          type: "select",
          options: arrayOptionStatus,
          value: "status"
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
        
        const result: ResponseData = await getUnanswered(filter)
        const value: UnansweredModel[] = UnansweredModel.toDatatableResponse(result.data).reverse().sort((a, b) => {
          return (statusPriority[a.status] || 999) - (statusPriority[b.status] || 999);
        })

        // grouping
        let dataState: {[key: string]: UnansweredModel[]} = {}
        value.forEach((element: UnansweredModel) => {
          if(dataState?.[element.status]){
            dataState[element.status].push(element)
          }else{
            dataState[element.status] = [element]
          }
        });
        const total = value.length
        setState((prev: any) => ({
          ...prev,
          [statename]: {
            ...prev[statename],
            isLoading: false,
            data: dataState,
            totalCount: total
          }
        }))
      },
      bulk: [],
      componentMobile: (item, index) => {
        return ""
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
  }, [setState, statusPriority])

  useEffect(() => {
    if(!state?.[statename]){
      initialMount()
    }
  }, [initialMount, state])

  const handleTrained = async () => {
    setState((prev: any) => {
      return {
        ...prev,
        [statename]: {
          ...prev[statename],
          isLoading: true
        }
      }
    })
    const result = await postTrainingUnanswered({ id: serviceId })
    if(result.success){
      Notify(result.data.message ?? 'Something went wrong', 'info', 3000)
    }
    state[statename].onGet(state[statename].filter)
  }

  const tabOptions = [
    {
      name: "All",
      value: 1,
    },
    {
      name: "Trained",
      value: 2
    },
    {
      name: "Ignored",
      value: 3
    }
  ]

  const handleRefresh = () => {
    setState((prev: any) => {
      if(prev?.[statename]){
        prev[statename].isLoading = true
        prev[statename].data = []
        prev[statename].onGet(prev[statename].filter)
      }
      return prev
    })
  }

  return (
    <div className="mx-auto w-full md:w-1/2 py-5 overflow-y-auto no-scrollbar">
      <h1 className="text-xl font-semibold">Unanswered Question</h1>
      <p className="pb-5 text-sm">Questions that cannot be answered by the AI chat will be automatically entered on this page, you can correct them now</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => handleRefresh()} className="btn-secondary">
            <Icon icon={IconsCollection.refresh} className="text-xl"/>
          </button>
        </div>
      </div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            {
              tabOptions.map((item, index: number) => {
                return (
                  <li className="me-2" key={index}>
                      <button type="button" onClick={() => setTab(item.value)} className={`inline-block p-4 border-b-2 rounded-t-lg ${tab == item.value ? "text-primary border-primary":"text-zinc-500 hover:text-zinc-600 hover:border-zinc-300 border-transparent"}`}>{item.name}</button>
                  </li>
                )
              })
            }
          </ul>
      </div>


      <div className="space-y-5 mt-5">
        {
          !isLoading ? mapData ? Object.entries(mapData).filter(res => {
            if(tab == 1){
              return (res[0] == "NEW" || res[0] == "ANSWERED")
            }else if(tab == 2){
              return res[0] == "TRAINED"
            }else if(tab == 3){
              return res[0] == "IGNORED"
            }
          }).map((item: any, index: number) => {   
            return (
              <div key={index}>
                <div className="flex items-center justify-between pb-2 border-b border-primary">
                  <h1 className="font-semibold text-xl text-primary">{item[0]}</h1>
                  {item[0] == "ANSWERED" && (
                    <button className="btn-primary" type="button" onClick={() => handleTrained()}>Trained</button>
                  )}
                </div>

                <div className="py-2 space-y-2">
                  {
                    item[1].length > 0 ? item[1].map((item: UnansweredModel, index2: number) => {
                      return (
                        <CardUnanswered item={item} key={index2} statename={statename}/>
                      )
                    })
                    :
                    <h1 className="text-red-500 py-2 text-center">Not Available</h1>
                  }
                </div>
              </div>
            )
          })
          :
          <div className="text-center text-red-500">
            <h1 className="font-semibold">Not Found</h1>
            <p>Not available data in this section</p>
          </div>
          :
          <Loading />
        }
      </div>
    </div>
  )
}
