import React from 'react'
import MainChat from '../components/MainChat'

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
                Chat Not Found
              </div>
            ):
            <MainChat roomId={params.roomId} />
          }
        </div>
    </section>
  )
}
