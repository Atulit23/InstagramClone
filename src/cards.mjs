import mongoose from 'mongoose'

const schema = mongoose.Schema({
    useremail: String,
    password: String
})

export default mongoose.model('email', schema)
