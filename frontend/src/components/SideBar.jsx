import React, { useState } from 'react'
import { FaBars, FaPlus } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'
import { MdChatBubble } from 'react-icons/md'
import DarkMode from './DarkModeIcon'
import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Link, useLocation } from "react-router-dom"
const SideBar = () => {
  const [open, setOpen] = useState(true)
  
  const { isPending, error, data } = useQuery({
    queryKey: ['sideBarChats'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: 'include',
      }).then((res) =>
        res.json(),
      ),
  })


  return (
    <div className={`min-h-full p-2  flex flex-col items-start justify-center max-md:hidden transition-all duration-500  ${open ? "w-80": "w-16"}`}>
      {/* navbar top section */}
      <div className="min-h-[110px] flex items-start justify-between flex-col">
        <div className="bars cursor-pointer p-3 hover:bg-base-100 rounded-full" onClick={()=>setOpen(!open)}>
        <FaBars className='w-5 h-5  ' />
        </div>
       
        <Link to='/dashboard' className={`cursor-pointer text-sm bg-base-200 flex gap-3 items-center px-4 py-2 rounded-xl hover:bg-base-100  select-none `}>
        <FaPlus className='w-4 h-4 inline' />
        <span className={`${open ? "inline": "hidden"}`}>new chat</span>
        </Link>
       
      </div>

      {/* navbar top section end */}
      
      {!isPending && !data?.chats && (<p className={`font-semibold  mt-6 mb-3 ${open ? "inline": "hidden"}`}>No Recents Chats</p>
)}
     {!isPending && !error && data?.chats && <p className={`font-semibold  mt-6 mb-3 ${open ? "inline": "hidden"}`}>Recents Chats</p>} 
     {/* { error && <p className=' text-error'>something went wrong</p> } */}
      <div className={`${open ? "inline": "hidden"} flex flex-col gap-2 items-start justify-center   scrollbar-hide max-h-[300px] overflow-auto `}>

      {/* recent chats section */}
       {
        data?.chats ? (
          data?.chats.map((chat)=>(
            
            <Link to={`/dashboard/chats/${chat._id}`} key={chat._id} className='w-full'>
              <div  className="flex items-center w-full gap-3 px-4 py-2 bg-base-200 rounded-xl justify-start hover:bg-base-100 cursor-pointer">
              <MdChatBubble className='w-5 h-5' />
              <p className="text-sm">{chat.title}</p>
            </div>
            </Link>
      
          ))
        ): ("")
       }

       {
        isPending && (
          <span className="loading loading-spinner loading-sm mt-10"></span>
        )
       }


      </div>
    {/* recent chats section ends */}

        <div className={`dropdown dropdown-right dropdown-end w-full mt-auto  `}>
        <div tabIndex={0} role="button" className="flex flex-row gap-3 items-center justify-start px-4 py-2 cursor-pointer hover:bg-base-100 rounded-xl w-full"><IoIosSettings className='w-5 h-5' /> <p  className={`${open ? "inline": "hidden"} text-sm`}>Settings</p></div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li>
              <div className="flex items-center justify-between">
                  <p className="text-sm">Dark Mode</p>
                   <DarkMode />
              </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar