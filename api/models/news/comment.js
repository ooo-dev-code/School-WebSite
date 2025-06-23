import mongoose from "mongoose";

const commentSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    news: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "News",
        required: true
    },

    content: {
        type: String,
        required: true
    },
})

const Comment = mongoose.model("Comment", commentSchema)

export default Comment