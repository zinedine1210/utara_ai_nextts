'use client'
import Select from '@@/app/components/Input/Select'
import { useState } from 'react'
import { FilterOptions, Options } from "@@/src/types/types"
import { getServices } from '@@/src/hooks/CollectionAPI'
import { ResponseData } from '@@/src/types/apitypes'
import { ServicesModel } from '../../knowledge/services/lib/model'
import { useRouter } from 'next/navigation'
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

  const handleChooseService = (value: string) => {
    router.push(`/usr/simulation/${value}`)
  }
  return (
    <section className="w-full h-full overflow-hidden">
        <div className='flex w-full h-full'>
          <div className='h-full overflow-y-auto w-96 border border-red-500 flex flex-col'>
            <header className='bg-white border-b border-zinc-500 py-2 px-3'>
              <Select 
                id='services'
                name='services'
                onChange={(value) => handleChooseService(value)}
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
              <Link href={``}>
                <button type='button' className='py-3 px-5 text-xs hover:bg-primary/20 duration-300 ease-in-out w-full text-start flex items-center gap-2'><Icon icon={IconsCollection.chat} className='text-primary text-xl'/>Chat</button>
              </Link>
              <Link href={`abtest`}>
                <button type='button' className='py-3 px-5 text-xs hover:bg-primary/20 duration-300 ease-in-out w-full text-start flex items-center gap-2'><Icon icon={IconsCollection.abtest} className='text-primary text-xl'/>AB Test</button>
              </Link>
              <Link href={`unanswered`}>
                <button type='button' className='py-3 px-5 text-xs hover:bg-primary/20 duration-300 ease-in-out w-full text-start flex items-center gap-2'><Icon icon={IconsCollection.unanswered} className='text-primary text-xl'/>Unanswered Question</button>
              </Link>
            </div>
          </div>
          {children}
        </div>
    </section>
  )
}
