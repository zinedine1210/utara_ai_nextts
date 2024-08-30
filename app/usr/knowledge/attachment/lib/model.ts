import { AttachmentType } from "./types";
export class AttachmentDataModel {
    private doctype: string
    private filename: string
    private filestat: {[key: string]: any}
    private folderId: string
    private folderPath: string
    private id: string
    private metadata: {[key: string]: string}
    private org_id: string
    private refKey: {[key: string]: any}
    private _cb: string
    private _cd: {[key: string]: any}
    private _dmsversion: string
    private _rk: string
    private original_name: string
    private type: string
    private size: number
    private url: string
    private url_substring: string


    constructor(props: AttachmentType){
        this.doctype = props.doctype
        this.filename = props.filename
        this.filestat = props.filestat
        this.folderId = props.folderId
        this.folderPath = props.folderPath
        this.id = props.id
        this.metadata = props.metadata
        this.org_id = props.org_id
        this.refKey = props.refKey
        this._cb = props._cb
        this._cd= props._cd
        this._dmsversion = props._dmsversion
        this._rk = props._rk
        this.original_name = props.filestat['original-name']
        this.type = props.filestat['mime-type']
        this.size = props.filestat['size']
        this.url = props.refKey.name.url
        this.url_substring = props.refKey.name.url.length > 50 ? props.refKey.name.url.substring(0, 50)+"..." : props.refKey.name.url
    }

    static toDatatableResponse = (array: AttachmentType[]) => {
        return array.map((item: AttachmentType) => {
            return new AttachmentDataModel(item)
        })
    }
}