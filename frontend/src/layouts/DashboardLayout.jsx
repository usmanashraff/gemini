import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import InputForm from '../components/InputForm'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import Loading from '../components/Loading'
const DashboardLayout = () => {

  const {userId, isLoaded} =useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    if(isLoaded && !userId)
      navigate("/sign-in")
  },[isLoaded, userId])

  if(!isLoaded)
    return (
    <Loading />  
    )
  return (
    <div className='flex min-h-screen '>
      <div className="leftbar bg-base-300">
        <SideBar />
      </div>
      <div className="grow relative flex flex-col justify-start items-center  max-h-screen">
          <NavBar />
          <div className='max-w-[900px] w-full grow  overflow-auto scrollbar-hide'>
          <Outlet />
          </div>
      </div>
    </div>
    

  )
}

export default DashboardLayout