'use client'
import { getDetailTraining } from "@@/src/hooks/CollectionAPI"
import { useCallback, useEffect, useState } from "react"
import { TrainingDataModel } from "../../lib/model"
export default function TrainingInformationPage({ params }:{
    params: {
        id: string
    }
}) {
    const [data, setData] = useState<TrainingDataModel | null>(null)

    const initialMount = useCallback(async () => {
        const result = await getDetailTraining(params.id)
        const model = new TrainingDataModel(result.data)
        setData(model)
    }, [params])

    
    useEffect(() => {
        if(!data){
            initialMount()
        }
    }, [data, initialMount])
    return (
        <div>TrainingInformationPage</div>
    )
}
