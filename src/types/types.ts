import React from "react"

export interface MenusList {
    description: string
    feature: string
    flag: string
    icon: string
    iconColor?: string
    id: string
    name: string
    parent: string
    route: string
    show: boolean
    sortnumber: number
}


export interface FilterKey {
    value: string
    label: string
    type: 'input_text' | 'select'
    options?: Options[]
}

export interface StateType<T> {
    isLoading: boolean,
    headers: TableHeader[],
    select?: number[],
    filter: FilterOptions[],
    filterKey?: FilterKey[]
    page: number,
    display: number,
    range: {[key: string]: any},
    columns: {[key: string]: any},
    data: T[] | null,
    allData: T[],
    totalCount: number,
    payload: null,
    groupBy?: string
    onGet: (filter: FilterOptions[]) => void,
    bulk?: DropdownOptions[]
    bulkButton?: DropdownOptions[]
    componentMobile: (item: any, index: number) => React.ReactNode
}

export interface TableHeader {
    label: string
    property: string
    sort?: string
    cssRow?: string
    copy?: string
    cssHead?: string
    status?: any | {[key: string]: string}
}

export interface DialList {
    code: string
    dial_code: string
    name: string
}


export interface DropdownOptions {
    name: string
    icon: string
    customCss?: string
    action: (id: number | string, index: number) => void
}

export interface Options {
    label: string,
    value: any
}

export interface FilterOptions {
    key: string,
    value: any
}