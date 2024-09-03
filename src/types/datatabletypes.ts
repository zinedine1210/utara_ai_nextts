export interface AttachmentType {
    description: string
    id: string
    location: string
    modby: null | any
    moddate: null | any
    originalfilename: string
    originalfilesize: number
    recby: string
    recdate: string
    status: string
}

export interface TrainingType {
    code: string
    description: string
    id: string
    name: string
    org_id: string
    prompt: string
    status_training: number
    status_training_name: string
    type_training: number
    type_training_name: string
    user_id: string
    _files: string[]
}

export type WhatsappList = {
    name: string,
    number: number
}
export type TelegramList = {
    name: string,
    number: number
}
export type EmailList = {
    name: string,
    number: number
}
export interface ProfileType {
    name: string;
    legal_name: string
    address: string
    phone: string
    email: string
    npwp: string
    channel: {
        whatsapp: string[] | null,
        telegram: string[] | null,
        email: string[] | null
    },
    status: string
}

export interface ServicesType {
    type: string
    loc: string[]
    msg: string
    input: {
        type: string
        description: string
        serviceId: string
        channel_id: string
        channel: string
        prompt: string
        properties: {
            data: string
        }
        status: string
    }
}