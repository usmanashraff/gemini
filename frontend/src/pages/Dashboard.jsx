import { useState } from 'react'
import InputForm from '../components/InputForm'
const Dashboard = () => {
  return (
    <div className=" h-full flex items-center justify-center">

       <div className="flex flex-col items-center justify-center gap-4  w-full h-full">
       <h1 className=" opacity-60 text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-red-400 inline-block text-transparent bg-clip-text">Gemini AI</h1>       
       <div className="flex flex-row items-center justify-center gap-4 max-[500px]:flex-col">
       

       <div className="cursor-pointer flex flex-col items-start justify-center p-3 bg-base-300 rounded-xl gap-2">
         <img src="/chat.png" className="w-16"alt="" />
         <p className="text-xs">Create a new chat</p>
       </div>

       <div className="cursor-pointer flex flex-col items-start justify-center p-3 bg-base-300 rounded-xl gap-2">
         <img src="/image.png" className="w-16"alt="" />
         <p className="text-xs">Analyze images</p>
       </div>

       <div className=" cursor-pointer flex flex-col items-start justify-center p-3 bg-base-300 rounded-xl gap-2">
         <img src="/code.png" className="w-16"alt="" />
         <p className="text-xs">Help me with code</p>
       </div>

     </div>
       </div>
       <InputForm />
    </div>
  )
}

export default Dashboard