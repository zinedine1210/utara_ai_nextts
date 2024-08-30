'use client'
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { useCallback, useEffect } from "react"
import { tableTraining } from "@@/src/constant/table";
import { StateType } from "@@/src/types/types";
import Datatable from "../../components/Datatable/Datatable";
import { getTraining } from "@@/src/hooks/CollectionAPI";
import { TrainingType } from "./lib/types";
import { TrainingDataModel } from "./lib/model";
import { useRouter } from "next/navigation";

export default function TrainingPage() {
  const { state, setState } = useGlobalContext();
  const statename = 'training'
  const router = useRouter()

  const initialMount = useCallback(async () => {
    const result = await getTraining()
    console.log(result)
    const value: TrainingDataModel[] = TrainingDataModel.toDatatableResponse(result.data)
    // console.log(value[0])
    const total = value.length
    let defaultValue: StateType<TrainingType> = {
      isLoading: false,
      headers: tableTraining,
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
      // bulk: [
      //   {
      //     name: 'Trained',
      //     icon: 'material-symbols:model-training',
      //     action: (id, index) => {
      //       router.push(`/usr/knowledge/training/information/${id}`)
      //     }
      //   },
      //   {
      //     name: 'Inbox',
      //     icon: 'solar:inbox-broken',
      //     action: (id, index) => {
      //       router.push(`usr/inbox/${id}`)
      //     }
      //   },
      //   {
      //     name: 'Simulation AI',
      //     icon: 'hugeicons:ai-chat-02',
      //     action: (id, index) => {
      //       alert('simulation'+id)
      //     }
      //   },
      // ]
    }
    setState({ ...state, [statename]: { ...defaultValue, data: value, totalCount: total }})
  }, [state, setState])

  useEffect(() => {
    if(!state?.[statename]){
      initialMount()
    }
  }, [initialMount, state])

  return (
    <div className="w-full h-full p-2 xl:px-4 2xl:p-5">
      <h1 className="font-bold text-sm xl:text-base 2xl:text-lg">Knowledge Base</h1>
      <p className="text-zinc-600 text-sm xl:text-xs 2xl:text-sm">Your AI understands many topics, but you can add specific knowledge about your company or products to supplement it.</p>

      <div className="py-10">
        <Datatable statename={statename} />
      </div>
    </div>
  )
}
