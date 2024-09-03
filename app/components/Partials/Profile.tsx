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

    function getInitials() {
        let name = ''
        const storedMenus: string | null = localStorage.getItem('auth_info')
        if(!storedMenus) return false

        name = storedMenus.toString()
        // Memecah nama menjadi array kata-kata
        const nameParts = name.split(' ');
      
        // Mengambil huruf pertama dari setiap kata
        const initials = nameParts.map(part => part[0].toLowerCase()).join('');
      
        return initials
      }

    const handleLogout = async () => {
        const result: ResponseData = await tryLogout()
        if(result.success){
            Notify(result.message, 'info', 5000)
            router.push('/auth')
        }
    }

    const ButtonProfile = () => {
        return (
            <div className="w-9 h-9 2xl:w-10 2xl:h-10 rounded-full flex items-center justify-center border border-primary bg-primary/30 capitalize">
                {getInitials()}
            </div>
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
