import { AttachmentType } from "@@/src/types/datatabletypes";
import { formatDateData } from "@@/src/utils/script";
export class AttachmentDataModel {
    private description: string
    private id: string
    private location: string
    private modby: null | any
    private moddate: null | any
    private originalfilename: string
    private originalfilesize: number
    private recby: string
    private recdate: string
    private status: string
    private createAt: string
    private typeFile: string

    constructor(props: AttachmentType){
        this.description = props.description
        this.id = props.id
        this.location = props.location
        this.modby = props.mod_by
        this.moddate = props.mod_date
        this.originalfilename = props.original_file_name
        this.originalfilesize = props.original_file_size
        this.recby = props.rec_by
        this.recdate = props.rec_date
        this.status = props.status
        this.createAt = formatDateData(props.rec_date)
        this.typeFile = 'application/' + props.description.split(".")[1]
    }

    static toDatatableResponse = (array: AttachmentType[]) => {
        return array.map((item: AttachmentType) => {
            return new AttachmentDataModel(item)
        })
    }
}