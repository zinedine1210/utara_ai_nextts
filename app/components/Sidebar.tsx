'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";
import MainSubMenu from "./MainSubMenu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { MenusList } from "@@/src/types/types";
import Breadcrumb from "./Breadcrumb";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
// import Breadcrumb from "./Breadcrumb";

export default function Sidebar() {
  const { state, setState } = useGlobalContext()
  const [menus, setMenus] = useState<MenusList[]>([]);
  const pathname = usePathname()
  const [isActive, setActive] = useState<string>('')
  const [childMenu, setChildMenu] = useState<MenusList[]>([])
  const router = useRouter()

  const handleRoute = async (id: string) => {
    setActive(id)
    setChildMenu([])
    const storedMenus: string | null = localStorage.getItem('client_menus')
    if(!storedMenus) return false

    const menuslist: MenusList[] = JSON.parse(storedMenus)
    const filtermenu: MenusList[] = menuslist.filter((res: MenusList) => res.parent == id)
    if(filtermenu.length > 0){
      setChildMenu(filtermenu)
    }else{
      const findmenu: MenusList | undefined = menuslist.find((res: MenusList) => res.id == id)
      router.push(findmenu?.route ?? '/usr')
    }
  }

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
        <div className="flex items-center justify-between md:hidden py-3 px-5">
          <h1 className="font-bold text-primary">Menus</h1>
          <button onClick={() => setState({ ...state, view: false })} className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
            <Icon icon={'ic:round-chevron-left'} className="text-xl"/>
          </button>
        </div>
        {
          Object.entries(dataFinal).map((item: any, index: number) => {
            return (
              <div key={index}>
                <div className="hidden md:block">
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

                <div className="md:hidden">
                  <div className="p-2">
                    <h1 className="text-zinc-500 text-sm xl:text-[10px] 2xl:text-sm capitalize dark:text-white">{item[0]}</h1>
                  </div>
                  <div className="">
                    {
                      item[1].map((menu: MenusList, index2: number) => {

                        if(menu.show)
                        return (
                          <div className="relative" key={index2}>
                            <button onClick={() => handleRoute(menu.id)} disabled={!menu.show} className={`full-hover text-sm xl:text-[11px] 2xl:text-sm flex items-center gap-2 px-3 py-2.5 xl:py-2 xl:px-4 2xl:px-5 2xl:py-3 relative hover:bg-primary/20 ${menu.id == splitActive && 'bg-primary/25 hover:bg-primary/25'}`}>
                              <Icon icon={menu.icon} style={{color: item.iconColor}} className={`text-sm xl:text-sm 2xl:text-xl ${!item?.iconColor && 'text-primary'}`}/>
                              {menu.name}
                            </button>
                            <div className={`${splitActive == menu.id ? "max-h-screen duration-500":"max-h-0 duration-200"} px-5 ease-in-out transition-all overflow-hidden border-l border-dotted border-primary ml-8`}>
                              {
                                childMenu && childMenu.map((item: MenusList, key1: number) => {
                                  if(item.show)
                                  return (
                                    <Link href={item.route} key={key1}>
                                      <button className={`${item.id == isActive ? 'text-primary font-bold':'hover:text-primary'} py-3 gap-2 text-start w-full text-sm flex items-center`}>
                                        <Icon icon={item.icon} style={{color: item.iconColor}} className={`text-sm xl:text-sm 2xl:text-xl ${!item?.iconColor && 'text-primary'}`}/>
                                        {item.name}
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
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    <>
      <div onClick={() => setState({ ...state, view: false })} className={`${state.view ? "visible opacity-30 translate-x-0":"invisible -translate-x-full opacity-0"} delay-[350ms] duration-300 ease-in-out md:hidden fixed top-0 left-0 w-full h-screen bg-black z-20`}></div>
      <div onClick={() => setState({ ...state, view: false })} className={`${state.view ? "visible opacity-30 translate-x-0":"invisible -translate-x-full opacity-0"} delay-[250ms] duration-300 ease-in-out md:hidden fixed top-0 left-0 w-full h-screen bg-black z-20`}></div>
      <div onClick={() => setState({ ...state, view: false })} className={`${state.view ? "visible opacity-30 translate-x-0":"invisible -translate-x-full opacity-0"} delay-200 duration-300 ease-in-out md:hidden fixed top-0 left-0 w-full h-screen bg-black z-20`}></div>
      <div className={`${!state.view ? '-translate-x-full md:translate-x-0':'translate-x-0 md:translate-x-0'} delay-100 duration-300 ease-in-out fixed top-0 left-0 w-3/4 md:w-full z-30 md:static md:z-0 bg-white h-screen flex-1 md:h-full flex flex-col dark:bg-dark`}>
        <div className="w-full xl:w-auto flex flex-1">
          <div className='w-full xl:max-w-44 xl:min-w-44 2xl:max-w-56 2xl:min-w-56 border-r dark:border-darkSecondary flex flex-col'>
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
    </>
  )
}
