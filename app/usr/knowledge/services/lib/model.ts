import { ServicesType } from "@@/src/types/datatabletypes";
export class ServicesModel {
    private type: string;
    private loc: string[]
    private msg: string
    private typeInput: string
    private descriptionInput: string
    private serviceIdInput: string
    private channelIdInput: string
    private channelInput: string
    private promptInput: string
    private propertiesData: string
    private statusInput: string


    constructor(props: ServicesType){
        this.type = props.type
        this.loc = props.loc
        this.msg = props.msg
        this.typeInput = props.input.type
        this.descriptionInput = props.input.description
        this.serviceIdInput = props.input.serviceId
        this.channelIdInput = props.input.channel_id
        this.channelInput = props.input.channel
        this.promptInput = props.input.prompt
        this.propertiesData = props.input.properties.data
        this.statusInput = props.input.status
    }

    static toDatatableResponse = (array: ServicesType[]) => {
        return array.map((item: ServicesType) => {
            return new ServicesModel(item)
        })
    }
}