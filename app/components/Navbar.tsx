'use client'
import Image from "next/image";
import DarkMode from "./Partials/DarkMode";
import Profile from "./Partials/Profile";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import myImageLoader from "@@/src/utils/loader";

export default function Navbar() {
  const { state, setState } = useGlobalContext()

  return (
    <nav className='w-full py-2 bg-gradient-to-r border-b border-white/30 dark:bg-white from-primary dark:from-dark via-primary dark:via-dark to-primary/70 dark:to-dark/85 px-5 text-white'>
      <div className='flex items-center justify-between'>
        <div className="flex items-center gap-2">
          <button onClick={() => setState({ ...state, view: true })} className="md:hidden">
            <Icon icon={'ic:round-chevron-right'} className="text-3xl"/>
          </button>
          <Image 
            src={'/images/logometro.png'}
            alt="Logo Polres Metro Jakarta Utara"
            width={35}
            height={35}
            className="w-auto h-10 2xl:h-12"
            placeholder={`data:image/${myImageLoader(50, 50)}`}
          />
          <div>
            <h1 className="text-sm xl:text-xs 2xl:text-base text-white font-bold uppercase">Polres Jakarta Utara</h1>
            <p className="text-xs 2xl:text-sm">AI</p>
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <DarkMode />
          <Profile />
        </div>
      </div>
    </nav>
  )
}
  