import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
import { useRef } from 'react';
import { IoMdPhotos } from 'react-icons/io';

const urlEndpoint = import.meta.env.VITE_IMAGEKIT_ENDPOINT
const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;




const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:3000/api/upload');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

function Upload({setImg}) {

    const IKref = useRef(null)
    const onError = err => {
        console.log("Error", err);
        setImg((prev)=>({...prev, loading:false, error:err}))
      };
      
      const onSuccess = res => {
        console.log("Success", res);
        setImg((prev)=>({...prev, data:res, loading:false}))
      };
      
      const onUploadProgress = progress => {
        console.log("Progress", progress);
        setImg((prev)=>({...prev, loading:true}))
      };
      
      const onUploadStart = evt => {
        const file = evt.target.files[0]
        const reader = new FileReader()
        reader.onloadend = ()=>{
          setImg((prev)=>({...prev, loading:true, aiData:{
            inlineData: {
              data: reader.result.split(",")[1],
              mimeType: file.type,
            }
          }}))

        }
        reader.readAsDataURL(file)
      };


  return (
      <div className='w-fit flex items-center justify-center'>
      <IKContext 
        publicKey={publicKey} 
        urlEndpoint={urlEndpoint} 
        authenticator={authenticator} 
      >
        
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          useUniqueFileName={true}
          style={{"display":"none"}}
          ref={IKref}
        />
        <label onClick={()=>IKref.current.click()} className='cursor-pointer  icon-states '>
        <IoMdPhotos className="join-item w-6 h-6" />
        </label>
      </IKContext>
      
  </div>
    
  );
}

export default Upload;