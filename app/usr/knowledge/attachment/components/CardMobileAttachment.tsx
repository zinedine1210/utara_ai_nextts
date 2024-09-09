import { AttachmentDataModel } from "../lib/model"

export default function CardMobileAttachment({
    data,
    index
}: {
    data: AttachmentDataModel,
    index: number
}) {
  return (
    <div className="w-full bg-white dark:bg-darkSecondary shadow-md p-3 rounded-md">
      <h1 className="font-semibold">{data.originalfilenamesubstring}</h1>
      <p className="text-xs">{data.description}</p>
      <p className="font-bold">Size: {data.originalfilesize}KB</p>
    </div>
  )
}
