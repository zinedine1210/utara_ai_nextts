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
    url: string
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
    status: "ACTIVE" | "INACTIVE" | "IN_QUEUE"
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
    properties: any
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

export interface ABTestType {
    id: string
    service_id: string
    question: string
    answer: string | null
    answer_date: string | null
    correction: string | null
    correction_date: string | null
    status: "NEW" | "IN_QUEUE" | "TESTED" | "CORRECTED" | "IGNORED" | "TRAINED",
    rec_by: string | null
    rec_date: Date
    mod_by: string | null
    mod_date: Date | null
}

export interface UnansweredType {
    id: string
    channel_id: string
    channel: string
    service_id: string
    question: string
    answer: null | string
    status: "NEW" | "ANSWERED" | "IGNORED" | "TRAINED",
    rec_date: string | Date
    mod_by: null | string
    mod_date: null | Date | string
}