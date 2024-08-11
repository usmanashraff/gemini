import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className="flex items-center flex-col gap-10 justify-center min-h-screen max-2xl:gap-4 ">
 <h1 className="text-4xl font-bold inline-block ">SignUp here!</h1> 
    <SignUp path='sign-up' signInUrl='/sign-in' forceRedirectUrl='/dashboard' />
    </div>
  )
}

export default SignUpPage