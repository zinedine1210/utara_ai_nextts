import { AttachmentType, TrainingType } from "@@/src/types/datatabletypes";
import { formatDateData } from "@@/src/utils/script";


export class TrainingModel {
    public id: string
    public description: string
    public version: string
    public collection_name: string | null
    public files: AttachmentType[]
    public trained_data_size: number
    public trained_date: string | null
    public tokens: string | null
    public cost: string | null
    public status: string
    public rec_by: string
    public rec_date: string
    public mod_by: string | null
    public mod_date: string | null
    public createdAt: string

    constructor(props: TrainingType){
        this.description = props.description
        this.id = props.id
        this.version = props.version
        this.collection_name = props.collection_name
        this.files = props.files
        this.trained_data_size = props.trained_data_size
        this.trained_date = props.trained_date
        this.tokens = props.tokens
        this.cost = props.cost
        this.status = props.status
        this.rec_by = props.rec_by
        this.rec_date = props.rec_date
        this.mod_by = props.mod_by
        this.mod_date = props.mod_date
        this.createdAt = formatDateData(props.rec_date)
    }

    static toDatatableResponse = (array: TrainingType[]) => {
        return array.map((item: TrainingType) => {
            return new TrainingModel(item)
        })
    }

    static toOptions = (array: TrainingType[]) => {
        return array.map((item: TrainingType) => {
            return {
                label: item.description,
                value: item.id
            }
        })
    }
}