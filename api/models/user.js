import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true,
        default: "Student"
    },

    subject: {
        type: String,
        default: ""
    },

    classes: {
        type: String,
        default: "101"
    },

})

const User = mongoose.model("User", userSchema)

export default User