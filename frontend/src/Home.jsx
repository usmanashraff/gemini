import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { TypeAnimation } from "react-type-animation"

function Home() {

  const [typingStatus, setTypingStatus] = useState(true)

  console.log("api url", import.meta.env.VITE_API_URL)
  return (
   <section className="relative flex flex-col items-center pt-12 justify-center gap-6 min-h-screen max-w-[1236px] mx-auto md:flex-row">
    <div className="absolute top-3 right-3">
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

    <div className=" flex-1 flex flex-col items-start justify-start max-md:justify-end max-md:items-center max-sm:items-start gap-3  w-full px-4 md:p-10 ">
      <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-red-400 inline-block text-transparent bg-clip-text">Gemini AI</h1>
      <p className="font-bold">Supercharge your productivity and creativity</p>
      <p className="text-sm">Google Gemini is a powerful AI model that can understand and process different types of information, like text and images. It's better than older models and can do many things, like translation and writing.</p>
      <Link to="/dashboard"><button className="btn btn-primary">Get Started</button></Link>
      
    </div>

    <div className="flex-1 px-2 w-full flex items-center justify-center relative  max-md:items-start  ">

      <div className="flex items-center justify-center bg-base-300 w-fit p-10 rounded-xl relative overflow-hidden max-xs:w-full">
        <img src="/bg.png" className="h-full w-full absolute top-0 left-0 z-0 animate-pulse" alt="" />
        <img src="/bot.png" className="w-60 z-10 animate-backForth" alt="" />
      </div>

      <div className="rounded-xl bg-base-300 p-3 text-sm absolute -bottom-4 max-md:bottom-20 right-10 flex flex-row gap-2 items-center ">
        <img src={typingStatus ? '/human.jpg': '/gemini_star.webp'} className="w-6 rounded-full" alt="" />
       <TypeAnimation 
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'What is the difference between artificial intelligence and machine learning?',
        1000,()=>setTypingStatus(false), // wait 1s before replacing "Mice" with "Hamsters"
        'Artificial Intelligence (AI) is a broad term referring to the simulation of human intelligence in machines.',
        1000,
        'Machine Learning (ML) is a subset of AI that involves training algorithms on data to make predictions or decisions without explicit programming',
        1000,()=>setTypingStatus(true), 
      ]}
      wrapper="span"
      omitDeletionAnimation={true}
      style={{ fontSize: '1em', display: 'inline-block' }}
      repeat={Infinity}
    />
       </div>
    </div>

    
   </section>
  )
}

export default Home
