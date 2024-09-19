import { TableHeader } from "@@/src/types/types"
import { channelType, trainingColorStatus, trainingStatus } from "./status"

export const tableDial: TableHeader[] = [
    { label: "CODE", property: "code", sort: "code", copy:"code", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "DIAL", property: "dial_code", sort: "dial_code", copy:"dial_code", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "NAME", property: "name", sort: "name", copy:"name", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
]


export const tableTraining: TableHeader[] = [
    { label: "Description", property: "description", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Version", property: "version", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Training Size", property: "trained_data_size", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Status Train", property: "status", status: trainingStatus, cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Date", property: "createdAt", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" }
]

export const tableAttachment: TableHeader[] = [
    { label: "File Name", copy: "originalfilename", property: "originalfilenamesubstring", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Description", property: "description", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Type", property: "typeFile", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Size", property: "originalfilesize", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Date", property: "createAt", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
]

export const tableServices: TableHeader[] = [
    { label: "Type", property: "type", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Description", property: "description", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Channel ID", property: "channel_id", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Channel", property: "channel", status: channelType, cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Status", property: "status", status: trainingStatus, cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Date", property: "createdAt", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" }
]



export const displayListNumber = [
    { value :10, label:10 },
    { value :20, label:20 },
    { value :30, label:30 },
    { value :40, label:40 },
    { value :50, label:50 },
    { value :60, label:60 },
    { value :70, label:70 }
  ]