import { setCookies } from "@@/app/actions";
import axios from "axios"
import { Notify } from "../utils/script";
import { FilterOptions } from "../types/types";
let protocol = '';
let host = '';
let port = '';
let finalHostname = '';
let finalBaseDomainAPI = ''

if (typeof window === 'object') {
    // Jika dijalankan di lingkungan browser
    protocol = window.location.protocol;
    port = window.location.port
    host = window.location.hostname;
    finalHostname = `${protocol}//${host}:${port}`
    finalBaseDomainAPI = `${finalHostname}/api`
} else {
    port = process.env.PORT ?? ''
    protocol = process.env.PROTOCOL ?? ''
    host = process.env.HOST ?? ''
    finalHostname = `${protocol}://${host}:${port}`
    finalBaseDomainAPI = `${finalHostname}/api`
}

export const baseDomain: string = finalHostname
const baseURL: string = (process.env.BASE_DOMAIN ?? baseDomain) + '/api';

export const tryLogin = async (payload: any) => {
    const result = await axios.post(`${baseURL}/auth/login`, payload)
    const responseData = result.data
    if(responseData.success){
        if(responseData.data.access_token){
            setCookies('auth_token', responseData.data.access_token)
            localStorage.setItem("auth_info", payload.username)
        }
        const clientMenus = await axios.get(`${baseDomain}/client_menus.json`)
        localStorage.setItem('client_menus', JSON.stringify(clientMenus.data))
    }
    return responseData
}

export const tryLogout = async () => {
    const result = await axios.post(`${baseURL}/auth/logout`, {})
    const responseData = result.data
    if(!responseData.success) {
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
        responseData.data = responseData.data ?? []
    }
    return responseData
}

export const getOrg = async () => {
    const result = await axios.get(`${baseURL}/root/org`)
    const responseData = result.data
    if(!responseData.success) {
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
        responseData.data = responseData.data ?? []
    }
    return responseData
}

export const getTraining = async (filter: FilterOptions[]) => {
    const result = await axios.post(`${baseURL}/data/knowledge/training`, filter ?? [])
    const responseData = result.data
    if(!responseData.success) {
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
        responseData.data = responseData.data ?? []
    }
    return responseData
}

export const getServices = async () => {
    const result = await axios.get(`${baseURL}/data/knowledge/services`)
    const responseData = result.data
    if(!responseData.success) {
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
        responseData.data = responseData.data ?? []
    }
    return responseData
}

export const getAttachment = async (filter: FilterOptions[]) => {
    const result = await axios.post(`${baseURL}/data/knowledge/attachment`, filter ?? [])
    const responseData = result.data
    if(!responseData.success) {
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
        responseData.data = responseData.data ?? []
    }
    return responseData
}

export const getProfile = async () => {
    const result = await axios.get(`${baseURL}/auth/profile`)
    const responseData = result.data
    if(!responseData.success) {
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
        responseData.data = responseData.data ?? []
    }
    return responseData
}
export const getDetailTraining = async (id: string) => {
    const result = await axios.get(`${baseURL}/data/knowledge/training/${id}`)
    const responseData = result.data
    if(!responseData.success) {
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
        responseData.data = responseData.data ?? []
    }
    return responseData
}
export const postChannel = async (payload: string[], target: string) => {
    let objPayload = {
        channel: {
            [target]: payload
        }
    }
    const result = await axios.put(`${baseURL}/data/channel`, objPayload)
    const responseData = result.data
    if(!responseData.success){
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
    }
    return responseData
}

export const postFile = async (formData: FormData) => {
    const result = await axios.post(`${baseURL}/files`, formData)
    const responseData = result.data
    if(!responseData.success){
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
    }
    responseData.data.map((item: any, index: number) => {
        const splittype = item.original_file_name.split(".")
        const filetype = splittype[splittype.length]
        item['rec_date'] = item['rec_date'] ?? new Date().toISOString()
        item['description'] = item['description'] ?? item['id'] + filetype
        item['location'] = item['location'] ?? "data/files/tmp/" + item['id'] + filetype
        item['status'] = item['status'] ?? 'ACTIVE'
        item['rec_by'] = item['rec_by'] ?? '128ASJKAJ112NANSKJA1212'
        item['original_file_size'] = item['original_file_size'] ?? 10
        
    })
    return responseData
}

export const getDialOptions = async () => {
    const result = await axios.get(`${baseDomain}/dial_international.json`)
    const responseData = result.data
    if(!responseData.success) {
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
        responseData.data = responseData.data ?? []
    }
    return responseData
}