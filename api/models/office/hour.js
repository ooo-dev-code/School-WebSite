import mongoose from "mongoose";

const hourSchema = mongoose.Schema({

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    week: {
        type: String,
        required: true
    },

    hour: {
        type: Number,
        default: 1
    },

})

const Hour = mongoose.model("Hour", hourSchema)

export default Hour