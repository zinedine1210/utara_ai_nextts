'use client'
import { getProfile } from "@@/src/hooks/CollectionAPI";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import myImageLoader from "@@/src/utils/loader";
import { Notify } from "@@/src/utils/script";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { ProfileModel } from "./lib/model";
import Loading from "@@/app/loading";
import ModalCreateWhatsapp from "./components/ModalCreateWhatsapp";
import CardWhatsapp from "./components/CardWhatsapp";

export default function WhatsappOfficial() {
  const { state, setState } = useGlobalContext()
  const statename = 'profile'
  const channelName = 'whatsapp'
  const modalName = 'modalcreatewhatsapp'
  const data: ProfileModel | undefined = state?.[statename]

  const initialMount = useCallback(async () => {
    const result = await getProfile()
    if(!result.success){
      Notify(result.message ?? "Something went wrong when get data", 'Info', 3000)
      return false
    }
    const value = new ProfileModel(result.data)
    setState({ ...state, [statename]: value })
  }, [state, setState])

  useEffect(() => {
    if(!state?.[statename]){
      initialMount()
    }
  }, [initialMount, state])

  const addWhatsappTrigger = () => setState({ ...state, modal: { name: modalName, data: data?.[channelName] }})
  return (
    <>
      <div className="w-full h-full flex flex-col bg-white">
        <div className='bg-green-100 dark:bg-green-700 w-full p-5 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <Icon icon={'ic:baseline-whatsapp'} className='text-green-500 dark:text-white text-3xl'/>
                <h1 className='text-xl font-bold'>Whatsapp</h1>
            </div>
            <button className='btn-primary' onClick={addWhatsappTrigger}>
                Add Whatsapp
            </button>
        </div>

            {
              data ?
                  data?.[channelName] ?
                  <>
                      <div className='w-full xl:w-1/2 space-y-2 p-5'>
                          {
                            data?.[channelName].map((item, key) => {
                              return <CardWhatsapp key={key} id={item}/>
                              })
                          }
                      </div>
                  </>
                :
                <div className='flex items-center justify-center overflow-y-auto w-full relative flex-1'>
                  <div className='mx-auto w-full xl:w-1/4 text-center'>
                      <Image src={"/images/whatsapp.png"} width={512} className='w-1/2 mx-auto mb-10' height={512} alt="whatsapp business" placeholder={`data:image/${myImageLoader(512, 512)}`}/>
                      <h1>No Whatsapp Business Account Yet</h1>
                      <p className='text-zinc-500 text-sm'>Your integrated WhatsApp Business account list will appear here.</p>
                  </div>
                </div>
                :
                <div className='flex items-center justify-center overflow-y-auto w-full relative flex-1'>
                  <Loading />
                </div>
            }
        <ModalCreateWhatsapp name={modalName}/> 
      </div>
    </>
  )
}