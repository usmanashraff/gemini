import mongoose from 'mongoose'
const userChatsSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:[true,'userId is required']
    },
    chats:[
        {
            _id:{
                type:String,
                required:true,
            },
            title:{
                type:String,
                required:true,
            },
            createdAt:{
                type:Date,
                default: new Date(Date.now())
            },
        }
    ]
}, {
    timestamps:true
})

const userChats = mongoose.models.userChats || mongoose.model('userChats', userChatsSchema)
export default userChats