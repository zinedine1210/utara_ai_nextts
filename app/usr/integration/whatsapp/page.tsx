'use client'
import Modal from "@@/app/components/Modal";
import { getProfile } from "@@/src/hooks/CollectionAPI";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import myImageLoader from "@@/src/utils/loader";
import { Notify } from "@@/src/utils/script";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
export default function WhatsappOfficial() {
  const { state, setState } = useGlobalContext()
  const [open, setOpen] = useState(false)
  const statename = 'whatsapplist'
  const data: any[] | undefined = state?.[statename]

  const initialMount = useCallback(async () => {
    const result = await getProfile()
    console.log(result)
    if(!result.success){
      Notify(result.message ?? "Something went wrong when get data", 'Info', 3000)
      return false
    }
    setState({ ...state, [statename]: [] })
  }, [state, setState])

  useEffect(() => {
    if(!state?.[statename]){
      initialMount()
    }
  }, [initialMount, state])

  return (
    <>
      <div className="w-full h-full flex flex-col bg-white">
        <div className='bg-green-100 dark:bg-green-700 w-full p-5 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <Icon icon={'ic:baseline-whatsapp'} className='text-green-500 dark:text-white text-3xl'/>
                <h1 className='text-xl font-bold'>Whatsapp</h1>
            </div>
            <button className='btn-primary' onClick={() => setOpen(true)}>
                Add Whatsapp
            </button>
        </div>

        <div className='flex items-center justify-center overflow-y-auto w-full relative flex-1'>
            {
                data ?
                data.length > 0 ?
                <>
                    <div className='w-full xl:w-1/2 space-y-2 px-5'>
                        {/* <button className='btn-secondary' onClick={() => getAllChannel()}>
                            <IoRefresh />
                            Refresh
                        </button> */}
                        {
                            data.map((item, key) => {
                                return (
                                  <div key={key}>
                                    asjkajskajsaksjaksas
                                  </div>
                                )
                            })
                        }
                    </div>
                </>
                
                :
                <div className='mx-auto w-full xl:w-1/4 text-center'>
                    <Image src={"/images/whatsapp.png"} width={512} className='w-1/2 mx-auto mb-10' height={512} alt="whatsapp business" placeholder={`data:image/${myImageLoader(512, 512)}`}/>
                    <h1>No Whatsapp Business Account Yet</h1>
                    <p className='text-zinc-500 text-sm'>Your integrated WhatsApp Business account list will appear here.</p>
                </div>
                :
                <div className='space-y-2 px-5'>
                    {
                        new Array(10).fill("mantap").map((item, key) => {
                            return (
                                <div className='w-full xl:w-1/2 h-16 bg-zinc-300 animate-pulse' key={key}>
                            </div>
                            )
                        })
                    }
                </div>
            }
        </div>
        <Modal isOpen={open} setOpen={setOpen}>
          <div>
            asasajks
          </div>
        </Modal>
      </div>
    </>
  )
}