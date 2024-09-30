import { useGlobalContext } from "@@/src/providers/GlobalContext"
import { AttachmentDataModel } from "../lib/model"

export default function CardMobileAttachment({
    data,
    index
}: {
    data: AttachmentDataModel,
    index: number
}) {
  const { state, setState } = useGlobalContext()
  const dataContext = state['attachment']

  const handleCheck = (id: any) => {
    let copySelect = dataContext.select ?? []
    if(copySelect){
        if(id == -1){
            copySelect = []
            if(dataContext.length?.length != dataContext.data.length){
              dataContext.data.forEach((item: any) => {
                  copySelect = [ ...copySelect, item.id ]
              })
            }
        }else{
            if (copySelect.includes(id)) {
                copySelect = copySelect.filter((num: string) => num !== id);
            } else {
                copySelect.push(id);
            }
        }
        dataContext.select = copySelect
        setState((prev: any) => ({
          ...prev,
          'attachment': dataContext
        }))
    }
}
  return (
    <div className="w-full bg-white dark:bg-darkSecondary shadow-md p-3 rounded-md">
      <input id={`select-${data.id}`} type="checkbox" onChange={() => handleCheck(data.id)} checked={dataContext.select.includes(data.id)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
      <h1 className="font-semibold">{data.originalfilenamesubstring}</h1>
      <p className="text-xs">{data.description}</p>
      <p className="font-bold">Size: {data.originalfilesize}KB</p>
    </div>
  )
}
