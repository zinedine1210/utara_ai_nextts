"use client"
import InputText from "@@/app/components/Input/InputText";
import { IconsCollection } from "@@/src/constant/icons";
import { Notify } from "@@/src/utils/script";
import { Icon } from "@iconify/react";
import { FormEvent, useState } from "react";
import { useEffect } from 'react';

const TopupPage = () => {
    const [tokenValue, setTokenValue] = useState('');
    const [nominalValue, setNominalValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        // Load Snap.js script secara dinamis
        const script = document.createElement('script');
        const urlMidtrans: string = process.env.NEXT_PUBLIC_MIDTRANS_API
        script.src = urlMidtrans + '/snap/snap.js';
        script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT!);
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
            if(script){
                document.body.removeChild(script) // hapus script jika sudah digunakan
            }
        }
    }, []);

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    const convertRate = 5000;

    // Handle token input change
    const handleTokenChange = (event) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        const numericValue = parseInt(inputValue, 10);
        setTokenValue(isNaN(numericValue) ? '' : numericValue.toString());

        if (!isTyping) {
            setNominalValue((numericValue * convertRate).toString());
        }
    };

    // Handle nominal input change
    const handleNominalChange = (event: string) => {
        const inputValue = event.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        const numericValue = parseInt(inputValue, 10);
        setNominalValue(isNaN(numericValue) ? '' : numericValue.toString());

        if (!isTyping) {
            setTokenValue((numericValue / convertRate).toString());
        }
    };

    const formattedNominalValue = nominalValue ? formatter.format(parseInt(nominalValue, 10)) : '';

    const checkout = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const priceFinal: number = Number(nominalValue)
        const data = {
            id: ~~(Math.random() * 10000) + 1,
            productName: "GAI Token",
            price: priceFinal,
            quantity: 1,
        };

        const response = await fetch("/api/tokenizer", {
            method: "POST",
            body: JSON.stringify(data),
        });

        const requestData = await response.json();
        if(requestData?.token){
            if (typeof window.snap !== 'undefined') {
                window.snap.pay(requestData.token, {
                    onSuccess: function (result) {
                        Notify('Payment Success!', "info", 3000);
                        console.log(result);
                    },
                    onPending: function (result) {
                        Notify('Payment Pending!', "info", 3000);
                        console.log(result);
                    },
                    onError: function (result) {
                        Notify('Payment Failed!', "info", 3000);
                        console.log(result);
                    },
                    onClose: function () {
                        Notify('Customer closed the popup without finishing the payment', "info", 3000);
                    },
                })
            } else {
                Notify(`Midtrans unready, please try again later or refresh page`, "error", 3000)
            }
        }else{
            Notify(`Failed to get token, please try again later`, "error", 3000)
        }
        setLoading(false)
    };


    return (
        <div className="w-full h-full overflow-hidden">
            <div className="p-5">
                <h1 className="font-bold text-xl text-primary">Top Up GAI Token</h1>
                <form onSubmit={(e: FormEvent) => checkout(e)} className="mt-5 space-y-5">
                    <div className="bg-zinc-200 p-5 rounded-md">
                        <h1 className="font-semibold mb-2 text-sm">Nominal Top Up</h1>
                        <InputText 
                            value={formattedNominalValue}
                            onChange={handleNominalChange}
                            id="nominaltopup"
                            name="nominaltopup"
                            placeholder="Input nominal top up"
                            prefixIcon={IconsCollection.money}
                        />
                    </div>
                    <div>
                        <h1 className="font-semibold mb-2">Recommended Top Up nominal</h1>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                            <button type="button" onClick={() => handleNominalChange("10000")} className="overflow-hidden block bg-primary text-start text-white rounded-xl shadow-xl p-5 relative">
                                <Icon icon={IconsCollection.money} className="-rotate-12 text-[120px] text-white text-opacity-20 absolute top-1/2 -translate-y-1/2 right-0 "/>
                                <div className="flex items-end gap-3">
                                    <h1 className="text-3xl font-bold">Rp</h1>
                                    <p className="text-lg">10.000</p>
                                </div>
                                <p className="text-sm">500 Token</p>
                            </button>
                            <button type="button" onClick={() => handleNominalChange("20000")} className="overflow-hidden block bg-primary text-start text-white rounded-xl shadow-xl p-5 relative">
                                <Icon icon={IconsCollection.money} className="-rotate-12 text-[120px] text-white text-opacity-20 absolute top-1/2 -translate-y-1/2 right-0 "/>
                                <div className="flex items-end gap-3">
                                    <h1 className="text-3xl font-bold">Rp</h1>
                                    <p className="text-lg">20.000</p>
                                </div>
                                <p className="text-sm">500 Token</p>
                            </button>
                            <button type="button" onClick={() => handleNominalChange("50000")} className="overflow-hidden block bg-primary text-start text-white rounded-xl shadow-xl p-5 relative">
                                <Icon icon={IconsCollection.money} className="-rotate-12 text-[120px] text-white text-opacity-20 absolute top-1/2 -translate-y-1/2 right-0 "/>
                                <div className="flex items-end gap-3">
                                    <h1 className="text-3xl font-bold">Rp</h1>
                                    <p className="text-lg">50.000</p>
                                </div>
                                <p className="text-sm">500 Token</p>
                            </button>
                            <button type="button" onClick={() => handleNominalChange("100000")} className="overflow-hidden block bg-primary text-start text-white rounded-xl shadow-xl p-5 relative">
                                <Icon icon={IconsCollection.money} className="-rotate-12 text-[120px] text-white text-opacity-20 absolute top-1/2 -translate-y-1/2 right-0 "/>
                                <div className="flex items-end gap-3">
                                    <h1 className="text-3xl font-bold">Rp</h1>
                                    <p className="text-lg">100.000</p>
                                </div>
                                <p className="text-sm">500 Token</p>
                            </button>
                            <button type="button" onClick={() => handleNominalChange("500000")} className="overflow-hidden block bg-primary text-start text-white rounded-xl shadow-xl p-5 relative">
                                <Icon icon={IconsCollection.money} className="-rotate-12 text-[120px] text-white text-opacity-20 absolute top-1/2 -translate-y-1/2 right-0 "/>
                                <div className="flex items-end gap-3">
                                    <h1 className="text-3xl font-bold">Rp</h1>
                                    <p className="text-lg">500.000</p>
                                </div>
                                <p className="text-sm">500 Token</p>
                            </button>
                            <button type="button" onClick={() => handleNominalChange("1000000")} className="overflow-hidden block bg-primary text-start text-white rounded-xl shadow-xl p-5 relative">
                                <Icon icon={IconsCollection.money} className="-rotate-12 text-[120px] text-white text-opacity-20 absolute top-1/2 -translate-y-1/2 right-0 "/>
                                <div className="flex items-end gap-3">
                                    <h1 className="text-3xl font-bold">Rp</h1>
                                    <p className="text-lg">1.000.000</p>
                                </div>
                                <p className="text-sm">500 Token</p>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button type="submit" className="btn-primary">
                            <Icon icon={IconsCollection.save} className="text-xl"/>
                            Checkout
                        </button>
                        <a href={`https://simulator.sandbox.midtrans.com/`} target="_blank" className="btn-secondary">Simulation Payment</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TopupPage;
