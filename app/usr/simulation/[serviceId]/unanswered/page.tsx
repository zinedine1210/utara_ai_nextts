import UnansweredPage from "@@/lib/unanswered/UnansweredPage";
import { notFound } from "next/navigation";

export default function Page({ params }: {
  params: {
    serviceId: string
  } 
}) {

  if(params.serviceId == "all") return notFound()
  return (
    <UnansweredPage serviceId={params.serviceId}/>
  )
}
