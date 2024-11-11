import client from "@@/src/client/apiClient";
import { ResponseData } from "@@/src/types/apitypes";
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const formData: FormData = await request.formData()
    let timeoutId;
    const timoutInterval = 60000;
    let abortSignal = AbortSignal.timeout(timoutInterval)
    const token = request.cookies.get('auth_token')
    const requestPromise = await client('/client/file', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer '+ token?.value,
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    }, abortSignal)
    const timeoutPromise = new Promise((resolve, reject) => {
        timeoutId = setTimeout(() => {
        reject({ "status": -1, "data": "Timeout" });
        }, timoutInterval);
    });
    const responseData: ResponseData | any = await Promise.race([requestPromise, timeoutPromise]);
    console.log(responseData)
    clearTimeout(timeoutId);
    if (responseData.status === -1 && responseData.data === "Timeout") {
        throw new Error("Timeout");
    }else{
        if(responseData?.status == 0){
        return NextResponse.json({
            success: true,
            data: responseData.data,
            status: responseData.status,
            message: responseData.message,
        }, { status: 200 });
        }else{
        return NextResponse.json({
            success: false,
            message: responseData.message,
            status: responseData.status,
            data: responseData.data ?? null
        })
        }
    }
}