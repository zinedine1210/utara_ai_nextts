'use client'
import { getProfile } from "@@/src/hooks/CollectionAPI";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import myImageLoader from "@@/src/utils/loader";
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
    const value = new ProfileModel(result.data)
    setState({ ...state, [statename]: value })
  }, [state, setState])

  useEffect(() => {
    if(!state?.[statename]){
      initialMount()
    }
  }, [initialMount, state])

  const addWhatsappTrigger = () => setState({ ...state, modal: { name: modalName, data: data?.[channelName] ?? [] }})
  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className='bg-green-100 dark:bg-green-700 w-full px-3 md:px-7 py-8 md:py-16 flex items-center justify-between'>
            <div className='md:flex items-center gap-2'>
                <Icon icon={'ic:baseline-whatsapp'} className='text-green-500 dark:text-white text-6xl'/>
                <h1 className='text-lg md:text-2xl font-bold'>Whatsapp Official</h1>
            </div>
            <button className='btn-primary' onClick={addWhatsappTrigger}>
                Add Whatsapp
            </button>
        </div>
        <div className="md:flex justify-evenly flex-1">
          <div className="w-full md:w-1/2 ">
            {
              data ?
                  data?.[channelName] ?
                  <>
                      <div className='w-full space-y-2 p-5'>
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
          </div>
          <div className="hidden md:block w-full h-full xl:w-1/3 bg-white dark:bg-darkPrimary xl:-mt-10 rounded-md p-5 shadow-md">
                <h1 className="text-xl mb-5">Whatsapp Channel Integration</h1>
                <p className="text-sm text-zinc-500">You can only connect with your personal whatsapp number to react with AI</p>
                <ul className="my-2 space-y-2">
                    <li className="flex gap-2">
                    <span className="bg-green-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">1</span>
                    <p className="text-sm text-zinc-500 w-full ">Create session with your valid whatsapp number</p>
                    </li>
                    <li className="flex gap-2">
                    <span className="bg-green-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">2</span>
                    <p className="text-sm text-zinc-500 w-full ">QR code will generate, you can scan with your phone whatsapp integration</p>
                    </li>
                    <li className="flex gap-2">
                    <span className="bg-green-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">3</span>
                    <p className="text-sm text-zinc-500 w-full ">Wait for the process to complete</p>
                    </li>
                    <li className="flex gap-2">
                    <span className="bg-green-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">4</span>
                    <p className="text-sm text-zinc-500 w-full ">When the number status is authenticated, your whatsapp ready to service</p>
                    </li>
                </ul>
            </div>
        </div>
        <ModalCreateWhatsapp name={modalName}/> 
      </div>
    </>
  )
}