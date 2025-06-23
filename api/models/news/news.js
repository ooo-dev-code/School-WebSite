import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  image: {
    type: String, 
    required: false,
  },
});

const News = mongoose.model("News", newsSchema);

export default News;
