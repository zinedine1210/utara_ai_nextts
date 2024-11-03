import ABTestPage from "@@/lib/abtest/ABTestPage"
import { redirect } from "next/navigation"

const Page = (context: {
    params: {}
    searchParams: {
        service_id?: number
    }
}) => {
    const searchParams = context.searchParams
  return <ABTestPage/>
}

export default Page