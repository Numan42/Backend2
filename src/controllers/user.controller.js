import { asyncHandeler } from '../utils/asyncHandeler.js';
import ApiError from '../utils/ApiError.js';
import {User} from '../models/User.model.js';
import {uploadOnCloudinary} from '../utils/Cloudinary.js'
import ResponseApi from '../utils/ResponseApi.js';
export const UserRegister = asyncHandeler(async (req, res) => {

    // 1. taking fields required for register by req.body
    // 2. check if user already exists in the database
    // 3. password validation
    // 4. hashing the password
    // 5. save the avatar and coverimage to local server and then to cloudinary
    // 6. save the data to mongodb


    const { username, email, fullName, password } = req.body;
    // if (username || email || fullName || password) {
    //     throw new ApiError(400, "All fields are required")
    // }

    // or use this 
    if ([username, email, fullName, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }
    //  finds existing user with the same username or email in the database
    const existedUser = User.findOne(
        { $or: [{ username }, { email }] } // $or operator is used to check if either the username or email matches an existing user in the database
    )
    if (existedUser) {
        throw new ApiError(409, "User already exists")
    }

    const avatarLocalPath = req.file?.avatar[0]?.path
    const coverImagePath = req.file?.path[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar image is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImagePath);

    if (!avatar) {
        throw new ApiError(400, "Avatar image upload failed")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        email,
        username: username.toLowerCase(),
    })

    const createdUser = User.findById(user._id).select("-password", "-refreshToken")

    if(!createdUser){
        throw new ApiError(500, "User not created")
    }

    res.status(201).json(new ResponseApi(201, createdUser, "User created successfully"))
})