"use client"
import InputText from "@@/app/components/Input/InputText";
import Select from "@@/app/components/Input/Select";
import { IconsCollection } from "@@/src/constant/icons";
import { FilterOptions, InitTopUpType, Options } from "@@/src/types/types";
import { formatCurrency, Notify } from "@@/src/utils/script";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { useEffect } from 'react';
import HistoryTopUp from "./components/ModalHistoryTopUp";
import ModalHistoryTopUp from "./components/ModalHistoryTopUp";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { useRouter } from "next/navigation";
import { initializeTopUp } from "@@/src/hooks/CollectionAPI";
import { ResponseData } from "@@/src/types/apitypes";


const TopupPage = ({ params, searchParams }) => {
    const { setState, state } = useGlobalContext()
    const modalName: string = "modalhistorytopup"
    const [tokenValue, setTokenValue] = useState('');
    const [nominalValue, setNominalValue] = useState('');
    const [voucher, setVoucher] = useState<string>('')
    const [isTyping, setIsTyping] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)
    const tab: string | null = searchParams?.tab
    const tabHistory: string | null = searchParams?.tabHistory
    const initTopUpData: null | InitTopUpType = state?.initTopUp

    useEffect(() => {
        // Load Snap.js script secara dinamis
        const script = document.createElement('script');
        const urlMidtrans: string = process.env.NEXT_PUBLIC_MIDTRANS_API
        script.src = urlMidtrans + '/snap/snap.js';
        script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT!);
        script.async = true;
        document.body.appendChild(script);
        setState((prev: any) => ({ ...prev, modal: { name: modalName }}))
        return () => {
            if(script){
                document.body.removeChild(script) // hapus script jika sudah digunakan
            }
        }
    }, [setState]);

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

    const checkout = async () => {
        setState((prev: any) => ({...prev, initTopUp: null}))
        setLoading(true)
        if(!initTopUpData) return Notify('Initialize not found, please try again later', 'info', 3000)
        const finaldata: InitTopUpType = initTopUpData
        const data = {
            id: finaldata.trans_id,
            productName: "GAI Token",
            price: finaldata.total_amount,
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

    const requestInit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const priceFinal: number = Number(nominalValue)
        const data = {
            trans_id: (~~(Math.random() * 10000) + 1).toString(),
            currency: "IDR",
            amount: priceFinal,
            total_amount: priceFinal,
            voucher_code: voucher,
        };
        let payload: FilterOptions[] = []
        Object.entries(data).forEach(el => {
            payload.push({
                key: el[0],
                value: el[1]
            })
        });
        const response: ResponseData = await initializeTopUp(payload)
        console.log(response)
        if(response.success){
            setState((prev: any) => ({
                ...prev,
                initTopUp: response.data
            }))
        }
        setLoading(false)
    }

    const optionsVoucher: Options[] = [
        {
            label: "Voucher 1",
            value: 'hkas89nas09a'
        },
        {
            label: "Voucher 2",
            value: 'Jsoau9as9812'
        },
        {
            label: "Voucher 3",
            value: 'adlJAJS8ja71'
        },
    ]
    
    return (
        <div className="w-full h-full overflow-hidden">
            <div className="p-5 space-x-5 flex">
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <h1 className="font-bold text-xl text-primary">Top Up GAI Token</h1>
                        <Link href={tab ? `?`: `?tab=history`}>
                            <button className="btn-secondary">History</button>
                        </Link>
                    </div>
                    <form onSubmit={(e: FormEvent) => requestInit(e)} className="mt-5 space-y-5">
                        <div className="bg-zinc-200 dark:bg-darkSecondary p-5 rounded-md">
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
                        <div>
                            <h1 className="font-semibold">Voucher</h1>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-2">Redeem your voucher here</p>
                            <div className="flex items-center gap-5 w-1/2">
                                <Select 
                                    id="voucherselect"
                                    name="voucherselect"
                                    onChange={(value) => setVoucher(value)}
                                    value={voucher}
                                    required={false}
                                    options={optionsVoucher}
                                    placeholder="Select your claim voucher"
                                />
                                <InputText 
                                    id="vouchername"
                                    name="vouchername"
                                    required={false}
                                    onChange={(value) => setVoucher(value)}
                                    value={voucher}
                                    placeholder="Enter your code"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button type="submit" className="btn-primary">
                                <Icon icon={IconsCollection.request} className="text-xl"/>
                                Request
                            </button>
                            <a href={`https://simulator.sandbox.midtrans.com/`} target="_blank" className="btn-secondary">Simulation Payment</a>
                        </div>
                    </form>
                </div>
            </div>
            {
                tab == "history" && <ModalHistoryTopUp tabHistory={tabHistory} modalName={modalName} />
            }
            {
                initTopUpData && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/65 z-50">
                        <div className="bg-white rounded-md shadow-md p-5 w-full max-w-xl relative">
                            <h1 className="font-bold text-base">Checkout Detail</h1>
                            <Icon icon={IconsCollection.money} className="absolute top-0 right-0 text-[250px] -rotate-12 text-primary/10"/>
                            <div className="border-y border-dashed py-2 mt-2 space-y-1">
                                <div className="flex items-center text-sm justify-between">
                                    <p className="font-bold">Transaction ID</p>
                                    <p className="text-zinc-600">{initTopUpData?.trans_id}</p>
                                </div>
                                <div className="flex items-center text-sm justify-between">
                                    <p className="font-bold">Status</p>
                                    <p className="text-zinc-600">{initTopUpData?.status}</p>
                                </div>
                                <div className="flex items-center text-sm justify-between">
                                    <p className="font-bold">Currency</p>
                                    <p className="text-zinc-600">{initTopUpData?.currency}</p>
                                </div>
                                <div className="flex items-center text-sm justify-between">
                                    <p className="font-bold">Total Amount</p>
                                    <p className="text-zinc-600">{formatCurrency(initTopUpData?.total_amount ?? 0, false)}</p>
                                </div>
                            </div>

                            <footer className="flex items-center gap-2 mt-2">
                                <button onClick={() => checkout()} type="button" className="btn-primary">
                                    <Icon icon={IconsCollection.request} className="text-xl"/>
                                    Checkout
                                </button>
                            </footer>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default TopupPage;
