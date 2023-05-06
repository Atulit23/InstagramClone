import mongoose from 'mongoose'

const schema = mongoose.Schema({
    name: String,
    dob: String,
    username: String,
    dp: String,
    bio: String,
    email: String,
    password: String,
})

export default mongoose.model('profile', schema)
