import { ServicesType } from "@@/src/types/datatabletypes";
import { formatDateData } from "@@/src/utils/script";
export class ServicesModel {
    public id: string
    public type: string
    public description: string
    public service_id: string
    public channel_id: string
    public channel: string
    public prompt: string
    public data: string
    public status: string
    public rec_by: string
    public rec_date: string
    public mod_by: null | string
    public mod_date: null | string
    public createdAt: string
    public properties: any

    constructor(props: ServicesType){
        this.description = props.description
        this.id = props.id
        this.type = props.type
        this.service_id = props.service_id
        this.channel_id = props.channel_id
        this.channel = props.channel
        this.prompt = props.prompt
        this.data = props.properties.data
        this.rec_by = props.rec_by
        this.rec_date = props.rec_date
        this.mod_by = props.mod_by
        this.mod_date = props.mod_date
        this.status = props.status
        this.createdAt = formatDateData(props.rec_date)
        this.properties = props.properties
    }

    static toDatatableResponse = (array: ServicesType[]) => {
        return array.map((item: ServicesType) => {
            return new ServicesModel(item)
        })
    }

    static toOptions = (array: ServicesType[]) => {
        return array.map((item: ServicesType) => {
            return {
                label: `${item.description}`,
                value: item.id
            }
        })
    }
    static toOptionsTrainingData = (array: ServicesType[]) => {
        return array.map((item: ServicesType) => {
            return {
                label: `${item.description}`,
                value: item.properties.data
            }
        })
    }
}