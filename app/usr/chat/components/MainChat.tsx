'use client'
import { IconsCollection } from "@@/src/constant/icons";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import CardFromMe from "./CardFromMe";
import CardFromContact from "./CardFromContact";

export default function MainChat({
    roomId
}: {
    roomId: string
}) {
    const { state, setState } = useGlobalContext()
    const [text, setText] = useState("")
    const [timestamp, setTimestamp] = useState("")
    const [dataChat, setDataChat] = useState(null)
    const [roomInfo, setRoomInfo] = useState(null)

    const containerRef = useRef<null | HTMLDivElement>(null)
    const groupByDay = (data) => {
        const groupedData = data.reduce((acc, curr) => {
            const date = new Date(curr._cd.epoch_time * 1000);
            const day = date.toISOString().split('T')[0]; // Dapatkan tanggal dalam format YYYY-MM-DD
        
            if (!acc[day]) {
            acc[day] = [];
            }
            acc[day].push(curr);
            return acc;
        }, {});
        
        return groupedData;
    };

    useEffect(() => {
        ScrollOnTop("auto")
      }, [])
    
    const ScrollOnTop = (viewType: ScrollBehavior) => {
        containerRef.current?.scrollIntoView({ behavior: viewType });
    }

  return (
    <div className="w-full flex flex-col">
        <header className="w-full border-b border-red-500">
            {roomId}
        </header>
        <div className="w-full flex-1 h-full overflow-y-auto space-y-4 px-10 py-5">
            <div className="px-10">
                <div className="w-full py-5">
                    <div className="p-4 mb-4 text-sm text-teal-500 rounded-lg bg-teal-50 bg-opacity-50 backdrop-blur-sm dark:bg-gray-800 dark:text-blue-400 text-center" role="alert">
                    <h1 className="font-semibold">
                        11 Januari 2024
                    </h1>
                    </div>
                    <div className="space-y-4 mt-10">
                        <CardFromMe />
                        <CardFromContact />
                    </div>

                </div>
            </div>
            <div ref={containerRef}></div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="pb-5 px-10">
            <div className="bg-white shadow-xl rounded-2xl w-3/4 mx-auto px-5 pb-2 pt-3">
                {/* {
                    replyChat && (
                        <div className="w-full border-s-4 border-teal-500 bg-teal-50 rounded-md py-3 px-5 relative">
                        <h1 className="font-bold text-teal-500">{replyChat.isMe ? "You":replyChat.label}</h1>
                        <p className="text-sm">{replyChat?.msg}</p>
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 right-2" onClick={() => {context.setData({ ...context, dataReply: null }); ScrollOnTop("smooth")}}>
                            <BsX className="text-red-500 text-3xl"/>
                        </button>
                        </div>
                    )
                } */}
                <div className="flex items-center gap-2">
                <button type="button" className="w-10 h-10 rounded-full hover:bg-blue-200 hover:rotate-180 transition-all ease-in-out duration-300 flex items-center justify-center">
                    <Icon icon={IconsCollection.plus} className="text-3xl "/>
                </button>
                <div className="w-full relative">
                    <input value={text} type="text" onChange={(e) => setText(e.target.value)} className="peer w-full py-3 text-sm pl-2 pr-16 outline-none placeholder:text-zinc-500" placeholder="Type Here..." />
                    <button className="absolute top-1/2 -translate-y-1/2 right-0 w-16 flex items-center justify-center duration-300 ease-out peer-focus:visible peer-focus:opacity-100 opacity-0 peer-focus:rotate-45 invisible transition-all" type="submit">
                    <Icon icon={IconsCollection.send} className="text-blue-500 text-2xl duration-300 hover:text-teal-500"/>
                    </button>
                </div>
                </div>
            </div>
        </form>
    </div>
  )
}
