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
export type ChatType = {
    answered: string
    answered_date: string
    channel: string
    channel_id: string
    channelref: null | string
    id: string
    question: string
    question_date: string
    service_id: string
    subchannel: null | string
    token: number
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

export interface TopUpType {
    id: string
    org_id: string
    parent_id: string
    rec_name: string
    trans_date: Date
    trans_id: string
    currency: "IDR" | string
    amount: number
    voucher_code: string
    discount: null | string
    discount_type: null | string
    discount_value: null | string
    total_amount: number
    provider: null | string
    provider_trans_id: string
    payment_method: null | string
    payment_provider: null | string
    bank_id: null | string
    bank_acc: null | string
    bank_va_acc: null | string
    paid_date: null | Date
    expire_date: null | Date
    status: 'INITIALIZE' | 'PENDING' | 'SETTLE' | 'CANCEL'
    rec_by: string
    rec_date: string
    mod_by: null | string
    mod_date: null | Date
    origin_response: null | string
}