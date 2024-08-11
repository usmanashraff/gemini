import mongoose from 'mongoose'
const chatSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:[true,'userId is required']
    },
    history:[
        {
            role:{
                type:String,
                enum:['user', 'model']
            },
            parts:[
                {
                    text:{
                        type:String,
                        required:true
                    }
                }
            ],
            imageUrl:{
                type:String,
                required:false,
            }
        }
    ]
}, {
    timestamps:true
})

const chat =  mongoose.models.chat || mongoose.model('chat', chatSchema)
export default chat