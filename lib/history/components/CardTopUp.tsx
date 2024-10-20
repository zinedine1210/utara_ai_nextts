import { useGlobalContext } from "@@/src/providers/GlobalContext"
import { TopUpModel } from "../lib/model"

export default function CardTopUp({
    data,
    index
}: {
    data: TopUpModel,
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
      <p>{data.recName}</p>
      <p>{data.amountFormat}</p>
      <p>{data.totalAmountFormat}</p>
    </div>
  )
}
