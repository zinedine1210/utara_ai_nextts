import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode, useEffect, useRef, useState } from "react";

interface ModalInfo {
  name: string
  data?: any
  id?: string
}

export default function Modal({
  children,
  name,
  disableClose
}: {
  children: ReactNode,
  name: string,
  disableClose?: boolean
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mount, setMounted] = useState<boolean>(false)
  const { state, setState } = useGlobalContext()
  const stateModal: undefined | ModalInfo = state?.modal


  useEffect(() => {
    if(!mount){
      setTimeout(() => {
        setMounted(true)
      }, 2000);
    }
  }, [mount])

  const onDismiss = () => {
    setMounted(false)
    setState({ ...state, modal: null })
  }

  if(stateModal?.name == name)
  return (
    <div ref={dropdownRef} className="z-30 absolute top-0 left-0 w-full h-full bg-black/20 backdrop-blur-sm flex items-center justify-center overflow-y-auto px-5">
      <div className={`${mount ? 'visible opacity-100': 'invisible opacity-0'} transition-all duration-500 ease-in-out block w-full md:w-fit min-w-56 max-w-6xl max-h-full p-5 rounded-md shadow-md bg-white dark:bg-dark relative`}>
        {
          children
        }
        {
          !disableClose && (
            <button className="absolute top-0 md:-top-3 right-0 md:-right-3 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center" onClick={onDismiss}>
              <Icon icon={'iconamoon:close-light'} className="text-2xl"/>
            </button>
          )
        }
      </div>
    </div>
  )
}
