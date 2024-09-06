// app/admin/layout.tsx
import { ReactNode, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';

export default function UserLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <div className='flex flex-col w-full min-h-screen h-screen overflow-hidden relative'>
      <main className='flex-1 w-full lg:flex overflow-hidden h-full'>
        {/* <div className='bg-red-500 sm:bg-violet-500 md:bg-yellow-500 lg:bg-gray-500 xl:bg-green-500 2xl:bg-blue-500 w-14 h-full'></div> */}
        <Sidebar />
        <div className='w-full h-full bg-zinc-100 dark:bg-dark/60 relative flex flex-col'>
          <div id="modal-usr"></div>
          <Navbar />
          <div className='flex-1 overflow-y-auto text-sm xl:text-xs 2xl:text-base relative'>
            <div className='hidden fixed bottom-0 left-0 bg-primary text-white py-1 md:inline-block rounded-r-full pl-3 pr-5'>
              <Breadcrumb />
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
