'use client'
import InputText from "@@/app/components/Input/InputText";
import Dropdown from "@@/app/components/Partials/Dropdown";
import { IconsCollection } from "@@/src/constant/icons";
import { getProfile, getServices } from "@@/src/hooks/CollectionAPI";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { DropdownOptions, FilterOptions, Options } from "@@/src/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileModel } from "../../integration/whatsapp/lib/model";
import { ServicesModel } from "../../knowledge/services/lib/model";

export default function PanelListChat({
  params
}:
{
  params: {
    roomId: string
  }
}) {
  const router = useRouter()
  const [keyword, setKeyword] = useState<string>("")
  const { state, setState } = useGlobalContext()

  const optionsHeader: DropdownOptions[] = [
    {
      name: 'Contact',
      icon: IconsCollection.addressbook,
      action: (id) => {
        alert(id)
      }
    }
  ]

  const allChannel: Options[] | undefined = state.options.whatsapp

  const funcAllOptions: {[key: string]: () => void} = {
    'getAllChannel': async () => {
        if(state.profile){
            state.options.whatsapp = state.profile.whatsapp ? state.profile.whatsapp.map((item: string) => {
                return { label: item, value: item }
            }) : []
        }else{
            const result = await getProfile()
            const value: ProfileModel = new ProfileModel(result.data)
            state.profile = value
            state.options.whatsapp = value.whatsapp ? value.whatsapp.map((item: string) => {
                return { label: item, value: item }
            }): []
        }
        setState((prev: any) => ({
          ...prev,
          options: prev.options
        }))
    },
    'getAllServices': async () => {
      if(!state.services){
        const payloadFilter: FilterOptions[] = [
          {
            key: "page",
            value: 1
          },
          {
            key: "size",
            value: 100
          }
        ]
        const result = await getServices(payloadFilter)
        if(result.success){
          const data: Options[] = []
          const dataModel = ServicesModel.toDatatableResponse(result.data)
          dataModel.forEach((ele: ServicesModel) => {
            data.push({
              label: ele.description,
              value: ele.channel_id
            })
          });
          setState((prev: any) => {
            return {
              ...prev,
              options: {
                whatsapp: data
              }
            }
          })
        }
      }
    }
  }

  useEffect(() => {
    funcAllOptions['getAllServices']()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`${params.roomId == "all" ? "w-full":"hidden md:flex"} md:w-1/4 h-full flex-col bg-white dark:bg-dark`}>
      <header className="w-full shadow-md px-2 py-2.5">
        <div className="w-full flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
                <span className='w-11 h-11 shadow-md rounded-full flex items-center justify-center text-white font-bold text-xl uppercase bg-gradient-to-br from-primary to-primary/60'>
                    {state?.profile?.name.charAt(0)}
                </span>
                <div>
                  <h1 className="font-bold">Hallo, {state?.profile?.name.substring(0, 10)}</h1>
                  <p className="text-sm">{state?.profile?.email}</p>
                </div>
            </div>
            <div className="flex items-center gap-1">
              <Dropdown options={optionsHeader} id={'dropdownListChat'}/>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="relative w-full">
                <Icon icon={IconsCollection.search} className="absolute top-1/2 -translate-y-1/2 left-3"/>
                <InputText 
                  id="searchcontact"
                  name="searchcontact"
                  value={keyword}
                  onChange={(value: string) => setKeyword(value)}
                  placeholder="Search Phone Number"
                  prefixIcon={IconsCollection.search}
                />
            </div>
        </div>
      </header>
      <div className='flex-1 h-full overflow-y-auto space-y-1 p-2'>
        {
          allChannel ? allChannel.length > 0 ? allChannel.map((chan, index) => {
            return (
              <button onClick={() => router.push(`/usr/chat/${chan.value}`)} className={`${params.roomId == chan.value ? "bg-gradient-to-r from-primary via-primary to-primary/50 text-white":"border border-primary hover:bg-primary/20 duration-300 ease-in-out"} text-base w-full py-2 px-2 text-start rounded-xl flex items-center gap-3`} key={index}>
                <Icon icon={IconsCollection.chat} className={`${params.roomId == chan.value ? 'text-white':'text-primary'} text-2xl`}/>
                <div className="w-full">
                  <h1 className="font-semibold text-sm">{chan.label}</h1>
                  <p className="text-xs font-light text-zinc-500">{chan.value}</p>
                </div>
              </button>
            )
          })
          :
          <div className="text-center py-10">
            <Icon icon={IconsCollection.chat} className={`text-6xl text-zinc-400/30 mx-auto text-center mb-2`}/>
            <h1 className="font-semibold text-zinc-500">No integration connected</h1>
          </div>
          :
          Array.from({ length: Number(20) }, (_, i) => i + 1).map((load) => (
            <div key={load} className="w-full h-9 animate-pulse bg-zinc-200" />
          ))
        }
      </div>
    </div>
  )
}
