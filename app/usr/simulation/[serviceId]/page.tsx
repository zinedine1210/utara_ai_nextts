import Simulation from "@@/lib/simulation/Simulation"

const Page = ({ params }: {
  params: { serviceId: string }
}) => {
  return <Simulation serviceId={params.serviceId}/>
}

export default Page