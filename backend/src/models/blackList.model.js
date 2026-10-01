import mongoose from 'mongoose'

const blockTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        require : [true, "Token to be required "]
    }
},{
    timestamps: true
})

const blockTokenModel = mongoose.model('blockedTokens' , blockTokenSchema);

export default blockTokenModel