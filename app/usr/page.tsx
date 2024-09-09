// app/admin/page.tsx
'use client'
import { Icon } from "@iconify/react/dist/iconify.js";

export default function AdminPage() {
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        <div
          className="bg-no-repeat relative bg-cover bg-center p-4 rounded-md shadow-md h-full"
          style={{
            backgroundImage: `url(/images/widget-bg-1.png)`,
          }}
        >
          <div className="max-w-[169px]">
            <div className="text-xl font-medium text-slate-900 mb-2">
              Upgrade your KonekGpt
            </div>
            <p className="text-sm text-slate-800">Pro plan for better results</p>
          </div>
          <div className="absolute top-1/2 right-5 -translate-y-1/2 ltr:right-6 rtl:left-6 mt-2 h-12 w-12 bg-white text-slate-900 rounded-full text-xs font-medium flex flex-col items-center justify-center">
            Now
          </div>
        </div>
        <div className="flex items-center justify-between bg-white py-5 xl:py-0 dark:bg-darkPrimary px-5 rounded-md shadow-md h-full">
          <div>
            <h1 className="text-zinc-500 dark:text-zinc-300 font-bold text-xl mb-2">New Clients</h1>
            <p className="font-bold text-black dark:text-white text-4xl">+3.500 <span className="text-lime-500 font-bold text-xl">+2%</span></p>
          </div>
          <div className="bg-gradient-to-tr from-purple-700 to-red-600 flex items-center justify-center w-14 h-14 rounded-xl">
            <Icon icon={'hugeicons:globe'} className="text-white text-3xl"/>
          </div>
        </div>
        <div className="flex items-center justify-between bg-white py-5 xl:py-0 dark:bg-darkPrimary p-5 rounded-md shadow-md h-full">
          <div>
            <h1 className="text-zinc-500 dark:text-zinc-300 font-bold text-xl mb-2">{"Today's Users"}</h1>
            <p className="font-bold text-black dark:text-white text-4xl">+300 <span className="text-lime-500 font-bold text-xl">+20%</span></p>
          </div>
          <div className="bg-gradient-to-tr from-purple-700 to-red-600 flex items-center justify-center w-14 h-14 rounded-xl">
            <Icon icon={'solar:user-broken'} className="text-white text-3xl"/>
          </div>
        </div>
        <div className="flex items-center justify-between bg-white py-5 xl:py-0 dark:bg-darkPrimary p-5 rounded-md shadow-md h-full">
          <div>
            <h1 className="text-zinc-500 dark:text-zinc-300 font-bold text-xl mb-2">Inbox</h1>
            <p className="font-bold text-black dark:text-white text-4xl">30 <span className="text-red-500 font-bold text-xl">-2%</span></p>
          </div>
          <div className="bg-gradient-to-tr from-purple-700 to-red-600 flex items-center justify-center w-14 h-14 rounded-xl">
            <Icon icon={'iconamoon:notification-bold'} className="text-white text-3xl"/>
          </div>
        </div>
      </div>
    </div>
  );
}
  