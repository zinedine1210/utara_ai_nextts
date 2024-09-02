import { EmailList, ProfileType, TelegramList, WhatsappList } from "@@/src/types/datatabletypes";
export class ProfileModel {
    private name: string;
    private legal_name: string
    private address: string
    private phone: string
    private email: string
    private npwp: string
    private whatsapp: any[] | null
    private telegram: any[] | null
    private channelEmail: any[] | null
    private status: string

    constructor(props: ProfileType){
        this.name = props.name
        this.legal_name = props.legal_name
        this.address = props.address
        this.phone = props.phone
        this.email = props.email
        this.npwp = props.npwp
        this.whatsapp = props.channel.whatsapp
        this.telegram = props.channel.telegram
        this.channelEmail = props.channel.email
        this.status = props.status
    }

    static toDatatableResponse = (array: ProfileType[]) => {
        return array.map((item: ProfileType) => {
            return new ProfileModel(item)
        })
    }
}