import { AttachmentType } from "@@/src/types/datatabletypes";
import { formatDateData } from "@@/src/utils/script";
export class AttachmentDataModel {
    public description: string
    public id: string
    public location: string
    public modby: null | any
    public moddate: null | any
    public originalfilename: string
    public originalfilesize: number
    public recby: string
    public recdate: string
    public status: string
    public createAt: string
    public typeFile: string
    public originalfilenamesubstring: string

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
        this.originalfilenamesubstring = props.original_file_name.length > 30 ? props.original_file_name.substring(0, 30) + "..." : props.original_file_name
    }

    static toDatatableResponse = (array: AttachmentType[]) => {
        return array.map((item: AttachmentType) => {
            return new AttachmentDataModel(item)
        })
    }
}