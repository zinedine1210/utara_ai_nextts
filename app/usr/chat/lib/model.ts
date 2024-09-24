import { ChatType } from "@@/src/types/datatabletypes";
import { formatDateData } from "@@/src/utils/script";

export class ChatModel {
    private answered: string
    private answered_date: string
    private channel: string
    private channel_id: string
    private channelref: null | string
    private id: string
    private question: string
    private question_date: string
    private service_id: string
    private subchannel: null | string
    private token: number
    private answeredDate: string
    private questionDate: string

    constructor(props: ChatType){
        this.answered = props.answered
        this.answered_date = props.answered_date
        this.channel = props.channel
        this.channel_id = props.channel_id
        this.channelref = props.channelref
        this.id = props.id
        this.question = props.question
        this.question_date = props.question_date
        this.service_id = props.service_id
        this.subchannel = props.subchannel
        this.token = props.token
        this.answeredDate = formatDateData(props.answered_date)
        this.questionDate = formatDateData(props.question_date)
    }

    getQuestionDate = (): string => this.questionDate
    getQuestion = (): string => this.question
    getAnswered = (): string => this.answered
    getAnsweredDate = (): string => this.answeredDate
    getId = (): string => this.id

    static toDatatableResponse = (array: ChatType[]) => {
        return array.map((item: ChatType) => {
            return new ChatModel(item)
        })
    }
}