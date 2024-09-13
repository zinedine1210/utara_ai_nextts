export interface AttachmentType {
    description: string
    id: string
    location: string
    mod_by: null | any
    mod_date: null | any
    original_file_name: string
    original_file_size: number
    rec_by: string
    rec_date: string
    status: string
}
export interface TrainingType {
    id: string
    description: string
    version: string
    collection_name: string | null
    files: AttachmentType[]
    trained_data_size: number
    trained_date: string | null
    tokens: string | null
    cost: string | null
    status: string
    rec_by: string
    rec_date: string
    mod_by: string | null
    mod_date: string | null
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
        whatsapp: string[],
        telegram: string[],
        email: string[]
    },
    status: string
}

export interface ServicesType {
    id: string
    type: string
    description: string
    service_id: string
    channel_id: string
    channel: string
    prompt: string
    properties: {
        data: string
    }
    status: string
    rec_by: string
    rec_date: string
    mod_by: null | string,
    mod_date: null | string
}