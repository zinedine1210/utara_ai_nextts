import { setCookies } from "@@/app/actions";
import axios from "axios"
import { Notify } from "../utils/script";
import { FilterOptions, UrlEnum } from "../types/types";
import { PayloadAttachmentType } from "../types/payloadtypes";
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
    console.log(responseData)
    if(responseData.success){
        if(responseData.data.access_token){
            setCookies('auth_token', responseData.data.access_token, responseData.data.expired_at)
            localStorage.setItem("auth_info", payload.username)
        }
        const clientMenus = await axios.get(`${baseDomain}/client_menus.json`)
        localStorage.setItem('client_menus', JSON.stringify(clientMenus.data))
    }else{
        if(responseData.status == 404 && responseData.message == 'Request failed with status code 503'){
            Notify('Website in maintenance, please try again later', 'info', 5000)
        }
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

export const postTraining = async (payload: FilterOptions[]) => {
    const result = await axios.post(`${baseURL}/data/knowledge/training/create`, payload)
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

export const postServices = async (payload: FilterOptions[]) => {
    const result = await axios.post(`${baseURL}/data/knowledge/services/create`, payload)
    const responseData = result.data
    if(!responseData.success) {
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
        responseData.data = responseData.data ?? []
    }
    return responseData
}

export const getServices = async (filter: FilterOptions[]) => {
    const result = await axios.post(`${baseURL}/data/knowledge/services`, filter ?? [])
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

export const getHistoryTopUp = async (filter: FilterOptions[]) => {
    function restructureDateRange(filter: FilterOptions[]){
        const startFind: undefined | FilterOptions = filter.find(res => res.key == "start_date")
        const endFind: undefined | FilterOptions = filter.find(res => res.key == "end_date")
        const finalPayload: FilterOptions[] = filter.filter(res => {
            if(res.key == "start_date" || res.key == "end_date") return false
            return true
        })
        if(!startFind || !endFind){
            return finalPayload
        }else{
            finalPayload.push({
                key: "trans_date",
                value: {
                    start_date: startFind.value,
                    end_date: endFind.value
                }
            })
            return finalPayload
        }
    }
    const daterangefilter = restructureDateRange(filter)
    console.log(daterangefilter)
    const result = await axios.post(`${baseURL}/data/topup`, daterangefilter ?? [])
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
    console.log("dapett user data", responseData)
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

// CHAT
export const getChat = async (filter: FilterOptions[]) => {
    const result = await axios.post(`${baseURL}/data/chat`, filter ?? [])
    const responseData = result.data
    if(!responseData.success) {
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
        responseData.data = responseData.data ?? []
    }
    return responseData
}
export const postChat = async (payload: FilterOptions[]) => {
    const result = await axios.post(`${baseURL}/data/chat/create`, payload ?? [])
    const responseData = result.data
    if(!responseData.success) {
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
        responseData.data = responseData.data ?? []
    }
    return responseData
}

// TOPUP
export const initializeTopUp = async (payload: FilterOptions[]) => {
    const result = await axios.post(`${baseURL}/data/topup/initialize`, payload ?? [])
    const responseData = result.data
    if(!responseData.success) {
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
        responseData.data = responseData.data ?? []
    }
    return responseData
}


// ABTEST
export const getABTest = async (filter: FilterOptions[]) => {
    const result = await axios.post(`${baseURL}/data/abtest`, filter ?? [])
    const responseData = result.data
    if(!responseData.success) {
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
        responseData.data = responseData.data ?? []
    }
    return responseData
}



// ENUM
export const getEnume = async (url: UrlEnum) => {
    const payload: FilterOptions[] = [
        {
            key: "URL",
            value: url
        }
    ]
    const result = await axios.post(`${baseURL}/data/enume`, payload ?? [])
    const responseData = result.data
    if(!responseData.success) {
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
        responseData.data = responseData.data ?? []
    }
    return responseData
}