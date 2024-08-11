import React, { useState } from 'react'
import { FaBars, FaPlus } from 'react-icons/fa'
import { GoTriangleDown } from 'react-icons/go'
import { IoIosSettings } from 'react-icons/io'
import { MdChatBubble } from 'react-icons/md'
import { Link } from 'react-router-dom'
import DarkMode from './DarkModeIcon'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'

const NavBar = () => {

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
    <nav className=' w-full'>
      
          <div className="w-full navbar bg-base-300 py-2 px-4 flex items-center justify-between">


          <div className="drawer  w-fit z-20 md:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content z-20">
            
            {/* Page content here */}
            <label htmlFor="my-drawer" className="  drawer-button z-10">
                <div className="bars cursor-pointer p-3 hover:bg-base-100 rounded-full">
            <FaBars className='w-5 h-5  ' />
            </div>
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4  pt-28 ">
              {/* Sidebar content here */}
              <Link to='/dashboard' className={`cursor-pointer text-sm bg-base-200 flex gap-3 items-center px-4 py-2 rounded-xl hover:bg-base-100  select-none `}>
              <FaPlus className='w-4 h-4 inline' />
              <span className={`${open ? "inline": "hidden"}`}>new chat</span>
              </Link>



              <div className='mt-6'>
              {!isPending && !error && data?.chats && <p className={`font-semibold  mt-6 mb-3 ${open ? "inline": "hidden"}`}>Recents Chats</p>} 

      {!isPending && !data?.chats && (<p className={`font-semibold  mt-6 mb-3`}>No Recents Chats</p>
      )}
      {/* recent chats section */}
      <div className={`flex flex-col gap-2 items-start justify-center   scrollbar-hide max-h-[300px] overflow-auto `}>

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
      
</div>


    <div className={`dropdown dropdown-top dropdown-end w-full mt-auto`}>
        <div tabIndex={0} role="button" className="flex flex-row gap-3 items-center justify-start px-4 py-2 cursor-pointer hover:bg-base-100 rounded-xl w-full"><IoIosSettings className='w-5 h-5' /> <p  className={`text-sm`}>Settings</p></div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li>
              <div className="flex items-center justify-between">
                  <p className="text-sm">Dark mode</p>

                   <DarkMode />
              </div>
          </li>
          
        </ul>
      </div>

              
            </ul>
          </div>
        </div>




          
           {/* navbar dropdown */}
           <div className="dropdown">
          <div tabIndex={0} role="button" className="hover:bg-base-100 px-6 py-2 transition ease-in-out rounded font-semibold select-none">
            Gemini <GoTriangleDown className='inline' />
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-72 p-2 shadow">
            <li>
              <Link to='/dashboard'>
                <img src="/gemini_star.webp" className='w-4' alt="" />
                <p className="text-sm">Gemini </p>
              </Link>
            </li>
            <li>
                <div className='flex items-center justify-between'>
                <span className='opacity-55 flex items-center justify-center '>
                <img src="/gemini_logo2.png" className='w-6 inline' alt="" />
                <p className="text-sm inline">Gemini Advance</p>
                </span>
                <button className="btn bg-base-300 btn-xs inline hover:bg-base-content hover:text-base-200">Premium</button>
                </div>
            </li>
          </ul>
        </div>

              <SignedOut>
            <Link to="/sign-in">
                <button className="btn btn-outline btn-sm">
                    Sign In
                  </button>
                  </Link>
                </SignedOut>
                <SignedIn>
                  <UserButton />
            </SignedIn>
          </div>
      </nav>
  )
}

export default NavBar