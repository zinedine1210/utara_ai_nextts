import { useGlobalContext } from "@@/src/providers/GlobalContext"
import { topUpStatus } from "@@/src/constant/status"
import { TopUpModel } from "@@/lib/history/lib/model"

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
    <div className="w-full bg-white dark:bg-darkSecondary shadow-md py-2 px-3 rounded-md">
      <div className="flex items-center justify-between">
        <p className="font-bold text-sm">{data.recName}</p>
        <div style={{backgroundColor:`${topUpStatus[data.status]}`}} className={`text-center rounded-full text-xs py-1.5 px-4 w-fit text-white`}>
          <p className="text-xs font-bold">{ data.status }</p>
        </div>
      </div>
      <div className="border-t mt-2 py-2 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm">Payment Method</p>
          <p className="text-zinc-500">{data.paymentMethod}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm">Voucher Code</p>
          <p className="text-zinc-500">{data?.voucherCode}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm">Amount</p>
          <p className="text-zinc-500">{data.currency} {data.amountFormat}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm">Total Amount</p>
          <p className="text-zinc-500">{data.currency} {data.totalAmountFormat}</p>
        </div>

        <div className="border-t pt-2 text-sm flex items-center justify-between">
          <p></p>
          <p className="">{data.createAt}</p>
        </div>
      </div>
    </div>
  )
}
