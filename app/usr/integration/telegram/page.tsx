'use client'
import { useGlobalContext } from '@@/src/providers/GlobalContext'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useCallback, useEffect } from 'react'
import { ProfileModel } from '../whatsapp/lib/model'
import { getProfile } from '@@/src/hooks/CollectionAPI'
import Image from 'next/image'
import Loading from '@@/app/loading'

export default function TelegramPage() {
    const { state, setState } = useGlobalContext()
    const statename = 'profile'
    const channelName = 'telegram'
    const modalName = 'modalcreatetelegram'
    const data: ProfileModel | undefined = state?.[statename]

    const initialMount = useCallback(async () => {
        const result = await getProfile()
        const value = new ProfileModel(result.data)
        setState({ ...state, [statename]: value })
    }, [state, setState])

    useEffect(() => {
        if(!state?.[statename]){
            initialMount()
        }
    }, [initialMount, state])

    const addTelegramTrigger = () => setState({ ...state, modal: { name: modalName, data: data?.[channelName] }})
  return (
    <>
    
        <div className="w-full bg-blue-100 dark:bg-blue-900 px-2 xl:px-5 py-5 xl:py-10 flex items-center gap-5">
            <Icon icon={'fa:telegram'} className="text-blue-500 text-9xl"/>
            <div>
                <h1 className="text-3xl mb-2 font-bold">Telegram</h1>
                <p className="text-zinc-500">Start communicating with your customers via Telegram.</p>
            </div>
        </div>
        <div className="xl:flex mx-2 xl:mx-5 gap-5">
            <div className="w-full xl:w-1/2 h-full py-5 space-y-2">
                {
                data ?
                    data?.[channelName] ?
                    <>
                        <div className='w-full space-y-2 p-5'>
                            {
                                data?.[channelName].map((item, key) => {
                                    return (
                                        <div key={key}>
                                            ajskajska
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                    :
                    <div className='flex items-center justify-center overflow-y-auto w-full relative flex-1'>
                    <div className='mx-auto w-full xl:w-1/4 text-center'>
                        {/* <Image src={"/images/whatsapp.png"} width={512} className='w-1/2 mx-auto mb-10' height={512} alt="whatsapp business" placeholder={`data:image/${myImageLoader(512, 512)}`}/> */}
                        <h1>No Telegram Business Account Yet</h1>
                        <p className='text-zinc-500 text-sm'>Your integrated Telegram Business account list will appear here.</p>
                    </div>
                    </div>
                    :
                    <div className='flex items-center justify-center overflow-y-auto w-full relative flex-1'>
                        <Loading />
                    </div>
                }
            </div>
            <div className="w-full xl:w-1/2 bg-white dark:bg-darkPrimary xl:-mt-32 rounded-md p-5 shadow-md h-full">
                <h1 className="text-xl mb-5">Telegram Channel Integration</h1>
                <p className="text-sm text-zinc-500">You can only connect with telegram bots, if you use personal telegram it {`won't`} work.</p>
                <ul className="my-2 space-y-1">
                    <li className="flex gap-2">
                    <span className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">1</span>
                    <p className="text-sm text-zinc-500 w-full ">Lorem ipsum dolor sit amet, consectetur</p>
                    </li>
                    <li className="flex gap-2">
                    <span className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">2</span>
                    <p className="text-sm text-zinc-500 w-full ">Lorem ipsum dolor sit amet, consectetur</p>
                    </li>
                    <li className="flex gap-2">
                    <span className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">3</span>
                    <p className="text-sm text-zinc-500 w-full ">Lorem ipsum dolor sit amet, consectetur</p>
                    </li>
                    <li className="flex gap-2">
                    <span className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">4</span>
                    <p className="text-sm text-zinc-500 w-full ">Lorem ipsum dolor sit amet, consectetur</p>
                    </li>
                    <li className="flex gap-2">
                    <span className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">5</span>
                    <p className="text-sm text-zinc-500 w-full ">Lorem ipsum dolor sit amet, consectetur</p>
                    </li>
                    <li className="flex gap-2">
                    <span className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">6</span>
                    <p className="text-sm text-zinc-500 w-full ">Lorem ipsum dolor sit amet, consectetur</p>
                    </li>
                </ul>
            </div>
        </div>
    </>
  )
}
