'use client'
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { useCallback, useEffect } from "react"
import { tableDial } from "@@/src/constant/table"
import axios from "axios";
import { DialList, StateType } from "@@/src/types/types";
import Datatable from "../../components/Datatable/Datatable";

export default function ServicesPage() {
  const { state, setState } = useGlobalContext();
  const statename = 'services'
  

  const getData = useCallback(async () => {
    const result = await axios.get('http://localhost:3000/dial_international.json')
    const value: DialList[] = result.data
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
      onGet: () => {
        
      }
    }
    setState({ ...state, [statename]: { ...defaultValue, data: value, totalCount: total }})
  }, [state, setState])

  useEffect(() => {
    if(!state?.[statename]){
      getData()
    }
  }, [getData, state])

  const dataState: StateType<DialList> | null = state?.[statename] ?? null

  return (
    <div className="w-full h-full p-5">
      <h1 className="font-bold text-xl">Services</h1>
      <p className="text-zinc-600">Dial International</p>

      <div className="py-10">
        {
          dataState && <Datatable statename={statename} />
        }
      </div>
    </div>
  )
}
