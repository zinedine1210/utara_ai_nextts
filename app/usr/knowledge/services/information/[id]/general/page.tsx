'use client'

import { useGlobalContext } from "@@/src/providers/GlobalContext"

export default function GeneralTab() {
    const { state, setState } = useGlobalContext()
    console.log(state)
    return (
        <div>General Tab</div>
    )
}
