import { DialModel } from "../lib/model"

export default function CardDialMobile({
    data, index
}: {
    data: DialModel, index: number
}) {
  return (
    <div className="w-full bg-white rounded-md shadow-md p-3">
        <h1 className="font-bold">{data.name}</h1>
        <p>{data.code}</p>
        <p>{data.dial_code}</p>
    </div>
  )
}
