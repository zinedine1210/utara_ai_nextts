'use client'

import { getABTest, getEnume, postDoTestABTest, postTrainingABTest } from "@@/src/hooks/CollectionAPI"
import { useGlobalContext } from "@@/src/providers/GlobalContext"
import { ResponseData } from "@@/src/types/apitypes"
import { FilterOptions, Options, StateType } from "@@/src/types/types"
import { useCallback, useEffect, useState } from "react"
import { ABTestModel } from "./lib/model"
import { tableTopUp } from "@@/src/constant/table"
import { ABTestType } from "@@/src/types/datatabletypes"
import { useWindowSize } from "@@/src/hooks/usewindowsize"
import CardABTest from "./components/CardABTest"
import { Notify } from "@@/src/utils/script"
import ModalCreateABTest from "./components/ModalCreateABTest"
import { Icon } from "@iconify/react"
import { IconsCollection } from "@@/src/constant/icons"
import Loading from "@@/app/loading"

export default function ABTestPage({ serviceId }) {
  const { state, setState } = useGlobalContext()
  const statename: string = 'abtest'
  const windowWidth = useWindowSize();
  const [tab, setTab] = useState(1)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const statusPriority = {
    "NEW": 1,
    "IN_QUEUE": 2,
    "TESTED": 3,
    "CORRECTED": 4,
    "IGNORED": 5,
    "TRAINED": 6
  };

  const mapData: undefined | ABTestModel[] = state?.[statename]?.data
  const isLoading: boolean = state?.[statename]?.isLoading

  const initialMount = useCallback(async () => {
    let arrayOptionStatus: Options[] = []
    const getEnum = await getEnume('/ab_test_model/ABTestStatus')
    if(getEnum.success){
      Object.entries(getEnum.data).map((item, index: number) => {
        let disabled: boolean = false
        if(item[0] == "TESTED" || item[0] == "CORRECTED" || item[0] == "TRAINED") disabled = true
        arrayOptionStatus.push({
          label: item[0],
          value: item[1],
          disabled
        })
      })
    }
    
    let defaultValue: StateType<ABTestType> = {
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
        },
        {
          key: "service_id",
          value: serviceId
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
        
        const result: ResponseData = await getABTest(filter)
        const value: ABTestModel[] = ABTestModel.toDatatableResponse(result.data).reverse().sort((a, b) => {
          return (statusPriority[a.status] || 999) - (statusPriority[b.status] || 999);
        })

        // grouping
        let dataState: {[key: string]: ABTestModel[]} = {}
        value.forEach((element: ABTestModel) => {
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
  }, [setState, statusPriority, serviceId])

  useEffect(() => {
    if(!state?.[statename]){
      initialMount()
    }
  }, [initialMount, state])

  const handlerDoTest = async () => {
    setState((prev: any) => {
      return {
        ...prev,
        [statename]: {
          ...prev[statename],
          isLoading: true
        }
      }
    })
    const result = await postDoTestABTest({ id: serviceId })
    if(result.success){
      Notify(result.data.message ?? 'Something went wrong', 'info', 3000)
    }
    state[statename].onGet(state[statename].filter)
  }

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
    const result = await postTrainingABTest({ id: serviceId })
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
      <h1 className="text-xl font-semibold">AB Test List</h1>
      <p className="pb-5 text-sm">First, you can {"DO TEST"} first until the status becomes {"TESTED"}, if so, you can correct it by giving the appropriate answer. After that, it is trained to save the {"CORRECTED"} status results into training data</p>
      <ModalCreateABTest name="modalcreateabtest"/>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button type="button" className="btn-primary" onClick={() => setState({ ...state, modal: { name: "modalcreateabtest", data: { serviceId } }})}><Icon icon={IconsCollection.abtest}/>Create AB Test</button>
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
              return (res[0] != "TRAINED" && res[0] != "IGNORED")
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
                  {(item[0] == "IN_QUEUE") && item[1].length > 0 && (
                    <button className="btn-primary" type="button" onClick={() => handlerDoTest()}>Do Test</button>
                  )}
                  {item[0] == "CORRECTED" && (
                    <button className="btn-primary" type="button" onClick={() => handleTrained()}>Trained</button>

                  )}
                </div>

                <div className="py-2 space-y-2">
                  {
                    item[1].length > 0 ? item[1].map((item: ABTestModel, index2: number) => {
                      return (
                        <CardABTest item={item} key={index2} statename={statename}/>
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
