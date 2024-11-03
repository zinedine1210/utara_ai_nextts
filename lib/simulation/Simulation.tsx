'use client'
import { IconsCollection } from "@@/src/constant/icons";
import { simulationService } from "@@/src/hooks/CollectionAPI";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { SimulationChat } from "@@/src/types/types";
import { Icon } from "@iconify/react";
import { FormEvent, useEffect, useState } from "react";
import CardFromMe from "./CardFromMe";
import CardFromContact from "./CardFromContact";

export default function Simulation({ serviceId }) {
    const { state, setState } = useGlobalContext()
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState("")

    const simulationChat: undefined | SimulationChat[] = state?.simulation?.[serviceId]

    const handlerSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const payload = {
            collection_name: serviceId,
            question: data
        }
        const result = await simulationService(payload)
        console.log(result)
        if(result.success){
            setState((prev: any) => {
                return {
                    ...prev,
                    simulation: {
                        [serviceId]: [ ...prev.simulation[serviceId], result.data ]
                    }
                }
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        setState((prev: any) => {
            return {
                ...prev,
                simulation: { [serviceId]: [] }
            }
        })
    }, [])

    
  return (
    <div className="border-2 w-full relative overflow-hidden flex flex-col">
        <div className="w-full pt-4 pb-8 rounded-b-full flex items-center justify-between bg-blue-100 dark:bg-blue-500 px-2 text-center">
            <div className="w-full">
                <h1 className="text-xl font-bold font-mono">Chat Simulation AI</h1>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-200">Ask any question our AI will answer!</p>
            </div>
        </div>
        <div className="h-full overflow-y-hidden hover:overflow-y-auto no-scrollbar px-3 pt-2 pb-20">
            <div className="space-y-2 w-full mx-auto">
                {/* <div className="flex gap-2">
                    <span className="w-10 h-10 uppercase rounded-full bg-blue-500 text-white flex items-center justify-center font-bold border-2 border-white"><Icon icon={IconsCollection.chat} /></span>
                    <div>
                        <h1 className="text-zinc-500 text-sm font-medium py-1 first-letter:uppercase">ChatBot</h1>
                        <div className="space-y-2">
                            <div className="w-fit bg-white py-3 px-2 shadow-md rounded-md max-w-[300px] relative font-medium text-sm">
                                <h1>Hi, there!! this knowledge about: </h1>
                                <p className="text-blue-500 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, expedita.</p>
                            </div>
                        </div>
                    </div>
                </div> */}
                {
                    simulationChat && simulationChat.map((chat: SimulationChat, index: number) => {
                        return (
                            <>
                                <CardFromMe data={chat.question}/>
                                <CardFromContact data={chat.answer}/>
                            </>
                        )
                    })
                }
            </div>
        </div>
        <div className="absolute right-1/2 translate-x-1/2 w-full px-5 bottom-0 overflow-hidden rounded-xl">
            <form onSubmit={(e) => handlerSubmit(e)} className="relative">
                <input disabled={loading} value={data} id="inputQuestion" type="text" className="outline-none peer p-2 w-full text-sm font-medium border-2 border-blue-200 rounded-xl placeholder:text-zinc-500 pr-10 pl-5 bg-zinc-200 dark:bg-darkPrimary focus:bg-white transition-all duration-300" placeholder="Any Question?" maxLength={100} onChange={(e) => setData(e.target.value)} />
                <button type="submit" className="absolute peer-focus:translate-x-0 -translate-x-5 opacity-0 peer-focus:opacity-100 hover:scale-125 transition-all duration-300 top-1/2 -translate-y-1/2 right-2 w-8 h-8 flex items-center justify-center peer-focus:visible invisible">
                    {
                        loading ?
                        <div role="status">
                            <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        :
                        <Icon icon={IconsCollection.right} className="text-xl"/>
                    }
                </button>
            </form>
            <h1 className="text-end text-zinc-500 text-sm font-medium p-1">{data ? data.length :"0"}/100</h1>
        </div>
    </div>
  )
}
