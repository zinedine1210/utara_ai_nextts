'use client'
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";
import MainSubMenu from "./MainSubMenu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { MenusList } from "@@/src/types/types";
import Breadcrumb from "./Breadcrumb";
// import Breadcrumb from "./Breadcrumb";

export default function Sidebar() {
  const [menus, setMenus] = useState<MenusList[]>([]);
  const pathname = usePathname()
  const [isActive, setActive] = useState('')

  const isActivePageID = useCallback(() => {
    const storedMenus: string | null = localStorage.getItem('client_menus')
    if(!storedMenus) return false

    const menuslist = JSON.parse(storedMenus)
    const findIndex: number = menuslist.findIndex((res: MenusList) => res.route === pathname)
    let activefind: string | null = menuslist?.[findIndex]?.id
    if(!activefind) activefind = ''
    setActive(activefind)
  }, [pathname])

  useEffect(() => {
    const storedMenus = localStorage.getItem('client_menus');
    if (storedMenus) {
      setMenus(JSON.parse(storedMenus));
    }
  }, []);

  useEffect(() => {
    isActivePageID()
  }, [pathname, isActivePageID])

  const LoopingMenus = (): ReactNode => {
    let dataFinal: any = {}
    menus.forEach((item) => {
      if(item.parent == ''){
        if(dataFinal[item.flag]){
          dataFinal[item.flag].push(item)
        }else{
          dataFinal[item.flag] = [item]
        }
      }
    })

    const splitActive = isActive ? isActive.split("_").slice(0, 2).join("_") : ''
    return (
      <div>
        {
          Object.entries(dataFinal).map((item: any, index: number) => {
            return (
              <div key={index}>
                <div className="p-2">
                  <h1 className="text-zinc-500 text-sm xl:text-[10px] 2xl:text-sm capitalize dark:text-white">{item[0]}</h1>
                </div>
                <div className="">
                  {
                    item[1].map((menu: MenusList, index2: number) => {

                      if(menu.show)
                      return (
                        <Link key={index2} href={menu.route}>
                          <button disabled={!menu.show} className={`full-hover text-sm xl:text-[11px] 2xl:text-sm flex items-center gap-2 px-3 py-2.5 xl:py-2 xl:px-4 2xl:px-5 2xl:py-3 relative hover:bg-primary/20 ${menu.id == splitActive && 'bg-primary/25 hover:bg-primary/25'}`}>
                            <Icon icon={menu.icon} style={{color: item.iconColor}} className={`text-sm xl:text-sm 2xl:text-xl ${!item?.iconColor && 'text-primary'}`}/>
                            {menu.name}
                          </button>
                        </Link>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    <div className="flex-1 h-ful flex flex-col dark:bg-darkPrimary">
      <div className="w-full xl:w-auto flex flex-1">
        <div className='w-full xl:max-w-40 xl:min-w-40 2xl:max-w-56 2xl:min-w-56 border-r dark:border-darkSecondary flex flex-col'>
          {/* <header className='px-2 py-5'>
            <h1>Menus</h1>
          </header> */}
          <div className='flex-1 space-y-2 overflow-y-auto'>
            {LoopingMenus()}
          </div>
        </div>
        <MainSubMenu active={isActive} menus={menus}/>
      </div>
      {/* <div className="border-t py-2 px-5">
        <Breadcrumb />
      </div> */}
    </div>
  )
}
