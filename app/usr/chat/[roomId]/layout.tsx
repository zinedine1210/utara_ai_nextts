import React from 'react'
import MainChat from '../components/MainChat'
import { Icon } from '@iconify/react/dist/iconify.js'
import { IconsCollection } from '@@/src/constant/icons'

export default function ChatLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { roomId: string }
}) {
  return (
    <section className="w-full h-full overflow-hidden">
        <div className='flex w-full h-full'>
          {children}
          {
            params.roomId == 'all' ? (
              <div className='flex items-center justify-center w-full h-full'>
                <div className='mx-auto text-center'>
                  <Icon icon={IconsCollection.chat} className='text-[500px] text-zinc-400/30'/>
                </div>
              </div>
            ):
            <MainChat roomId={params.roomId} />
          }
        </div>
    </section>
  )
}
