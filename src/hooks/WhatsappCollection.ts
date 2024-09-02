import axios from "axios"
const baseWhatsappURL = process.env.BASE_WHATSAPP_URL ?? 'https://wa.gnscenter.com';
const baseDomain = process.env.BASE_DOMAIN ?? 'http://localhost:3000';


export const createSessionWhatsapp = async (nameId: string) => {
    const objPayload = { id: nameId, domain:baseDomain, isLegacy:false }
    const result = await axios.post(`${baseWhatsappURL}/sessions/add`, objPayload)
    return result.data
}

export const checkSessionWhatsapp = async (nameId: string) => {
    const result = await axios.get(`${baseWhatsappURL}/sessions/status/${nameId}`)
    return result.data
}