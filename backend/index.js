import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import ImageKit from 'imagekit';
import cors from 'cors'
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import chat from './models/chat.js';
import userChats from './models/userChats.js';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';



const port = process.env.PORT || 3000
const app = express(process.env.IMAGEKIT_ENDPOINT)

//middleware
app.use(bodyParser.json());
app.use(express.json())
app.use(cors({
    origin:'https://geminiserver-epvgn6iem-usman-ashrafs-projects.vercel.app',
    credentials: true,
}))


const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  });


// end points
app.get('/api/upload', (req, res)=>{
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
})
app.get('/', (req,res)=>{
  res.send("hello vercel", process.env.env.CLIENT_URL)

})

app.get('/api/userchats',ClerkExpressRequireAuth(),
 async(req, res)=>{
    const userId = req.auth.userId
    try {
        const userChat = await userChats.findOne({userId})
        res.status(200).send(userChat);

    } catch (error) {
        console.log("error in fetching userChats", error)
        res.status(500).send({error_message: "error in fetcing userchats",
            error: error,
        })
    }
} )


app.get('/api/chat/:id',ClerkExpressRequireAuth(),
 async(req, res)=>{
    const userId = req.auth.userId

    try {
        const fetchchat = await chat.findOne({_id: req.params.id ,userId})
         res.status(200).send(fetchchat);

    } catch (error) {
        console.log("error in fetching chat", error)
        res.status(500).send({error_message: "error in fetcing chat",
            error: error,
        })
     }
} )


app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
  
    const { prompt, text, imageUrl } = req.body;
    console.log(prompt, text, imageUrl)
  
    const newItems = [
      ...(prompt
        ? [{ role: "user", parts: [{ text: prompt }], ...(imageUrl && { imageUrl }) }]
        : []),
      { role: "model", parts: [{ text }] },
    ];
  
    try {
      const updatedChat = await chat.updateOne(
        { _id: req.params.id, userId },
        {
          $push: {
            history: {
              $each: newItems,
            },
          },
        }
      );
      res.status(200).send(updatedChat);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error adding conversation!");
    }
  });



app.post('/api/chats',
    ClerkExpressRequireAuth(), 
  async (req, res)=>{
    const {prompt} = req.body
    const userId = req.auth.userId
    try {
        const newChat = new chat({
            userId,
            history:[{
                role: 'user',
                parts:[{
                    text:prompt
                }]
            }]
        })

        const savedChat = await newChat.save()

        // if userChat exists with the same userId just push to new userChats array or create a new one in case does not exist
        const userChat = await userChats.find({userId})
        if(!userChat.length)
        {
            const newUserChat = userChats({
                userId,
                chats:[{
                    _id:savedChat._id,
                    title: prompt.substring(0,40)
                }]
            })

            const savedUserChat = newUserChat.save()
        }
        else{
            await userChats.updateOne({userId}, {
                $push:{
                    chats:{
                        _id:savedChat._id,
                        title: prompt.substring(0,40)
                    }
                }
            })
        }
        console.log('success')
        res.status(201).send({_id: savedChat._id})

        
    } catch (error) {
     console.log("error in creating chat", error)
     res.status(500).send({error: "error in creating chat"})
    }
})


// authentication error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(401).send('Unauthenticated!');
  });


const connect = async() =>{
    try {
      await mongoose.connect(process.env.MONGODB_URL)
      console.log('connected to mongodb')
    } catch (error) {
        console.log(error)
    }
}
app.listen(port, async ()=> {
    await connect()
    console.log("server in running on port:", port)
}
)