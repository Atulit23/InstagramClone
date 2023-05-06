import mongoose from 'mongoose'

const schema = mongoose.Schema({
    from: String,
    post: String,
    dp: String,
    id: String,
})

export default mongoose.model('story', schema)
