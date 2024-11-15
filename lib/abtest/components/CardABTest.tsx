'use client'
import { FormEvent, useState } from "react"
import { ABTestModel } from "../lib/model"
import { Icon } from "@iconify/react"
import { IconsCollection } from "@@/src/constant/icons"
import Select from "@@/app/components/Input/Select"
import { useGlobalContext } from "@@/src/providers/GlobalContext"
import { StateType } from "@@/src/types/types"
import { ABTestType } from "@@/src/types/datatabletypes"
import { changeStatusABTest, postCorrectionABTest, postDoTestABTest } from "@@/src/hooks/CollectionAPI"
import { PayloadChangeStatusABTest } from "@@/src/types/payloadtypes"
import { Notify } from "@@/src/utils/script"
import InputText from "@@/app/components/Input/InputText"
import Spinner from "@@/app/components/Partials/Spinner"

export default function CardABTest({ item, statename }: {
  item: ABTestModel,
  statename: string
}) {
  const [loadingCard, setLoadingCard] = useState(false)
  const { state, setState } = useGlobalContext()
  const context: undefined | StateType<ABTestType> = state[statename]
  const [open, setOpen] = useState<boolean>(item.status == "TESTED" ? true:false)
  const disabled = item.status == "IGNORED"
  const [correction, setCorrection] = useState("")

  const handleCorrection = async (e: FormEvent) => {
    e.preventDefault()
    setLoadingCard(true)
    const payload = {
      id: item.id,
      correction,
      mod_by: ""
    }
    const result = await postCorrectionABTest(payload)
    if(result.success){
      setCorrection("")
      context.onGet(context.filter)
    }
    setLoadingCard(false)
  }

  const onChangeStatus = async (value: "IGNORED") => {
    setLoadingCard(true)
    const payload: PayloadChangeStatusABTest = {
      id: item.id,
      status: value,
      mod_by: ""
    }
    const result = await changeStatusABTest(payload)
    if(result.success){
      Notify('Success update status', 'success', 3000)
    }
    context.onGet(context.filter)
    setLoadingCard(false)
  }

  if(!context.isLoading || !loadingCard){
    if(!disabled){
      return (
        <div className={`w-full bg-white border border-primary text-primary shadow-md rounded-md ${disabled && "pointer-events-none"}`}>
          <div className="flex items-center justify-between py-2 px-4">
            <div>
              <h1 className="flex items-center gap-1 text-sm font-bold font-monospace">Question :</h1>
              <p className="text-sm font-monospace first-letter:uppercase text-zinc-500">{item.question}</p>
            </div>
            <button type="button" onClick={() => setOpen(!open)}><Icon icon={IconsCollection['chevron-down']} className={open && 'rotate-180'}/></button>
          </div>
          <div className={`${open ? 'max-h-screen':'max-h-0 h-0'} border border-red-50 duration-300 ease-in-out h-full overflow-hidden`}>
            <div className="font-monospace py-2 px-4">
              <h1 className="text-sm font-semibold">Correction :</h1>
              {
                item.status == 'TESTED' && (
                  <form onSubmit={(e) => handleCorrection(e)} className="w-full">
                    <InputText 
                      id="correction"
                      name="correction"
                      onChange={(value) => setCorrection(value)}
                      value={correction}
                      autoComplete="off"
                      customCss="text-xs py-2 px-3"
                      placeholder="Correction this question here and then enter to keep your changes"
                    />
                  </form>
                )
              }
              {
                item.correction && (
                  <p className="text-sm font-monospace first-letter:uppercase text-zinc-500">{item.correction}</p>
                )
              }
            </div>
          </div>
          <div className="flex items-center gap-5 border-t py-2 px-4">
            <button className="text-red-500 border border-red-500 py-1 hover:bg-red-500/50 px-5 rounded-md outline-none" type="button" onClick={() => onChangeStatus("IGNORED")}>Ignore</button>
          </div>
        </div>
      )
    }else{
      return (
        <div className="w-full border border-red-500 text-primary shadow-md rounded-md">
          <div className="flex items-center justify-between py-2 px-4">
            <div>
              <h1 className="flex items-center gap-1 text-sm font-bold font-monospace">Question :</h1>
              <p className="text-sm font-monospace first-letter:uppercase text-zinc-500">{item.question}</p>
            </div>
          </div>
        </div>
      )
    }
    
  }else{
    return (
      <div className="text-center py-2 mx-auto">
          <Spinner />
      </div>
    )
  }
}
