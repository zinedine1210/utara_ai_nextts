import ABTestPage from "@@/lib/abtest/ABTestPage"
import { redirect } from "next/navigation"

const Page = (context: {
    params: {}
    searchParams: {
        service_id?: number
    }
}) => {
    const searchParams = context.searchParams
    if(!searchParams?.service_id) return redirect('/usr/knowledge/services')
  return <ABTestPage service_id={searchParams.service_id}/>
}

export default Page