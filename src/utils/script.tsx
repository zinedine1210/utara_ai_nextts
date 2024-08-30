import moment from "moment";
import { ReadonlyURLSearchParams } from "next/navigation"
import { Bounce, toast } from "react-toastify";

export const checkRedirected = (searchParams: ReadonlyURLSearchParams) => {
    if (searchParams.get('redirected') === 'true') {
        return true
    }
    return false
}


export const Notify = (text: string, type: string, autoClose=1000, theme="light") => {
    let obj: {[key: string]: any} = {
        position: "top-right",
        autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme,
        transition: Bounce,
    }
    switch (type) {
        case "info":
            toast.info(text, obj);
            break;
        case "success":
            toast.success(text, obj);
            break;
        case "error":
            toast.error(text, obj);
            break;
        case "warning":
            toast.warning(text, obj);
            break;
        default:
            toast(text, obj)
            break;
    }
}


export const formatDateData = (tanggalISO: string) => {

    // Membuat objek Date dari tanggal ISO
    const tanggalObjek = new Date(tanggalISO);

    // Membuat fungsi untuk menambahkan nol pada angka kurang dari 10
    const tambahkanNol = (nilai: number) => (nilai < 10 ? `0${nilai}` : nilai);

    // Mendapatkan nilai-nilai tanggal
    const tanggal = tambahkanNol(tanggalObjek.getDate());
    const bulan = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(tanggalObjek);
    const tahun = tanggalObjek.getFullYear();
    const jam = tambahkanNol(tanggalObjek.getHours());
    const menit = tambahkanNol(tanggalObjek.getMinutes());
    const detik = tambahkanNol(tanggalObjek.getSeconds());
    // const ampm = tanggalObjek.getHours() >= 12 ? 'PM' : 'AM';

    // Menggabungkan nilai-nilai tanggal menjadi string yang diformat
    const tanggalDiformat = `${tanggal} ${bulan} ${tahun} ${jam}:${menit}:${detik}`;

    return tanggalDiformat
}

export const formatCurrency = (angka: number, format:boolean =true): string => {
    if(isNaN(angka)){
        return "Bukan nomer"
    }

    if(format){
        return angka.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR'
        });
    }else{
        return angka.toLocaleString("id-ID")
    }
}

export const formatCurrencyWithFraction = (value: number) => {
    return value.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export const isAllZero = (obj: any) => {
    for (const key in obj) {
        if (obj[key] !== 0) {
            return false;
        }
    }
    return true;
}

export const capitalizeFirstLetter = (param: string): string => {
    // Handle blank space
    if (!param) {
        return param
    }
    // Normal condition
    const firstChar = param.charAt(0).toUpperCase()
    const remainingChars = param.slice(1)
    return `${firstChar}${remainingChars}`
}

export const getDDMMMMYYYY = (param: string): string => {
    if (!param) {
        return param
    }

    try {
        const formattedDate = moment(param).format("DD MMMM YYYY")
        return formattedDate
    } catch (error) {
        console.error(`Error formatting date: ${error}`)
        return param
    }
}

export const getYYYYMMDD = (param: string): string => {
    if (!param) {
        return param
    }

    try {
        const formattedDate = moment(new Date(param)).format("YYYY-MM-DD")        
        return formattedDate
    } catch (error) {
        console.error(`Error formatting date: ${error}`)
        return param
    }
}

export const copyToClipBoard = async (field: string, text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        Notify(field + " copy to clipboard", 'success', 2000)
    } catch (err) {
        Notify("Failed to copy text to clipboard:", 'error', 2000)
    }
}
