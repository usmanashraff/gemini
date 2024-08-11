import React, { useEffect, useRef, useState } from 'react'
import { IoIosSend, IoMdPhotos } from 'react-icons/io'
import Upload from './upload/Upload'
import { IKImage } from 'imagekitio-react'
import model, { chat } from '../../lib/gemini'
import { useMutation, useQueryClient } from '@tanstack/react-query'
const NewPrompt = ({setresponseLoading, chatId, setPrompt, setResponse, setpromptImg, data}) => {
  // use states
  const [loading, setLoading] = useState(false)
  const [img, setImg] = useState({
    loading: false,
    error: "",
    data:{},
    aiData:{}
  })

  const formRef = useRef(null)
  const queryClient = useQueryClient()
  const dbMutation = useMutation({
    mutationFn: ({prompt, text})=>{
      let imageUrl
      if(img?.data)
      imageUrl = img?.data?.url
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        method:"PUT",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({...(prompt ? {prompt}: undefined), text,...(imageUrl ? {imageUrl}: undefined) }),
  
      })
    },
    onSuccess: ()=>{ 
      queryClient.invalidateQueries(['chat']).then(()=>{
        setpromptImg("")
        setLoading(false)
        setPrompt("")
        setResponse("")
        setresponseLoading(false)
        setLoading(false)
        setImg({
          loading: false,
          error: "",
          data:{},
          aiData:{}
        })
        queryClient.invalidateQueries(['sideBarChats'])
      })
      
      
      
    },
   
  })

  dbMutation.isError && console.log(dbMutation.error.message)

  

  

  const run = async (prompt, flag)=>{
    setresponseLoading(true)
    const result = await chat.sendMessageStream(Object.entries(img?.aiData).length ? [img.aiData, prompt]: [prompt]);
  
      let text = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        // console.log(chunkText);
        text += chunkText;
        setresponseLoading(false)
        setResponse(text)
      }

       flag && dbMutation.mutate({prompt, text})
       !flag && dbMutation.mutate({text})
    
  }

let hasRun = useRef(false)
useEffect(()=>{
      if(!hasRun.current)
        {
           data?.history?.length == 1 && run(data?.history[0].parts[0].text, false) && console.log('running')
        }
        hasRun.current = true
},[])


  async function handleForm(e) {

      setLoading(true)
      setresponseLoading(true)
      e.preventDefault()
      const prompt = e.target.prompt.value
      setPrompt(prompt)
      formRef.current.reset()
      run(prompt, true)
  }

  img?.data.filePath && setpromptImg(img?.data?.filePath)

  

  return (
    <form ref={formRef} className='w-full absolute bottom-0 left-1/2 right-1/2 -translate-x-1/2   max-w-[900px]' onSubmit={(e)=> handleForm(e)}>
        <div className="pb-2 bg-base-100  flex items-center justify-center flex-col gap-1 ">
          
        <div className={`flex flex-col items-start justify-center  w-full bg-base-300 rounded-full ${img?.data.filePath || img.loading? "pt-3 rounded-none": ""}`}>
        {
          img.data.filePath && !loading && (  <IKImage
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_ENDPOINT}
            path={img?.data?.filePath}
            className='w-10 ml-10'
          />)
        }
        {
          img.loading && (<span className="ml-10 loading loading-spinner loading-sm"></span>
          )
        }

        <div className={`join w-full bg-base-300 flex items-center justify-center rounded-full gap-4 pr-2 ${img?.data.filePath || img.loading ? "rounded-none": ""}`}>
        <input type="text" className='w-full bg-base-300  border-none outline-none rounded-full p-7 join-item' name="prompt" placeholder='Enter a prompt here' required />
       
        <Upload setImg={setImg} />

        <div className='flex justify-center items-center  p-3 rounded-full hover:bg-base-100'>
        <button disabled={loading || dbMutation.isPending || img.loading} type='submit' className={`icon-states ${loading || img.loading? " bg-gray-600 disabled": ""}`}>
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

export default NewPrompt