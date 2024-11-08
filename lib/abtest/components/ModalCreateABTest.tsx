'use client'
import InputText from "@@/app/components/Input/InputText";
import Modal from "@@/app/components/Partials/Modal";
import { postABTest } from "@@/src/hooks/CollectionAPI";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { ResponseData } from "@@/src/types/apitypes";
import { Notify } from "@@/src/utils/script";
import React, { useEffect, useState } from "react";

export default function ModalCreateABTest({
    name
}: {
    name: string
}) {
    const { state, setState } = useGlobalContext()
    const dataModal = state?.modal?.data
    const [data, setData] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const payload = {
            id: "",
            rec_by: "",
            service_id: dataModal?.serviceId,
            question: data
        }

        const result: ResponseData = await postABTest(payload)
        console.log(result)
        if(result.success){
            Notify("Success add to ab test", "success", 3000)
        }
        setState((prev: any) => {
            prev['abtest'].onGet(prev['abtest'].filter)
            return {
                ...prev,
                modal: null
            }
        })
    }

  return (
    <>
        <Modal name={name}>
            <div className="min-w-96">
                <h1 className="font-semibold text-base pb-2 border-b">Create AB Test Manual</h1>
                <form onSubmit={(e) => handleSubmit(e)} className="mt-2 space-y-2">
                    <div>
                        <InputText 
                            id="question"
                            name="question"
                            onChange={(value) => setData(value)}
                            value={data}
                            label="Question"
                            placeholder="Input your question here.."
                        />
                    </div>

                    <button type="submit" className="btn-primary">Submit</button>
                </form>
            </div>
        </Modal>
    </>
  )
}
