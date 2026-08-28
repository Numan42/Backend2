import { asyncHandeler } from '../utils/asyncHandeler.js';

export const UserRegister = asyncHandeler(async (req, res) => {
    res.status(200).json({
        message: 'User registered successfully',
    })
})