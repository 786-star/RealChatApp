import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    userName: {
        type: String,
        requried: true,
        unique: true
    },
    email: {
        type: String,
        requried: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User;