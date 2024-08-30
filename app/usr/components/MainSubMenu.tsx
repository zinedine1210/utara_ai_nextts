import { useEffect, useState } from "react"
import Link from "next/link"
import { Icon } from '@iconify/react';
import { usePathname } from "next/navigation";
import { MenusList } from "@@/src/types/types";

export default function MainSubMenu({
    active,
    menus
}: {
    active: string,
    menus: MenusList[]
}) {
    const [submenu, setSubMenu] = useState<MenusList[]>([])
    const pathname = usePathname()


    useEffect(() => {
        if(menus && active){
            const split = active.split("_").slice(0, 2).join("_")
            const filter = menus.filter(res => res.parent === split)
            setSubMenu(filter)
        }
    }, [active, menus])

    if(submenu.length > 0)
  return (
    <div className="hidden md:block xl:max-w-40 xl:min-w-40 2xl:max-w-56 2xl:min-w-56 w-full overflow-hidden border-r dark:border-darkSecondary duration-300 ease-in-out transition-all">
        {
            submenu.map((item: MenusList, index: number) => {
                if(item.show)
                return (
                    <div key={index}>
                        {index == 0 && (
                            <div className="p-2">
                                <h1 className="text-zinc-500 text-sm xl:text-[10px] 2xl:text-sm capitalize dark:text-white">{item.flag}</h1>
                            </div>
                        )}
                        <Link key={index} href={item.route}>
                            <button className={`${item.route == pathname && 'bg-primary/30 hover:bg-primary/30'} full-hover text-sm xl:text-[11px] 2xl:text-sm flex items-center gap-2 px-3 py-2.5 xl:py-2 xl:px-4 2xl:px-5 2xl:py-3 relative hover:bg-primary/20`}>
                                <Icon icon={item.icon} style={{color: item.iconColor}} className={`text-sm xl:text-sm 2xl:text-xl ${!item?.iconColor && 'text-primary'}`}/>
                                {item.name}
                            </button>
                        </Link>
                    </div>
            )
            })
        }
    </div>
  )
}
