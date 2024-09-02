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