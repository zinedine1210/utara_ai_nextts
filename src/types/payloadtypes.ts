export interface PayloadAttachmentType {
    originalFileName?: string
    status?: string
    id?: string
}

export interface PayloadTrainingType {
    description: string
    version: string
    files: string[]
}