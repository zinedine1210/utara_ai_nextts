// app/api/data/route.ts
import client from '@@/src/client/apiClient';
import { ResponseData } from '@@/src/types/apitypes';
import { PayloadTrainingType } from '@@/src/types/payloadtypes';
import { FilterOptions } from '@@/src/types/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const payload = await request.json() ?? []
  let objPayload: PayloadTrainingType | any = {}
  payload.map((fil: FilterOptions, index: number) => {
    objPayload[fil.key] = fil.value
  })
  let timeoutId;
  const timoutInterval = 60000;
  let abortSignal = AbortSignal.timeout(timoutInterval)
  const token = request.cookies.get('auth_token')
  const requestPromise = await client('/v2/client/data', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token?.value}`
    },
    body: objPayload
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
}
