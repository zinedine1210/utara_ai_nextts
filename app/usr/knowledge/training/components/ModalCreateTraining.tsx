'use client'
import Modal from "@@/app/components/Partials/Modal";
import InputText from "@@/app/components/Input/InputText";
import { FilterOptions, StateType } from "@@/src/types/types";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { FormEvent } from "react";
import { postTraining } from "@@/src/hooks/CollectionAPI";
import { Notify } from "@@/src/utils/script";
import { useRouter } from "next/navigation";
import { AttachmentType } from "@@/src/types/datatabletypes";

export default function ModalCreateTraining({
    name
}: {
    name: string
}) {
    const { state, setState } = useGlobalContext()
    const property: StateType<AttachmentType> = state?.attachment
    const router = useRouter()
    const handleFilter = (value: string | number, target: string) => {
        const findIndex: number = property.payload.findIndex((res: FilterOptions) => res.key == target)
        if(findIndex != -1){
          if(value){
            property.payload[findIndex]['value'] = value
          }else{
            property.payload = property.payload.filter((res: FilterOptions) => res.key !== target)
          }
        }else{
          if(value){
            property.payload.push({
              key: target,
              value
            })
          }
        }
    
        setState((prev: any) => ({
          ...prev,
          attachment: prev['attachment']
        }))
    }

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()
      const payloadfinal: FilterOptions[] = property.payload ?? []
      payloadfinal.push({
        key: 'files',
        value: property.select
      })
      const result = await postTraining(payloadfinal)
      if(result.success){
        Notify('Success create training', 'success', 3000)
        setState((prev: any) => ({
          ...prev,
          modal: null
        }))
        router.push('/usr/knowledge/training')
      }
      console.log(result)
    }

    const valueDescription: string = property?.payload.find((res: FilterOptions) => res.key === 'description')?.value ?? ''
    const valueVersion: string = property?.payload.find((res: FilterOptions) => res.key === 'version')?.value ?? ''

  return (
    <>
        <Modal name={name} disableClose={false}>
            <div className="w-full">
                <form className="p-5 block w-full md:w-[500px]" onSubmit={(e) => handleSubmit(e)}>
                    <h1 className="font-bold text-xl">Create Training</h1>
                    <div className="space-y-2 mt-5">
                        <div>
                            <InputText 
                                id="descriptiontraining"
                                name="descriptiontraining"
                                value={valueDescription}
                                onChange={value => handleFilter(value, 'description')}
                                placeholder="Description"
                                label="Description"
                            />
                        </div>
                        <div>
                            <InputText 
                                id="versiontraining"
                                name="versiontraining"
                                value={valueVersion}
                                onChange={value => handleFilter(value, 'version')}
                                placeholder="Version"
                                label="Version"
                            />
                        </div>
                        <div>
                          {property?.select?.length} Files Selected
                        </div>
                    </div>
                    <button className="btn-primary mt-5" type="submit">Create Training</button>
                </form>
            </div>
        </Modal>
    </>
  )
}
