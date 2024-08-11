import React, { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import './chat.module.css';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import NewPrompt from '../components/NewPrompt';
import { IKImage } from 'imagekitio-react';
import Upload from '../components/upload/Upload';
import { IoIosSend } from 'react-icons/io';
import model, { chat } from '../../lib/gemini';

const Chat = () => {
 
   /////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////

  const endref = useRef(null)
  // fetching chat history
  const chatId = useLocation().pathname.split('/').pop()
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [promptImg, setpromptImg] = useState('')
  const [responseLoading, setresponseLoading] = useState(false)

  const queryClient = useQueryClient()
  const { isPending, error, data } = useQuery({
    queryKey: ['chat'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chat/${chatId}`, {
        credentials: 'include',
      }).then((res) =>
        res.json(),
      ),
      refetchInterval: 1
  })

  useEffect(()=>{
    endref.current.scrollIntoView({
      behavior: "smooth"
    })
  }, [prompt, response, data])


  return (
    <div>
      <div className=' relative h-full  px-2 overflow-auto mb-36 '>
       {/* chat history from db */}
        { 
          data && data?.history && (
              data?.history.map((msg,i)=>(

                <div key={i} className={`chat overflow-auto scrollbar-hide gap-2 flex flex-col  ${msg.role === 'user' ? "chat-end": "chat-start"}`}>
                  <div className="flex items-start gap-2">
                    {msg.role === 'model' && (
                      <img src="/gemini_star.webp" alt="gemini" className='w-8'  />
                    )}
                  <div className="chat-bubble bg-base-300 text-base-content"><Markdown>{msg.parts[0].text}</Markdown></div>
                
                  </div>
              {msg.imageUrl && (<img
                  src={msg.imageUrl}
                  className='w-52 ml-10'
             />)}
            </div>

              ))
          )
        }
        {/* error */}
        {
          error && ( <p className=' text-error'>something went wrong!</p> )
        }
        {/* loading */}
        {
            isPending && (
              <span className="loading loading-spinner loading-sm mt-10"></span>
            )
        }
        {
          prompt !== '' && (
            <div className={`chat chat-end overflow-auto scrollbar-hide gap-2 flex flex-col`}>
            <div className="chat-bubble bg-base-300 text-base-content ">{prompt} 

            </div>
            {
              promptImg !== '' && <IKImage
               urlEndpoint={import.meta.env.VITE_IMAGEKIT_ENDPOINT}
               path={promptImg}
               className='w-52 ml-10'
               loading='lazy'
             />
            }
           </div>
          )
        }
        {
            response !== '' && (
              <div  className={`chat chat-start`}>
                <div className="flex items-start justify-start gap-2">
                <img src="/gemini_star.webp" alt="gemini" className='w-8 animate-rotateLogo'  />
                <div className="chat-bubble bg-base-300 text-base-content"><Markdown>{response}</Markdown>
                </div>
                </div>
            </div>)
        }
        {/* responseLoading ....  */}
        {responseLoading && (
            <div className="flex gap-2 items-start justify-start w-full">
            <img src="/gemini_star.webp" alt="gemini" className='w-8 animate-rotateLogo'  />
          <div className='flex flex-col gap-1 grow'>
          <div className="skeleton h-24 w-full bg-base-300"></div>
          
          </div>
          </div>
        )}
        {/* to reach to end of convo */}
       <div ref={endref}></div>
      </div>
    <NewPrompt data={data} chatId={chatId} setResponse={setResponse} setPrompt={setPrompt} setpromptImg={setpromptImg}  setresponseLoading={setresponseLoading}/>
    </div>
  )
}

export default Chat