'use client'
import { getDetailTraining } from "@@/src/hooks/CollectionAPI"
import React, { useCallback, useEffect, useState } from "react"
import { TrainingDataModel } from "../../lib/model"
import { useGlobalContext } from "@@/src/providers/GlobalContext"

export default function ServiceLayout({
    params,
    children
}: {
    children: React.ReactNode,
    params: {
        id: string
    }
}) {
    // const [data, setData] = useState<TrainingDataModel | null>(null)
    const { state, setState } = useGlobalContext()

    const initialMount = useCallback(async () => {
        const result = await getDetailTraining(params.id)
        const model = new TrainingDataModel(result.data)
        setState({ ...state, 'trainingdatageneral': model })
    }, [params, setState, state])

    
    useEffect(() => {
        if(!state?.trainingdatageneral){
            initialMount()
        }
    }, [state, initialMount])

    return (
        <div>
            {children}
        </div>
    )
}
