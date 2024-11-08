import ABTestPage from "@@/lib/abtest/ABTestPage";
import { notFound } from "next/navigation";

export default function ABTest({ params }: {
  params: {
    serviceId: string
  } 
}) {

  if(params.serviceId == "all") return notFound()
  return (
    <ABTestPage serviceId={params.serviceId}/>
  )
}
