'use client'
import Select from '@@/app/components/Input/Select'
import { useState } from 'react'
import { FilterOptions, Options } from "@@/src/types/types"
import { getServices, getTraining } from '@@/src/hooks/CollectionAPI'
import { ResponseData } from '@@/src/types/apitypes'
import { ServicesModel } from '../../knowledge/services/lib/model'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { IconsCollection } from '@@/src/constant/icons'

export default function SimulationLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { serviceId: string }
}) {
  const [servicesOpt, setServicesOpt] = useState<Options[]>([])
  const router = useRouter()
  const pathname = usePathname()

  const handleChooseService = (value: string) => {
    router.push(`/usr/simulation/${value}`)
  }
  return (
    <section className="w-full h-full overflow-hidden">
        <div className='flex w-full h-full'>
          <div className='h-full overflow-y-auto w-96 flex flex-col border-r border-zinc-500'>
            <header className='bg-white border-b border-zinc-500 py-2 px-3'>
              <Select 
                id='services'
                name='services'
                onChange={(value) => handleChooseService(value)}
                defaultAll={false}
                placeholder='Please select your service first'
                onTrigger={async () => {
                  const filterOptions: FilterOptions[] = [
                    {
                      key: "page",
                      value: 1
                    },
                    {
                      key: "size",
                      value: 100
                    }
                  ]
                  const result: ResponseData = await getServices(filterOptions)
                  setServicesOpt(ServicesModel.toOptions(result.data))
                }}
                options={servicesOpt}
                value={params.serviceId}
              />
            </header>
            <div className='flex-1 h-full overflow-auto'>
              <Link href={`/usr/simulation/${params.serviceId}`}>
                <button type='button' className={`${pathname == `/usr/simulation/${params.serviceId}` && "bg-primary text-white"} py-3 px-5 text-xs hover:bg-primary/20 duration-300 ease-in-out w-full text-start flex items-center gap-2`}><Icon icon={IconsCollection.chat} className=' text-xl'/>Simulation Chat</button>
              </Link>
              <Link href={`/usr/simulation/${params.serviceId}/abtest`}>
                <button type='button' className={`${pathname == `/usr/simulation/${params.serviceId}/abtest` && "bg-primary text-white"} py-3 px-5 text-xs hover:bg-primary/20 duration-300 ease-in-out w-full text-start flex items-center gap-2`}><Icon icon={IconsCollection.abtest} className=' text-xl'/>AB Test</button>
              </Link>
              <Link href={`/usr/simulation/${params.serviceId}/unanswered`}>
                <button type='button' className={`${pathname == `/usr/simulation/${params.serviceId}/unanswered` && "bg-primary text-white"} py-3 px-5 text-xs hover:bg-primary/20 duration-300 ease-in-out w-full text-start flex items-center gap-2`}><Icon icon={IconsCollection.abtest} className=' text-xl'/>AB Test</button>
              </Link>
            </div>
          </div>
          {children}
        </div>
    </section>
  )
}
