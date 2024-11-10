import { UnansweredType } from "@@/src/types/datatabletypes";
import { formatDateData } from "@@/src/utils/script";

export class UnansweredModel {
    public id: string
    public channel_id: string
    public channel: string
    public service_id: string
    public question: string
    public answer: null | string
    public status: "NEW" | "ANSWERED" | "IGNORED" | "TRAINED"
    public rec_date: string | Date
    public mod_by: null | string
    public mod_date: null | Date | string


    constructor(props: UnansweredType) {
        this.id = props.id
        this.channel = props.channel
        this.channel_id = props.channel_id
        this.service_id = props.service_id
        this.question = props.question
        this.answer = props.answer
        this.status = props.status
        this.rec_date = props.rec_date ? formatDateData(props.rec_date.toString()) : ""
        this.mod_by = props.mod_by
        this.mod_date = props.mod_date ? formatDateData(props.mod_date.toString()) : ""
    }

    static toDatatableResponse = (array: UnansweredType[]) => {
        return array.map((item: UnansweredType) => {
            return new UnansweredModel(item)
        })
    }
}
