'use client'
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { useCallback, useEffect, useState } from "react"
import { tableDial } from "@@/src/constant/table"
import axios from "axios";
import { DialList, Options, StateType } from "@@/src/types/types";
import Datatable from "../../../components/Datatable/Datatable";
import { useRouter } from "next/navigation";
import { DialModel } from "./lib/model";
import Select from "@@/app/components/Input/Select";
import { baseDomain } from "@@/src/hooks/CollectionAPI";

export default function ServicesPage() {
  const { state, setState } = useGlobalContext();
  const [dial, setDial] = useState<Options[]>([])
  const [value, setValue] = useState('')
  const statename = 'dials'
  const router = useRouter()

  const getData = useCallback(async () => {
    const result = await axios.get(baseDomain +'/dial_international.json')
    const value: DialModel[] = DialModel.toDatatableResponse(result.data)
    setDial(DialModel.toOptions(result.data))
    const total = value.length
    let defaultValue: StateType<DialList> = {
      isLoading: false,
      headers: tableDial,
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
      onGet: () => {
        
      }
    }
    setState({ ...state, [statename]: { ...defaultValue, data: value, totalCount: total }})
  }, [state, setState, router])

  useEffect(() => {
    if(!state?.[statename]){
      getData()
    }
  }, [getData, state])

  const dataState: StateType<DialList> | null = state?.[statename] ?? null

  return (
    <div className="w-full h-full p-5">
      <h1 className="font-bold text-xl">Dial</h1>
      <p className="text-zinc-600">Dial International</p>
      <Select 
        id="inputselect"
        name="inputselect"
        options={dial}
        onChange={value => setValue(value)}
        value={value}
        label="jaksjaskjas"
        prefixIcon="ph:user-duotone"
        // errorMessage="asalkjsaks"
      />
      <div className="py-10">
        {
          dataState && <Datatable statename={statename} />
        }
      </div>
    </div>
  )
}
