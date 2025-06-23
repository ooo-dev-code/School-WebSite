import mongoose from "mongoose";

const homeworkSchema = mongoose.Schema({

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    content: {
        type: String,
        required: true
    },
     
    done: {
        type: Boolean,
        default: false
    }
})

const Homework = mongoose.model("Homework", homeworkSchema)

export default Homework