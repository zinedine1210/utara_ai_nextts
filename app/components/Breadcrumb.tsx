'use client'
import { MenusList } from "@@/src/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";

export default function Breadcrumb() {
    const pathname = usePathname()
    const [clientMenus, setClientMenus] = useState<MenusList[]>([])
    function generateCombinations(input: string): MenusList[] | null {
        const result: MenusList[] = [];
        if(clientMenus.length > 0){
            const parts = input.split('/');
            for (let i = parts.length; i > 2; i--) {
                const pathRoute = parts.slice(0, i).join('/')
                let findIndex = clientMenus.findIndex(res => res.route == pathRoute)
                if(findIndex == -1){
                    findIndex = clientMenus.findIndex(res => res.id == `clm_${parts.slice(2, 3)}`)
                }
                if(clientMenus[findIndex]){
                    result.push(clientMenus[findIndex])
                }else{
                    return null
                }
            }
        }
        return result;
    }

    useEffect(() => {
        const getlocal: string | null = localStorage.getItem('client_menus') ?? null

        if(getlocal){
            const parseMenus: MenusList[] = JSON.parse(getlocal)
            setClientMenus(parseMenus)
        }
    }, [])

    const breadcrumblist: MenusList[] | null = generateCombinations(pathname)

    if(breadcrumblist && breadcrumblist.length > 2)
    return (
        <nav className="flex z-40 py-1.5 md:py-1" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {
                    breadcrumblist && breadcrumblist.reverse().map((bread: MenusList, index: number) => {
                        return (
                            <li key={index}>
                                <div className="flex items-center">
                                    {index == 0 ? 
                                        <Icon icon={bread?.icon} className="text-sm md:text-lg"/>
                                        :
                                        <Icon icon={'material-symbols-light:chevron-right'} className="text-sm md:text-lg"/>
                                    }
                                    <Link href={bread.route}>
                                        <button type={"button"} className="ms-1 text-xs md:text-sm font-medium hover:text-white text-zinc-300 md:ms-2">{bread.name}</button>
                                    </Link>
                                </div>
                            </li>

                        )
                    })
                }
            </ol>
        </nav>
    )
}
