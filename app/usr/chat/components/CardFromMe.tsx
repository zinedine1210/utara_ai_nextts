import { Icon } from "@iconify/react/dist/iconify.js";
import { IconsCollection } from "@@/src/constant/icons";
import { Notify } from "@@/src/utils/script";
import { useGlobalContext } from "@@/src/providers/GlobalContext";

export default function CardFromMe() {
    const { state: context, setState } = useGlobalContext()
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
    <div className="w-full flex" id={context?.id}>
        <div className="flex items-start gap-2.5 ml-auto">
            {/* <DropdownChat options={optionsChat} label={<FaEllipsisV className="text-zinc-500"/>} /> */}
            <div className={`pt-3 pb-7 px-3 rounded-s-lg rounded-ee-lg bg-teal-500 text-white relative shadow-xl max-w-[500px] w-full ${isContext ? "min-w-72":"min-w-56"}`}>
                {
                    isContext && (
                        <a href={`#${isContext.id}`} className="border-s-4 block border-teal-800 mt-2 bg-teal-100 w-full rounded-md p-3">
                            <h1 className="text-sm text-teal-800 capitalize font-bold">Siapa nih</h1>
                            <p className="text-zinc-600 text-sm">asjaksa</p>
                        </a>
                    )
                }
                <p className="text-sm font-normal py-1.5 dark:text-white">Lorem ipsum dolor sit amet.</p>
                <div className="absolute bottom-1 right-2 flex items-center gap-2">
                    <div className={`flex items-center ${context?.is_read && "text-blue-500"}`}>
                        <Icon icon={IconsCollection.check} className={`text-xl font-bold`}/>
                        <Icon icon={IconsCollection.check} className={`text-xl font-bold -ms-3.5`}/>
                    </div>
                    <p className="text-xs">90:980</p>
                </div>
            </div>
        </div>
    </div>
  )
}
