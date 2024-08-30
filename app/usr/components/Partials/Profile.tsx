'use client'
import { DropdownOptions } from "@@/src/types/types"
import Dropdown from "./Dropdown"
import { Notify } from "@@/src/utils/script"
import { tryLogout } from "@@/src/hooks/CollectionAPI"
import { ResponseData } from "@@/src/types/apitypes"
import { useRouter } from "next/navigation"

export default function Profile() {
    const router = useRouter()
    let actionoptions: DropdownOptions[] = [
        {
            name: 'Profile',
            icon: 'ph:user-duotone',
            action: (id, index) => {
                alert('profile')
            }
        },
        {
            name: 'Logout',
            icon: 'material-symbols:logout',
            action: (id, index) => {
                handleLogout()
            }
        }
    ]

    const handleLogout = async () => {
        const result: ResponseData = await tryLogout()
        if(result.success){
            Notify(result.message, 'info', 5000)
            router.push('/auth')
        }else Notify('Something went wrong', 'error')
    }

    const ButtonProfile = () => {
        return (
            <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white bg-primary/50">X</div>
        )
    }
  return (
    <div>
        <Dropdown
            options={actionoptions}
            button={<ButtonProfile />}
        />
    </div>
  )
}
