'use client'
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { useCallback, useEffect, useState } from "react"
import { tableTraining } from "@@/src/constant/table";
import { FilterOptions, Options, StateType } from "@@/src/types/types";
import Datatable from "../../../components/Datatable/Datatable";
import { changeStatusTraining, getTraining } from "@@/src/hooks/CollectionAPI";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { TrainingType } from "@@/src/types/datatabletypes";
import { ResponseData } from "@@/src/types/apitypes";
import { statusOptions } from "@@/src/constant/status";
import FilterDatatable from "@@/app/components/Datatable/FilterDatatable";
import DatatableMobile from "@@/app/components/Datatable/DatatableMobile";
import CardMobileAttachment from "./components/CardMobileTraining";
import { useWindowSize } from "@@/src/hooks/usewindowsize";
import { TrainingModel } from "./lib/model";
import { IconsCollection } from "@@/src/constant/icons";
import Simulation from "./components/Simulation";
import Select from "@@/app/components/Input/Select";
import { Notify } from "@@/src/utils/script";
import { useRouter } from "next/navigation";

export default function TrainingPage() {
  const { state, setState } = useGlobalContext();
  const statename: string = 'trainingdata'
  const windowWidth = useWindowSize();
  const router = useRouter()
  const [optionsSimulation, setOptionsSimulation] = useState<Options[]>([])

  const initialMount = useCallback(async () => {
    let defaultValue: StateType<TrainingType> = {
      isLoading: false,
      headers: tableTraining,
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
      groupBy: "createdAt",
      onGet: async (filter: FilterOptions[]) => {
        setState((prev: any) => ({
          ...prev,
          [statename]: {
            ...prev[statename],
            isLoading: true
          }
        }))
        const result: ResponseData = await getTraining(filter)
        const value: TrainingModel[] = TrainingModel.toDatatableResponse(result.data).reverse()
        const options: Options[] = TrainingModel.toOptions(result.data)
        setOptionsSimulation(options)
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
      bulkButton: [
        {
          name: 'Simulation AI',
          icon: 'hugeicons:ai-chat-02',
          customCss: 'bg-gradient-to-r from-teal-600 to-teal-400 text-white rounded-md',
          action: (id, index) => {
            setState((prev: any) => {
              const findOne: undefined | TrainingModel = prev[statename].data.find(res => res.id == id)
              if(!findOne || findOne.status != "ACTIVE"){
                Notify('You must activated this training data', "info", 3000)
                return prev
              }
              if(!findOne.collection_name) {
                Notify("Collection name not found", "info", 3000)
                return prev
              }
              router.push(`/usr/simulation/${findOne.collection_name}`)
              return prev
            })
          }
        },
      ],
      bulk: [
        {
          action: async (id, index) => {
            const payload = {
              id,
              status: "ACTIVE"
            }
            const result = await changeStatusTraining(payload)
            if(result.success){
              Notify('Success update status training', 'success', 3000)
              setState((prev: any) => {
                prev[statename].onGet(prev[statename].filter)
                return prev
              })
            }
            console.log(result)
          },
          name: "Active"
        },
        {
          action: async (id, index) => {
            const payload = {
              id,
              status: "INACTIVE"
            }
            const result = await changeStatusTraining(payload)
            if(result.success){
              Notify('Success update status training', 'success', 3000)
              setState((prev: any) => {
                prev[statename].onGet(prev[statename].filter)
                return prev
              })
            }
            console.log(result)
          },
          name: "Inactive"
        },
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

  const DatatableView = () => {
    if(windowWidth < 820 && windowWidth !== 0){
      return (
        <div className="w-full md:hidden h-full overflow-y-hidden">
          <DatatableMobile statename={statename} />
        </div>
      )
    }else{
      return (
        <div className="hidden md:block pb-20">
          <Datatable statename={statename} />
        </div>
      )
    }
  }
  

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <div className="p-5">
        <h1 className="font-bold text-xl">Knowledge Base</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Your AI understands many topics, but you can add specific knowledge about your company or products to supplement it.</p>

        <div className="flex md:items-center md:justify-between mt-5">
          <div className="w-auto md:w-1/2">
            <FilterDatatable statename={statename} />
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-end gap-2">
            <div className="w-fit md:w-80">
              <Select 
                id="simulation"
                justIconOnMobile={true}
                prefixIcon={IconsCollection.chat}
                name="simulation"
                onChange={value => state[statename].bulkButton[0].action(value, 1)}
                value={state.simulation ?? ''}
                defaultAll={true}
                options={optionsSimulation}
                placeholder="Select to simulation"
              />  
            </div>
            <button className="btn-secondary" onClick={() => state[statename].onGet(state[statename].filter)}> <h1 className="hidden md:block">Refresh</h1> <Icon icon={'solar:refresh-bold-duotone'} className="text-xl" /></button>
            <Link href={`/usr/knowledge/training/create`} className="inline-block">
              <button className="btn-primary">
                <Icon icon={IconsCollection.training} className="text-xl"/>
                Train AI
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className={`flex gap-5 px-0 md:px-5 flex-1 overflow-y-auto`}>
        {
          state.simulation && (
            <Simulation />
          )
        }
        <div className="w-full">
          {DatatableView()}
        </div>
      </div>
    </div>
  )
}
