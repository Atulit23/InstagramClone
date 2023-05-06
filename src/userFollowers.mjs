import mongoose from 'mongoose'

const schema = mongoose.Schema({
    username: String,
    followers: Array,
    following: Array,
    dummyFollowers: Array
})

export default mongoose.model('follow', schema)
