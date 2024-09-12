import { Icon } from "@iconify/react/dist/iconify.js"
import { ServicesModel } from "../lib/model"

export default function CardMobileServices({
    data,
    index
}: {
    data: ServicesModel,
    index: number
}) {
  let objIcon: any = {
    'WHATSAPP': 'whatsapp',
    'WHATAPPS': 'whatsapp'
  }
  return (
    <div className="w-full bg-white dark:bg-darkSecondary shadow-md p-3 rounded-md">
      <h1 className="font-semibold">{data.description}</h1>
      <p className="text-xs">{data.id}</p>
      <p className="flex items-center gap-2 mt-1">
        <Icon icon={`ic:baseline-${objIcon[data.channel]}`} className="text-zinc-500 text-2xl"/>
        {data.channel_id}
      </p>
    </div>
  )
}
