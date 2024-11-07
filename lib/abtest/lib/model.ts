import { ABTestType } from "@@/src/types/datatabletypes";
import { formatDateData } from "@@/src/utils/script";

export class ABTestModel {
    [x: string]: any;
    public id: string
    public serviceId: string
    public question: string
    public answer: string | null
    public answerDate: string | null
    public correction: string | null
    public correctionDate: string | null
    public status: "NEW" | "IN_QUEUE" | "TESTED" | "CORRECTED" | "IGNORED" | "TRAINED"
    public recBy: string | null
    public recDate: string
    public modBy: string | null
    public modDate: string | null

    constructor(props: ABTestType) {
        this.id = props.id
        this.serviceId = props.service_id
        this.question = props.question
        this.answer = props.answer
        this.answerDate = props.answer_date ? formatDateData(props.answer_date.toString()) : null
        this.correction = props.correction
        this.correctionDate = props.correction_date ? formatDateData(props.correction_date.toString()) : null
        this.status = props.status
        this.recBy = props.rec_by
        this.recDate = formatDateData(props.rec_date.toString())
        this.modBy = props.mod_by
        this.modDate = props.mod_date ? formatDateData(props.mod_date.toString()) : null
    }

    static toDatatableResponse = (array: ABTestType[]) => {
        return array.map((item: ABTestType) => {
            return new ABTestModel(item)
        })
    }
}
