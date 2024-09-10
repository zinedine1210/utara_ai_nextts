import { TrainingModel } from "../lib/model"

export default function CardMobileAttachment({
    data,
    index
}: {
    data: TrainingModel,
    index: number
}) {
  return (
    <div className="w-full bg-white dark:bg-darkSecondary shadow-md p-3 rounded-md">
      <h1 className="font-semibold">{data.description}</h1>
      <p className="text-xs">{data.id}</p>
      <p className="font-bold">{data.status}</p>
    </div>
  )
}
