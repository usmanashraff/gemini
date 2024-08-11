import React, { useState } from 'react'
import { IoIosSend, IoMdPhotos } from 'react-icons/io'
import Upload from './upload/Upload'
import { IKImage } from 'imagekitio-react'
import model from '../../lib/gemini'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const InputForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const [img, setImg] = useState({
    loading: false,
    error: "",
    data:{},
    aiData:{}
  })
  const queryClient = useQueryClient()
  const dbMutation = useMutation({
    mutationFn: async (prompt)=>{
      let imageUrl
      if(img?.data)
      imageUrl = img?.data?.url
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method:"POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({prompt, ...(imageUrl ? {imageUrl}: undefined)}),
      }).then((data)=>data.json())
    },
    onSuccess:({_id})=>{
      queryClient.invalidateQueries(['sideBarChats']).then(()=>{
        queryClient.invalidateQueries(['chat']).then(()=>{
          setLoading(false)
          navigate(`/dashboard/chats/${_id}`)
        })
      })
       
      
    },

  })
  

  function run(e) {
    e.preventDefault()
       setLoading(true)
       const prompt = e.target.prompt.value      
       dbMutation.mutate(prompt)
    
  }
  
  
  return (
    <form className='w-full absolute bottom-0 left-1/2 right-1/2 -translate-x-1/2   max-w-[900px]' onSubmit={(e)=> run(e)}>
        <div className="pb-2 bg-base-100  flex items-center justify-center flex-col gap-1 ">
          
        <div className={`flex flex-col items-start justify-center  w-full bg-base-300 rounded-full ${img?.data.filePath || img.loading? "pt-3 rounded-none": ""}`}>
        {
          img.data.filePath ? (  <IKImage
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_ENDPOINT}
            path={img?.data?.filePath}
            className='w-10 ml-10'
          />): (null)
        }
        {
          img.loading ? (<span className="ml-10 loading loading-spinner loading-sm"></span>
          ):(null)
        }

        <div className={`join w-full bg-base-300 flex items-center justify-center rounded-full gap-4 pr-2 ${img?.data.filePath || img.loading ? "rounded-none": ""}`}>
        <input type="text" className='w-full bg-base-300  border-none outline-none rounded-full p-7 join-item' name="prompt" placeholder='Enter a prompt here' required />
       
        <Upload setImg={setImg} />

        <div className='join-item'>
        <button className={`icon-states ${loading || img.loading? " bg-gray-600 disabled": ""}`} type='submit' disabled={loading || img.loading}>
        <IoIosSend className='w-6 h-6' />
        </button>
        </div>

        </div>
        </div>
        <p className='text-xs text-center'>
        Gemini may display inaccurate info, including about people, so double-check its responses
        </p>
        </div>

    </form>
  )
}

export default InputForm