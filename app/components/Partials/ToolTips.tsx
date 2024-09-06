import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export default function ToolTips({ title, children }: {
    title: string,
    children: React.ReactNode
}) {
  return (
    <div className="group relative">
        <div className="transition-opacity z-20 duration-300 invisible group-hover:visible opacity-0 group-hover:opacity-100 group-hover:block absolute w-72 shadow-md p-5 bg-white dark:bg-darkPrimary rounded-md top-full right-0">
            <h1 className="text-sm font-bold">{title}</h1>
            {children}
        </div>
        <span className="flex items-center justify-center w-10 h-10 rounded-full text-xl font-bold bg-white dark:bg-black border hover:bg-zinc-100 ">
            <Icon icon={"bi:info"} className="w-6 h-6" />
        </span>
    </div>
  )
}
