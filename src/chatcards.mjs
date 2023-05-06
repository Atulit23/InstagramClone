import mongoose from 'mongoose'

const schema = mongoose.Schema({
    from: String,
    to: String,
    chats: String,
})

export default mongoose.model('chat', schema)
