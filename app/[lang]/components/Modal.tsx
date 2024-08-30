import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

export default function Modal({
  children,
  isOpen,
  setOpen
}: {
  children: ReactNode,
  isOpen: boolean,
  setOpen: (bol: boolean) => void
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mount, setMounted] = useState<boolean>(false)

  // Fungsi untuk menutup dropdown jika klik di luar
  const handleClickOutside = useCallback((event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
  }, [setOpen]);

  // Menggunakan useEffect untuk mendeteksi klik di luar
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if(!mount){
      setTimeout(() => {
        setMounted(true)
      }, 2000);
    }
  }, [isOpen, mount])

  const onDismiss = () => {
    setMounted(false)
    setOpen(false)
  }

  if(isOpen)
  return (
    <div ref={dropdownRef} className="absolute top-0 left-0 w-full h-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
      <div className={`${mount ? 'visible opacity-100': 'invisible opacity-0'} transition-all duration-500 ease-in-out block w-fit min-w-56 max-w-6xl max-h-96 p-5 rounded-md shadow-md bg-white relative`}>
        {
          children
        }
        <button className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center" onClick={onDismiss}>
          <Icon icon={'iconamoon:close-light'} className="text-2xl"/>
        </button>
      </div>
    </div>
  )
}
