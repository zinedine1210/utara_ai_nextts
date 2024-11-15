'use client'
import { useState } from "react"
import { UnansweredModel } from "../lib/model"
import { Icon } from "@iconify/react"
import { IconsCollection } from "@@/src/constant/icons"
import Select from "@@/app/components/Input/Select"
import { useGlobalContext } from "@@/src/providers/GlobalContext"
import { StateType } from "@@/src/types/types"
import { UnansweredType } from "@@/src/types/datatabletypes"
import { changeStatusABTest, changeStatusUnanswered, postCorrectionABTest, postDoTestABTest, putUnanswered } from "@@/src/hooks/CollectionAPI"
import { PayloadChangeStatusABTest, PayloadUnanswered } from "@@/src/types/payloadtypes"
import { Notify } from "@@/src/utils/script"
import InputText from "@@/app/components/Input/InputText"
import Spinner from "@@/app/components/Partials/Spinner"

export default function CardUnanswered({ item, statename }: {
  item: UnansweredModel,
  statename: string
}) {
  const [loadingCard, setLoadingCard] = useState(false)
  const { state, setState } = useGlobalContext()
  const context: undefined | StateType<UnansweredType> = state[statename]
  const [open, setOpen] = useState<boolean>(false)
  const disabled = item.status == "IGNORED"
  const [correction, setCorrection] = useState("")

  const handleCorrection = async () => {
    setLoadingCard(true)
    const payload = {
      id: item.id,
      answer: correction,
      status: "ANSWERED",
      mod_by: ""
    }
    const result = await putUnanswered(payload)
    if(result.success){
      setCorrection("")
      context.onGet(context.filter)
    }
    setLoadingCard(false)
  }

  const onChangeStatus = async (value: "IGNORED") => {
    setLoadingCard(true)
    const payload: PayloadUnanswered = {
      id: item.id,
      status: value,
      mod_by: ""
    }
    const result = await changeStatusUnanswered(payload)
    if(result.success){
      Notify('Success update status', 'success', 3000)
    }
    context.onGet(context.filter)
    setLoadingCard(false)
  }

  if(!context.isLoading || !loadingCard){
    return (
      <div className={`w-full bg-primary shadow-md rounded-md ${disabled && "pointer-events-none"}`}>
        <div className="flex items-center justify-between p-2">
          <div>
            <h1 className="flex items-center gap-1 text-white text-sm font-bold font-monospace"><Icon icon={IconsCollection.question_mark}/>Question</h1>
            <p className="text-sm font-monospace first-letter:uppercase text-white">{item.question}</p>
          </div>
          <div className="flex items-center gap-2">
            {/* {
              item.status != "TRAINED" && (
                <Select 
                  id="selectstatus"
                  name="selectstatus"
                  onChange={value => onChangeStatus(value)}
                  options={context.filterKey[0].options ?? []}
                  value={item.status}
                  customCss="text-sm py-1 px-3"
                />
              )
            } */}
            {/* <button type="button" onClick={() => handlerDoTest()}><Icon className={`${open && "rotate-180"} duration-300 ease-in-out text-white text-3xl`} icon={IconsCollection['test']}/></button> */}
          </div>
        </div>
        <div className={`p-2`}>
          {item.status == "NEW" && (
            <div className="flex items-center gap-2">
              <div className="w-full">
                <InputText 
                  id="correction"
                  name="correction"
                  onChange={(value) => setCorrection(value)}
                  value={correction}
                  autoComplete="off"
                  placeholder="Correction this question here..."
                />
              </div>
              <button className="btn-secondary" type="button" onClick={() => handleCorrection()}><Icon icon={IconsCollection.check}/></button>
            </div>
          )}
          {item.answer && item.status !== "NEW" && (
            <div className="font-monospace text-white">
              <h1 className="text-sm font-semibold">Your Answer :</h1>
              <p className="text-sm">{item.answer}</p>
            </div>
          )}
        </div>
      </div>
    )
  }else{
    return (
      <div className="text-center py-2 mx-auto">
          <Spinner />
      </div>
    )
  }
}
