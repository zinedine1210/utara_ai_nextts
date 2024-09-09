'use client'
import Modal from "@@/app/components/Partials/Modal";
import { getDialOptions, postChannel } from "@@/src/hooks/CollectionAPI";
import { checkSessionWhatsapp, createSessionWhatsapp } from "@@/src/hooks/WhatsappCollection";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { Notify } from "@@/src/utils/script";
import Image from "next/image";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { ProfileModel } from "../lib/model";
import Select from "@@/app/components/Input/Select";
import { DialModel } from "@@/app/usr/knowledge/dial/lib/model";
import { Options } from "@@/src/types/types";
import InputText from "@@/app/components/Input/InputText";

export default function ModalCreateWhatsapp({
    name
}: {
    name: string
}) {
    const { state, setState } = useGlobalContext()
    const [qr, setQR] = useState<string>('')
    const [value, setValue] = useState<string>('')
    const [dialvalue, setDialValue] = useState<string>('+62')
    const modaldata = state?.modal
    const optionsCollection: {[key: string]: Options[]} = state.options

    const handleSubmit = useCallback(async (e?: FormEvent) => {
        e?.preventDefault()
        if(!value) return Notify("Please fill whatsapp number", 'error')
        const valueFinal: string = dialvalue + value
        setValue(valueFinal)
        const result = await createSessionWhatsapp(valueFinal)
        if(result.success){
            setQR(result.data.qr)
        }
    }, [value, dialvalue])

    const handleAuthenticated = useCallback(async () => {
        // action to add to database
        const array = [ ...modaldata.data, value ]
        const result = await postChannel(array, 'whatsapp')
        const valueModel = new ProfileModel(result.data)
        setState({ ...state, profile: valueModel, modal: null })
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

      const getDial = async () => {
        const result = await getDialOptions()
        const toOptions: Options[] = DialModel.toOptions2(result)
        setState((prev: any) => ({
            ...prev,
            options: {
                dialInternational: toOptions
            }
        }))
      }

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
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="inputwhatsappnumber" className="mb-2 inline-block text-sm">Whatsapp Number</label>
                        <div className="flex items-center">
                            <div className="w-fit">
                                <Select 
                                    id="dialinternational"
                                    name="dialinternational"
                                    onChange={value => setDialValue(value)}
                                    value={dialvalue}
                                    onTrigger={() => getDial()}
                                    // label=""
                                    position="left-0"
                                    options={optionsCollection?.dialInternational ?? []}
                                />
                            </div>
                            <div className="w-full">
                                <InputText 
                                    id="numberwhatsapp"
                                    name="numberwhatsapp"
                                    type="number"
                                    placeholder="Example 89508..."
                                    onChange={value => setValue(value)}
                                    value={value}
                                />
                            </div>
                        </div>
                        <button className="btn-primary mt-5" type="submit" disabled={!value}>Create Session</button>
                    </form>
                }
            </div>
        </Modal>
    </>
  )
}
