'use client'

import { Options } from "@@/src/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from  "react";
import InputText from "./InputText";

export default function Select({ 
    options, 
    id, 
    name, 
    label, 
    onChange, 
    value, 
    customCss='text-sm py-2.5 px-5',
    required=true,
    prefixIcon,
    errorMessage,
    disabled=false,
    defaultAll=false,
    position='right-0',
    placeholder,
    onTrigger,
    justIconOnMobile=false
}: {
    options: Options[],
    id: string,
    name: string,
    customCss?: string,
    label?: string,
    onChange: (value: any) => void,
    value: any,
    required?: boolean,
    prefixIcon?: string,
    errorMessage?: string,
    defaultAll?: boolean,
    position?: string,
    placeholder?: string,
    disabled?: boolean,
    onTrigger?: () => void,
    justIconOnMobile?: boolean
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [keyword, setKeyword] = useState<string>('')

    // Fungsi untuk menutup dropdown jika klik di luar
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleOpen = async () => {
        if(onTrigger && !isOpen && options.length == 0){
            onTrigger()
        }
        setIsOpen(!isOpen)
    }

    // Menggunakan useEffect untuk mendeteksi klik di luar
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const valueNow = () => {
        if(defaultAll){
            if(value == ''){
                return placeholder ?? 'Select'
            }else{
                if(options.length > 0){
                    return options.find(res => res.value == value)?.label
                }else return value
            }
        }else{
            if(value == ''){
                return placeholder ?? 'Select'
            }else{
                if(options.length > 0){
                    return options.find(res => res.value == value)?.label
                }else return value
            }
        }
    }
    return (
        <div ref={dropdownRef} className="relative w-full">
            <div className="w-full">
                {label && <label className="mb-1 inline-block font-semibold text-sm xl:text-xs 2xl:text-sm capitalize" htmlFor={id}>{label} {required && <span className="text-red-500">*</span>}</label>}
                <div className="relative w-full">
                    {prefixIcon && <Icon icon={prefixIcon} className="text-2xl -translate-y-1/2 top-1/2 left-3 dark:text-white/80 text-black/50 absolute"/>}
                    <button type="button" disabled={disabled} onClick={() => handleOpen()} className={`${customCss} ${prefixIcon && 'pl-12'} ${errorMessage && 'border-red-500 dark:border-red-500 dark:focus:border-red-500 focus:border-red-500'} bg-zinc-50 transition-colors duration-300 disabled:bg-zinc-300 disabled:placeholder:text-black disabled:text-black dark:disabled:bg-black dark:disabled:placeholder:text-zinc-400 dark:disabled:text-zinc-400 outline-none border hover:bg-zinc-100 focus:bg-white focus:border-primary dark:bg-dark dark:border-white/50 dark:focus:border-primary rounded-md w-full flex items-center justify-between`}>
                        <span className={`${justIconOnMobile && 'hidden md:block'}`}>{valueNow()}</span>
                        <Icon icon={'tabler:chevron-down'} className={`${isOpen && 'rotate-180'} duration-300 text-xl text-primary`}/>
                    </button>
                </div>
                {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
            </div>
            {isOpen && (
                <div className={`${position} absolute w-full top-full bg-white dark:bg-dark dark:border-white/30 border shadow-lg rounded z-50 min-w-44 flex flex-col`}>
                    <div className="p-2">
                        <InputText 
                            placeholder="Search by label"
                            value={keyword}
                            required={false}
                            onChange={value => setKeyword(value)}
                            name={name}
                            id={id}
                        />
                    </div>
                    <div className="max-h-80 h-full overflow-y-auto">
                        {
                            defaultAll && (
                                <button type="button" onClick={() => onChange('')} className={`${value == '' ?"bg-primary text-white font-bold":"dark:text-zinc-500 hover:bg-primary/30"} duration-300 p-2 cursor-pointer flex items-center gap-2 w-full text-start`}>
                                    All
                                </button>
                            )
                        }
                        
                        {
                            options.filter(item => {
                                const value = item.label.toLowerCase();
                                let queryIndex = 0;
                                for (let i = 0; i < value.length; i++) {
                                    if (value[i] === keyword[queryIndex]) {
                                        queryIndex++;
                                    }
                                    if (queryIndex === keyword.length) {
                                        return true;
                                    }
                                } 
                                return false;
                            }).map((opt, index) => {
                                return (
                                    <button type="button" key={index} onClick={() => onChange(opt.value)} className={`${opt.value == value ?"bg-primary text-white font-bold":"dark:text-zinc-400 hover:bg-primary/30"} duration-300 p-2 cursor-pointer flex items-center gap-2 w-full text-start`}>
                                        {opt.label}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
