'use client'
import { useState } from "react"
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
  const { state, setState } = useGlobalContext()
  const context: undefined | StateType<ABTestType> = state[statename]
  const [open, setOpen] = useState<boolean>(false)
  const disabled = item.status == "IGNORED"
  const [correction, setCorrection] = useState("")

  const handleCorrection = async () => {
    setState((prev: any) => {
      return {
        ...prev,
        [statename]: {
          ...prev[statename],
          isLoading: true
        }
      }
    })
    const payload = {
      id: item.id,
      correction,
      mod_by: ""
    }
    const result = await postCorrectionABTest(payload)
    if(result.success){
      context.onGet(context.filter)
    }
  }

  const onChangeStatus = async (value: "NEW" | "IN_QUEUE" | "TESTED" | "CORRECTED" | "IGNORED" | "TRAINED") => {
    setState((prev: any) => {
      return {
        ...prev,
        [statename]: {
          ...prev[statename],
          isLoading: true
        }
      }
    })
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
  }

  if(!context.isLoading){
    return (
      <div className={`w-full bg-primary shadow-md rounded-md ${disabled && "pointer-events-none"}`}>
        <div className="flex items-center justify-between p-2">
          <div>
            <h1 className="flex items-center gap-1 text-white text-sm font-bold font-monospace"><Icon icon={IconsCollection.question_mark}/>Question</h1>
            <p className="text-sm font-monospace first-letter:uppercase text-white">{item.question}</p>
          </div>
          <div className="flex items-center gap-2">
            {
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
            }
            {/* <button type="button" onClick={() => handlerDoTest()}><Icon className={`${open && "rotate-180"} duration-300 ease-in-out text-white text-3xl`} icon={IconsCollection['test']}/></button> */}
          </div>
        </div>
        <div className={`p-2`}>
          {item.status == "TESTED" && (
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
          {item.correction && (
            <div className="font-monospace text-white">
              <h1 className="text-sm font-semibold">Your Correction Answer :</h1>
              <p className="text-sm">{item.correction}</p>
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
