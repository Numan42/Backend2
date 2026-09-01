import { asyncHandeler } from '../utils/asyncHandeler.js';
import ApiError from '../utils/ApiError.js';
export const UserRegister = asyncHandeler(async (req, res) => {

    const { username, email, fullName, password } = req.body;
    // if (username || email || fullName || password) {
    //     throw new ApiError(400, "All fields are required")
    // }

    // or use this 
    if([username, email, fullName, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }
})