import Simulation from "@@/lib/simulation/Simulation"

const Page = ({ params }: {
  params: { serviceId: string }
}) => {
  const checkValidation = () => {
    if(params.serviceId == "all") return false
    return true
  }
  if(!checkValidation()) return (
    <div className="w-full h-full flex items-center justify-center">
      <div>
        <h1 className="font-bold text-base text-primary">Not Found</h1>
        <p className="text-sm">Please choose your service first</p>
      </div>
    </div>
  )
  else
  return <Simulation serviceId={params.serviceId}/>
}

export default Page