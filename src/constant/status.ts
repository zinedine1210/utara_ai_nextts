import { Options } from "../types/types"

export const trainingTypeStatus = {
    '1': 'Upload',
    '2': 'Website',
    '3': 'Scratch'
}

export const trainingColorStatus = {
    'Upload': '#fcba03',
    'Website': '#ff1900',
    'Scratch': '#ff00bf'
}

export const trainingStatus = {
    'IN_QUEUE': '#fcba03',
    'ACTIVE': '#ff1900',
    'INACTIVE': '#ff00bf'
}

export const statusOptions: Options[] = [
    {
        value: 'ACTIVE',
        label: 'Active'
    },
    {
        value: 'INACTIVE',
        label: 'Inactive'
    }
]

export const trainingStatusOptions: Options[] = [
    {
        value: 'IN_QUEUE',
        label: 'Queue'
    },
    {
        value: 'ACTIVE',
        label: 'Active'
    },
    {
        value: 'INACTIVE',
        label: 'Inactive'
    }
]