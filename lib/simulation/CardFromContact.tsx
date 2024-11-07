import { IconsCollection } from '@@/src/constant/icons';
import { useGlobalContext } from '@@/src/providers/GlobalContext';
import { Notify } from '@@/src/utils/script';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useRef, useState } from 'react'
import Dropdown from '@@/app/components/Partials/Dropdown';
import { DropdownOptions, SimulationChat } from '@@/src/types/types';
import { postABTest } from '@@/src/hooks/CollectionAPI';
import { PayloadABTest } from '@@/src/types/payloadtypes';
export default function CardFromContact({
    data,
    serviceId
}: {
    data: SimulationChat,
    serviceId: string
}) {
    const { state, setState } = useGlobalContext()
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };

    let optionsChat: DropdownOptions[] = [
        {
            name: "AB Test",
            icon: IconsCollection.reply,
            action: async (value: any) => {
                console.log(value)
                const payload: PayloadABTest = {
                    id: "",
                    question: data.question,
                    rec_by: "",
                    service_id: serviceId
                }
                const result = await postABTest(payload)
                console.log(result)
            }
        },
        {
            name: "Unanswered",
            icon: IconsCollection.share,
            action: (value: any) => {
                Notify("Action not found", "info")
            }
        }
    ]

  return (
    <div className="flex items-start gap-2.5">
        <span className='hidden w-10 h-10 shadow-md rounded-full md:flex items-center justify-center text-white font-bold text-xl uppercase bg-gradient-to-br from-primary to-primary/50'>
            <Icon icon={IconsCollection.chat} className='text-white'/>
        </span>
        <div className={`pt-3 pb-7 px-3 dark:bg-darkSecondary bg-white leading-1.5 text-white relative shadow-xl max-w-[500px] min-w-56 rounded-e-xl rounded-es-xl`}>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">AI</span>
            <p className="text-sm font-normal py-1.5 text-gray-900 dark:text-white">{data.answer}</p>
            <div className="absolute bottom-1 right-2 flex items-center gap-2 text-black dark:text-white">
                {/* <p className="text-xs">{data.getAnsweredDate().split(" ")[3]}</p> */}
            </div>
        </div>
        <Dropdown position='md:left-0 right-0' options={optionsChat} id={'dropdown'+data}/>
    </div>
  )
}
