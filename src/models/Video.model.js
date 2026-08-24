import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const VideoSchema = new mongoose.Schema({
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    duration: {
        type: Number, //form claudnary
        required: true
    },
    duration: {
        type: Number,
        required: true,
        default: 0
    },
    isPublished: {
        type: boolean,
        default: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }


}, { timestamps: true })

VideoSchema.plugin(mongoosePaginate)
export const Video = mongoose.model("Video", VideoSchema)