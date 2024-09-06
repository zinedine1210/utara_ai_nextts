'use client'
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { useCallback, useEffect } from "react"
import { tableDial } from "@@/src/constant/table"
import axios from "axios";
import { DialList, FilterOptions, StateType } from "@@/src/types/types";
import Datatable from "../../../components/Datatable/Datatable";
import { useRouter } from "next/navigation";
import { DialModel } from "./lib/model";
import { baseDomain } from "@@/src/hooks/CollectionAPI";
import DatatableMobile from "@@/app/components/Datatable/DatatableMobile";
import CardDialMobile from "./components/CardDialMobile";

export default function ServicesPage() {
  const { state, setState } = useGlobalContext();
  const statename: string = 'dials'
  const router = useRouter()

  const initialMount = useCallback(async () => {
    let defaultValue: StateType<DialList> = {
      isLoading: false,
      headers: tableDial,
      filter: [],
      page: 1,
      display: 10,
      range: {},
      columns: [{ data:"created_at", dir:"desc" }],
      data: null,
      allData: [],
      totalCount: 0,
      payload: null,
      onGet: async (filter: FilterOptions[]) => {
        setState((prev: any) => ({
          ...prev,
          dials: {
            ...prev.dials,
            isLoading: true
          }
        }))
        const result = await axios.get(baseDomain +'/dial_international.json')
        const value: DialModel[] = DialModel.toDatatableResponse(result.data)
        const total = value.length
        setState((prev: any) => ({
          ...prev,
          dials: {
            ...prev.dials,
            isLoading: false,
            data: value,
            totalCount: total
          }
        }))
      },
      bulkButton: [
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
      ],
      componentMobile: (item, index) => <CardDialMobile data={item} index={index}/>
    }
    setState((prev: any) => ({
      ...prev,
      [statename]: defaultValue
    }))
    setState((prev: any) => {
      prev[statename].onGet(prev[statename].filter)
      return prev
    })
  }, [setState, router])

  useEffect(() => {
    if(!state?.[statename]){
      initialMount()
    }
  }, [initialMount, state])

  return (
    <div className="w-full h-full flex flex-col md:block ">
      <div className="p-5">
        <h1 className="font-bold text-xl">Dial</h1>
        <p className="text-zinc-600">Dial International for phone number</p>
      </div>

      <div className="hidden md:block py-10 px-5">
        <Datatable statename={statename} />
      </div>
      <DatatableMobile statename={statename} />
    </div>
  )
}
