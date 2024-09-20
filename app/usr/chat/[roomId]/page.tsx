'use client'
import { IconsCollection } from "@@/src/constant/icons";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

export default function PanelListChat() {
  const router = useRouter()
  const { state: context, setState } = useGlobalContext()
  return (
    <div className='w-1/4 h-full flex flex-col bg-white'>
      <header className="w-full shadow-md px-2 py-2.5">
        <div className="w-full flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
                <span className='w-10 h-10 shadow-md rounded-full flex items-center justify-center text-white font-bold text-xl uppercase bg-gradient-to-br from-blue-600 to-blue-200'>
                    Z
                </span>
                <h1 className="font-bold">Z</h1>
            </div>
            <div className="flex items-center gap-1">
                <button onClick={() => router.push('/usr/chat/contact')} className="w-10 h-10 hover:bg-zinc-500/20 rounded-md flex items-center justify-center">
                    <Icon icon={IconsCollection.addressbook} className="text-blue-500 text-xl" />
                </button>
                <button onClick={() => context.setData({ ...context, dataRoom: null })} className="w-10 h-10 hover:bg-zinc-500/20 rounded-md flex items-center justify-center">
                    <Icon icon={IconsCollection.refresh} className="text-blue-500 text-xl" />
                </button>
                {/* Dropdown */}
            </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="relative w-full">
                <Icon icon={IconsCollection.search} className="absolute top-1/2 -translate-y-1/2 left-3"/>
                {/* <input type="search" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="focus:bg-zinc-300 duration-300 rounded-md outline-none w-full py-3 pl-10 text-sm placeholder:text-zinc-500" placeholder="Search available room chat" /> */}
            </div>
        </div>
      </header>
      <div className='flex-1 h-full overflow-y-auto'>
      </div>
    </div>
  )
}
