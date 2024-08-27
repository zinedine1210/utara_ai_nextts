// app/api/login/route.ts
import client from '@@/src/client/apiClient';
import { ResponseData } from '@@/src/types/apitypes';
import { NextResponse } from 'next/server';
export const dynamic = 'force-static'

export async function POST(request: Request) {
  const payload = await request.json()
  try {
    let timeoutId;
    const timoutInterval = 60000;
    let abortSignal = AbortSignal.timeout(timoutInterval)


    const requestPromise = await client('/auth/login', {
      method: 'POST',
      headers: {},
      body: payload
    }, abortSignal)

    const timeoutPromise = new Promise((resolve, reject) => {
      timeoutId = setTimeout(() => {
        reject({ "status": -1, "data": "Timeout" });
      }, timoutInterval);
    });
    const responseData: ResponseData | any = await Promise.race([requestPromise, timeoutPromise]);
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

  } catch (error) {
    console.log(error)
    return error
  }
}