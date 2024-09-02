'use client'
import Modal from "@@/app/components/Partials/Modal";
import { postChannel } from "@@/src/hooks/CollectionAPI";
import { checkSessionWhatsapp, createSessionWhatsapp } from "@@/src/hooks/WhatsappCollection";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { Notify } from "@@/src/utils/script";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function ModalCreateWhatsapp({
    name
}: {
    name: string
}) {
    const { state, setState } = useGlobalContext()
    const [qr, setQR] = useState<string>('')
    const [value, setValue] = useState<string>('')
    const modaldata = state?.modal

    // const handleChange = (target: string, input: boolean | string | number) => {
    //     setValue({ ...value, [target]: input })
    // }

    const handleSubmit = useCallback(async () => {
        if(!value) return Notify("Please fill whatsapp number", 'error')
        const result = await createSessionWhatsapp(value)
        if(result.success){
            setQR(result.data.qr)
        }
    }, [value])

    const handleAuthenticated = useCallback(async () => {
        // action to add to database
        const array = [ ...modaldata.data, value ]
        const result = await postChannel(array, 'whatsapp')
        setState({ ...state, profile: result.data, modal: null })
        Notify("Berhasil authenticated", 'success')
        setQR('')
        setValue('')
    }, [value, modaldata, setState, state])

    const handleCheckSession = useCallback(async (value: string) => {
        const result = await checkSessionWhatsapp(value)
        if(result.success){
            const status = result.data.status
            if(status == 'authenticated'){
                handleAuthenticated()
            }
        }else{
            setQR('')
            Notify('Session expired create new Session', 'info')
            handleSubmit()
        }
    }, [handleSubmit, handleAuthenticated])

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (qr) {
          // Membuat interval yang akan menambahkan 1 pada count setiap detik
          interval = setInterval(() => {
            handleCheckSession(value)
          }, 5000); // 1000 ms = 1 detik
        }else{
            clearInterval(interval)
        }
    
        // Membersihkan interval saat komponen dilepas atau saat qr berubah
        return () => {
          if (interval) {
            clearInterval(interval);
          }
        };
      }, [qr, value, handleCheckSession]);

  return (
    <>
        <Modal name={name} disableClose={qr ? true : false}>
            <div className="min-w-96">
                {
                    qr ?
                    <div className="mx-auto text-center">
                        <h1 className='text-xl font-bold text-zinc-600'>{value}</h1>
                        {/* <button className='text-center text-blue-500 text-sm font-light'>Change Number</button> */}
                        <Image src={qr} alt="WhatsappINtegration" className="mx-auto" width={400} height={400}/>
                        <p className='text-start text-xl font-bold mt-5'>Integration to Whatsapp by QR Code</p>
                        <ul className='text-sm list-inside list-disc text-start'>
                        <li>Open Whatsapp on your phone</li>
                        <li>Go to Settings - Linked Devices - Link Desktop Device</li>
                        <li>Point your phone at this screen to confirm login</li>
                        </ul>
                    </div>
                    :
                    <>
                        <label htmlFor="inputwhatsappnumber" className="mb-2 inline-block text-sm">Whatsapp Number</label>
                        <input type="number" id="inputwhatsappnumber" onChange={(e) => setValue(e.target.value)} value={value} maxLength={12} className='bg-zinc-50 dark:bg-black text-sm py-2 px-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary w-full' placeholder='Type in 089508...' />
        
                        <button className="btn-primary mt-5" onClick={() => handleSubmit()} disabled={!value}>Create Session</button>
                    </>
                }
            </div>
        </Modal>
    </>
  )
}
