import { IconsCollection } from '@@/src/constant/icons';
import { useGlobalContext } from '@@/src/providers/GlobalContext';
import { Notify } from '@@/src/utils/script';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useContext, useEffect, useRef, useState } from 'react'
export default function CardFromContact() {
    const { state: context, setState } = useGlobalContext()
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    let optionsChat = [
        {
            label: "Reply",
            icon: <Icon icon={IconsCollection.reply} className="text-zinc-600 text-lg"/>,
            action: (value) => {
                context.setData({ ...context, dataReply: data })
            }
        },
        {
            label: "Share",
            icon: <Icon icon={IconsCollection.share} className="text-zinc-600 text-lg"/>,
            action: (value) => {
                Notify("Action not found", "info")
            }
        },
        {
            label: "Forward",
            icon: <Icon icon={IconsCollection.forward} className="text-zinc-600 text-lg"/>,
            action: (value) => {
                Notify("Action not found", "info")
            }
        },
    ]

    const isContext = context?.context ?? null

  return (
    <div className="flex items-start gap-2.5">
        <span className='w-10 h-10 shadow-md rounded-full flex items-center justify-center text-white font-bold text-xl uppercase bg-gradient-to-br from-teal-600 to-teal-200'>
            {/* {dataContact?.label.charAt(0)} */}
            Z
        </span>
        <div className={`pt-3 pb-7 px-3 bg-white leading-1.5 text-white relative shadow-xl max-w-[500px] ${isContext ? "min-w-72":"min-w-56"} rounded-e-xl rounded-es-xl`}>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Zinedine mantap</span>
            {
                isContext && (
                    <a href={`#${isContext.id}`} className="border-s-4 block border-teal-800 mt-2 bg-teal-100 w-full rounded-md p-3">
                        <h1 className="text-teal-800 capitalize font-bold text-sm">You</h1>
                        <p className="text-zinc-600 text-sm">Zinedine Ganteng</p>
                    </a>
                )
            }
            <p className="text-sm font-normal py-1.5 text-gray-900 dark:text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, optio!</p>
            <div className="absolute bottom-1 right-2 flex items-center gap-2 text-black">
                <p className="text-xs">11:90</p>
            </div>
        </div>
        {/* <DropdownChat options={optionsChat} label={<FaEllipsisV className="text-zinc-500"/>} position={"top-full left-0"} /> */}
        
    </div>
  )
}
