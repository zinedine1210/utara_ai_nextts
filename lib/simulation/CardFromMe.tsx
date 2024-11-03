import { Icon } from "@iconify/react/dist/iconify.js";
import { IconsCollection } from "@@/src/constant/icons";
import { Notify } from "@@/src/utils/script";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import Dropdown from "@@/app/components/Partials/Dropdown";
import { DropdownOptions } from "@@/src/types/types";

export default function CardFromMe({ data }: { data: string }) {
    const { state, setState } = useGlobalContext()
    let optionsChat: DropdownOptions[] = [
        {
            name: "Reply",
            icon: IconsCollection.reply,
            action: (value: any) => {
                state.setData({ ...state, dataReply: data })
            }
        },
        {
            name: "Share",
            icon: IconsCollection.share,
            action: (value: any) => {
                Notify("Action not found", "info")
            }
        },
        {
            name: "Forward",
            icon: IconsCollection.forward,
            action: (value: any) => {
                Notify("Action not found", "info")
            }
        },
    ]

  return (
    <div className="w-full flex">
        <div className="flex items-start gap-2.5 ml-auto">
            <Dropdown options={optionsChat} position="md:right-0 left-0" id={'dropdown'+data}/>
            <div className={`pt-3 pb-7 px-3 rounded-s-lg rounded-ee-lg bg-teal-500 text-white relative shadow-xl max-w-[500px] w-full min-w-56`}>
                <p className="text-sm font-normal py-1.5 dark:text-white">{data}</p>
                <div className="absolute bottom-1 right-2 flex items-center gap-2">
                    <div className={`flex items-center`}>
                        <Icon icon={IconsCollection.check} className={`text-xl font-bold`}/>
                        <Icon icon={IconsCollection.check} className={`text-xl font-bold -ms-3.5`}/>
                    </div>
                    {/* <p className="text-xs">{data.getQuestionDate().split(" ")[3]}</p> */}
                </div>
            </div>
        </div>
    </div>
  )
}
