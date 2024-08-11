import { ClerkProvider } from '@clerk/clerk-react'
import { dark, neobrutalism,shadesOfPurple  } from '@clerk/themes'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const queryClient = new QueryClient()


const RootLayout = () => {
  const [theme, settheme] = useState(localStorage.getItem("theme")? localStorage.getItem("theme"): "light")

  useEffect(()=>{
    settheme(localStorage.getItem("theme"))
    console.log("hello")
  },[localStorage.getItem("theme")])

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" appearance={{
      baseTheme:theme==='dark'?dark: null
    }}>
      <QueryClientProvider client={queryClient}>
    <main className='max-h-screen overflow-hidden'>
        <Outlet />
        
    </main>
    {/* <ReactQueryDevtools  /> */}
    </QueryClientProvider>
    </ClerkProvider>
  )
}

export default RootLayout