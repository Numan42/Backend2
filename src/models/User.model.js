import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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


UserSchema.pre("save", function async(next) {     // hash password before saving to database
    if (!this.password.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.ispasswordCorrect = async function (passowrd) { // compare password with hashed password
    return await bcrypt.compare(passowrd, this.password)
}

UserSchema.methods.genrateAccessToken =  function () { 
    jwt.sign(
        {
            id: this._id,
            username: this.username,
            email: this.email,
            Fullname: this.Fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        }
    )
}// generate accsee token
UserSchema.methods.genrateRefreshToken =  function () { 
    jwt.sign(
        {
            id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
        }
    )
}// generate refresh token

export const User = mongoose.model("User", UserSchema)