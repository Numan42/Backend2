import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    Fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //claudinary url
        required: true,
        lowercase: true,
    },
    coverImage: {
        type: string
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "passowrd is required"],
        lowercase: true

    },

    refreshTokens: {
        type: String
    }

}, { timestamps: true })

export const User = mongoose.model("User", UserSchema)