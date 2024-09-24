'use client'
import { IconsCollection } from "@@/src/constant/icons";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import CardFromMe from "./CardFromMe";
import CardFromContact from "./CardFromContact";
import { getChat, postChat } from "@@/src/hooks/CollectionAPI";
import { ChatModel } from "../lib/model";
import Loading from "@@/app/loading";
import InputText from "@@/app/components/Input/InputText";
import { FilterOptions } from "@@/src/types/types";

export default function MainChat({
    roomId
}: {
    roomId: string
}) {
    const { state, setState } = useGlobalContext()
    const [text, setText] = useState<string>("")
    const [payload, setPayload] = useState<FilterOptions[]>([])

    const containerRef = useRef<null | HTMLDivElement>(null)
    const groupByDay = (data: ChatModel[]) => {
        let arr: {[key: string]: ChatModel[]} = {}
        data.forEach((acc: ChatModel) => {
            const date = acc.getQuestionDate().split(" ").slice(0, 3).join(" ")
            const day = date.split('T')[0]; // Dapatkan tanggal dalam format YYYY-MM-DD
        
            if (!arr[day]) {
                arr[day] = [];
            }
            arr[day].push(acc);
        });
        
        return arr;
    };

    const getAllChat = useCallback(async () => {
        const result = await getChat([{ key: "channel_id", value: roomId }])
        const getdata = ChatModel.toDatatableResponse(result.data)
        const initPayload: FilterOptions[] = [
            {
                key: "channel_id",
                value: roomId
            },
            {
                key: "channel",
                value: "WHATSAPP"
            }
        ]
        setPayload(initPayload)
        setState((prev: any) => ({
            ...prev,
            chatCollection: { ...prev.chatCollection, [roomId]: getdata }
        }))
    }, [roomId, setState])

    useEffect(() => {
        const intervalId = setInterval(() => {
            // getAllChat()
            console.log("jaksjaksjaks")
        }, 10000);
        
        return () => {
            clearInterval(intervalId);
        };
    }, [getAllChat])

    useEffect(() => {
        getAllChat()
        ScrollOnTop("auto")
    }, [getAllChat])
    
    const ScrollOnTop = (viewType: ScrollBehavior) => {
        containerRef.current?.scrollIntoView({ behavior: viewType });
    }

    const mountAllChat = () => {
        if(state.chatCollection && state.chatCollection[roomId]){
            return Object.entries(groupByDay(state.chatCollection[roomId])).map((gr, index) => {
                return (
                    <div className="w-full py-5" key={index}>
                        <div className="p-4 mb-4 text-sm text-primary rounded-lg bg-primary/20 bg-opacity-50 backdrop-blur-sm dark:bg-gray-800 dark:text-blue-400 text-center" role="alert">
                            <h1 className="font-bold">
                                {gr[0]}
                            </h1>
                        </div>
                        {
                            gr[1].map((chat: ChatModel, index2: number) => {
                                return (
                                    <div key={index2} className="space-y-4 mb-10">
                                        <CardFromMe data={chat}/>
                                        <CardFromContact data={chat}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            })
        }else return (
            <div className="w-full h-full flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const payloadObj: FilterOptions[] = payload
        payloadObj.push({ key: 'question', value: text })
        await postChat(payloadObj)
        getAllChat()
        setText("")
    }

  return (
    <div className="w-full flex flex-col">
        <header className="w-full bg-white py-5 px-5 border-b shadow-md border-zinc-200">
            <h1 className="font-bold text-primary">{roomId}</h1>
        </header>
        <div className="mx-auto flex-1 h-full overflow-y-auto space-y-4 w-3/4 py-5 no-scrollbar">
            <div className="px-10">
                {mountAllChat()}
            </div>
            <div ref={containerRef}></div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="pb-5 px-10">
            <div className="bg-white shadow-xl rounded-2xl w-3/4 mx-auto px-5 pb-2 pt-3">
                <div className="flex items-center gap-2">
                    <button type="button" className="w-10 h-10 rounded-full hover:bg-blue-200 hover:rotate-180 transition-all ease-in-out duration-300 flex items-center justify-center">
                        <Icon icon={IconsCollection.plus} className="text-3xl "/>
                    </button>
                    <div className="w-full relative">
                        <InputText 
                            value={text}
                            onChange={(value: string) => setText(value)}
                            id="inputtextchat"
                            name="inputtextchat"
                            placeholder="Type something and enter to send"
                        />
                        {/* <button className="absolute top-1/2 -translate-y-1/2 right-0 w-16 flex items-center justify-center duration-300 ease-out peer-focus:visible peer-focus:opacity-100 opacity-0 peer-focus:rotate-45 invisible transition-all" type="submit">
                            <Icon icon={IconsCollection.send} className="text-blue-500 text-2xl duration-300 hover:text-teal-500"/>
                        </button> */}
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}
