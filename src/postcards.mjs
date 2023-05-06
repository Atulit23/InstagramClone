import mongoose from 'mongoose'

const schema = mongoose.Schema({
    from: String,
    post: String,
    likeBy: Array,
    comments: Array,
    caption: String,
    dp: String,
    id: String
})

export default mongoose.model('post', schema)
