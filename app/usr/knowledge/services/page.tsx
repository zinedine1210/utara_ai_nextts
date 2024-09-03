'use client'
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { useCallback, useEffect } from "react"
import { StateType } from "@@/src/types/types";
import Datatable from "../../../components/Datatable/Datatable";
import { getServices } from "@@/src/hooks/CollectionAPI";
import { useRouter } from "next/navigation";
import { ServicesModel } from "./lib/model";
import { ServicesType } from "@@/src/types/datatabletypes";
import { tableServices } from "@@/src/constant/table";

export default function ServicesPage() {
  const { state, setState } = useGlobalContext();
  const statename = 'services'
  const router = useRouter()

  const initialMount = useCallback(async () => {
    const result = await getServices()
    const value: ServicesModel[] = ServicesModel.toDatatableResponse(result.data)
    // console.log(value[0])
    const total = value.length
    let defaultValue: StateType<ServicesType> = {
      isLoading: false,
      headers: tableServices,
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
      onGet: () => {
        
      },
      bulk: [
        {
          name: 'Trained',
          icon: 'material-symbols:model-training',
          action: (id, index) => {
            router.push(`/usr/knowledge/services/information/${id}`)
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
      <h1 className="font-bold text-xl">Services</h1>
      <p className="text-zinc-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, sint?</p>

      <div className="py-10">
        <Datatable statename={statename} />
      </div>
    </div>
  )
}
