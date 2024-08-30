import { formatDateData } from "@@/src/utils/script";
import { AttachmentType } from "./types";
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
        this.modby = props.modby
        this.moddate = props.moddate
        this.originalfilename = props.originalfilename
        this.originalfilesize = props.originalfilesize
        this.recby = props.recby
        this.recdate = props.recdate
        this.status = props.status
        this.createAt = formatDateData(props.recdate)
        this.typeFile = 'application/' + props.description.split(".")[1]
    }

    static toDatatableResponse = (array: AttachmentType[]) => {
        return array.map((item: AttachmentType) => {
            return new AttachmentDataModel(item)
        })
    }
}