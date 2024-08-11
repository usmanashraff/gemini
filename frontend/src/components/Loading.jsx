import React from 'react'

const Loading = () => {
  return (
    <div className='absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 flex items-center flex-row'>
        <img src="/gemini_logo2.png" className='w-14' alt="" />
        <p className='text-sm'>Please wait...</p>
    </div>
  )
}

export default Loading