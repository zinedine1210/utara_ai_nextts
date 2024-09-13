import { EmailList, ProfileType, TelegramList, WhatsappList } from "@@/src/types/datatabletypes";
export class ProfileModel {
    public name: string;
    public legal_name: string
    public address: string
    public phone: string
    public email: string
    public npwp: string
    public whatsapp: any[]
    public telegram: any[]
    public channelEmail: any[]
    public status: string

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