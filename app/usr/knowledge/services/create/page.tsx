'use client'
import InputText from '@@/app/components/Input/InputText'
import Select from '@@/app/components/Input/Select'
import { ProfileModel } from '@@/app/usr/integration/whatsapp/lib/model'
import { getFromOptions, serviceOptions, statusOptions } from '@@/src/constant/status'
import { baseDomain, getEnume, getProfile, getTraining, postServices } from '@@/src/hooks/CollectionAPI'
import { useGlobalContext } from '@@/src/providers/GlobalContext'
import React, { FormEvent, useState } from 'react'
import { TrainingModel } from '../../training/lib/model'
import { FilterOptions } from '@@/src/types/types'
import { Icon } from '@iconify/react/dist/iconify.js'
import { IconsCollection } from '@@/src/constant/icons'
import { Notify } from '@@/src/utils/script'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function ServiceCreatePage() {
    const { state, setState } = useGlobalContext()
    const router = useRouter()
    const [value, setValue] = useState<{[key: string]: string}>({
        "type": "QNA",
        "description": "",
        "channel_id": "",
        "channel": "WHATSAPP",
        "prompt": "<s>[INST] Kamu ada asisten AI yang bertugas menjawab pertanyaan berdasarkan konteks dan jika tidak tahu jawab saja 'Tidak tahu' jangan mengarang jawaban - {context} </s>[INST] [INST] Jawab pertanyaan berikut - {question}[/INST]",
        "data": "",
        "status": "ACTIVE",
        "rec_by": "tempy",
    })
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const objPayload: {[key: string]: any} = value
        objPayload.service_id = objPayload.type.toLowerCase()
        objPayload.properties = {
            data: objPayload.data
        }
        console.log(objPayload)
        delete objPayload.data
        saveService(objPayload)
    }
    const saveService = async (payload: any) => {
        let objPayload: FilterOptions[] = Object.entries(payload).map((item) => {
            return {
                key: item[0],
                value: item[1]
            }
        })
        // console.log(objPayload)
        const result = await postServices(objPayload)
        if(result.success){
            Notify('Success create service', 'success', 3000)
            router.push('/usr/knowledge/services')
        }
    }
    const handleChange = (input: any, target: string) => {
        setValue({ ...value, [target]: input})
    }
    const checkFill = (target: string) => value[target] == '' ? 'This input must be filled in':''
    const funcAllOptions: {[key: string]: () => void} = {
        'channel_id': async () => {
            if(state.profile){
                state.options.whatsapp = state.profile.whatsapp.map((item: string) => {
                    return { label: item, value: item }
                })
            }else{
                const result = await getProfile()
                const value: ProfileModel = new ProfileModel(result.data)
                state.profile = value
                state.options.whatsapp = value.whatsapp.map((item: string) => {
                    return { label: item, value: item }
                })
            }
            setState({ ...state, options: state.options })
        },
        'data': async () => {
            if(state.trainingdata){
                state.options.trainingdata = TrainingModel.toOptionsFromModel(state.trainingdata.data)
            }else{
                const filter: FilterOptions[] = [
                    {
                        key: 'size',
                        value: 100
                    },
                    {
                        key: 'page',
                        value: 1
                    }
                ]
                const result = await getTraining(filter)
                const value = TrainingModel.toOptions(result.data)
                state.options.trainingdata = value
            }

            setState({ ...state, options: state.options })
        },
        'enumServiceType': async () => {
            if(!state.options.enumServiceType){
                const result = await getEnume('/service_model/ServiceType')
                const value = getFromOptions(result.data)
                state.options.enumServiceType = value
            }

            setState({ ...state, options: state.options })
        },
        'enumServiceStatus': async () => {
            if(!state.options.enumServiceStatus){
                const result = await getEnume('/service_model/ServiceStatus')
                const value = getFromOptions(result.data)
                state.options.enumServiceStatus = value
            }

            setState({ ...state, options: state.options })
        },
    }
    const isValid = () => {
        let valid: boolean = true
        Object.entries(value).forEach((item: string[]) => {
            if(item[1] == ''){
                valid = false
            }
        })

        return valid
    }
  return (
    <div className='w-full flex flex-col pt-12 px-2'>
        <div className='w-full md:w-1/2 bg-white dark:bg-dark shadow-white/50 rounded-md p-5 shadow-md'>
            <h1 className="font-bold text-xl">Services</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Select your file to start training data</p>

            <form className='w-full space-y-2 mt-5' onSubmit={(e: FormEvent) => handleSubmit(e)}>
                <div className='w-full'>
                    <InputText 
                        value={value.description}
                        id='descriptionServices'
                        name='descriptionServices'
                        onChange={value => handleChange(value, 'description')}
                        placeholder='Type description'
                        errorMessage={checkFill('description')}
                        label='Description'
                    />
                </div>
                <div className='w-full'>
                    <Select 
                        value={value.data}
                        options={state.options.trainingdata ?? []}
                        onTrigger={() => funcAllOptions['data']()}
                        id='trainingDataServices'
                        name='trainingDataServices'
                        label='Training Data'
                        placeholder='Select Training Data'
                        onChange={(value) => handleChange(value, 'data')}
                        errorMessage={checkFill('data')}
                    />
                </div>
                <div className='w-full'>
                    <Select 
                        value={value.channel_id}
                        options={state.options.whatsapp ?? []}
                        onTrigger={() => funcAllOptions['channel_id']()}
                        id='channelIdServices'
                        name='channelIdServices'
                        label='Channel ID'
                        placeholder='Select Channel ID'
                        onChange={(value) => handleChange(value, 'channel_id')}
                        errorMessage={checkFill('channel_id')}
                    />
                </div>
                <div className='w-full'>
                    <Select 
                        value={value.type}
                        options={state.options.enumServiceType ?? []}
                        onTrigger={() => funcAllOptions['enumServiceType']()}
                        id='typeServices'
                        name='typeServices'
                        label='Type'
                        placeholder='Select type'
                        onChange={(value) => handleChange(value, 'type')}
                        errorMessage={checkFill('type')}
                    />
                </div>
                <div className='w-full'>
                    <Select 
                        value={value.status}
                        options={state.options.enumServiceStatus ?? []}
                        onTrigger={() => funcAllOptions['enumServiceStatus']()}
                        id='statusServices'
                        name='statusServices'
                        label='Status'
                        placeholder='Select status'
                        onChange={(value) => handleChange(value, 'status')}
                        errorMessage={checkFill('status')}
                    />
                </div>
                <div className='mt-5 pt-5'>
                    <button className='btn-primary' disabled={isValid() ? false:true}>
                        <Icon icon={IconsCollection.save} className='text-xl'/>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}
