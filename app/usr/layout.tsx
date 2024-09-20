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
    <div className='w-full h-screen relative'>
      <main className='flex h-full overflow-hidden'>
        <Sidebar />
        <div className='w-full h-full bg-zinc-100 dark:bg-dark/60 relative flex flex-col'>
          {/* <div id="modal-usr"></div> */}
          <Navbar />
          <div className='flex-1 overflow-y-auto text-sm xl:text-xs 2xl:text-base relative'>
            <div className='z-10 absolute top-1 left-0 bg-primary text-white inline-block rounded-r-full pl-3 pr-5'>
              <Breadcrumb />
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
