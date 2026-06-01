import { asyncHandler } from "../utils/errorHandler.js";
import { registerUser } from "../services/auth.service.js";


export const register = asyncHandler(async (req,res)=>{
    const {name,email,password} = req.body
    const user = await registerUser(name, email, password)
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user
    })
})

export const login = asyncHandler(async (req,res)=>{
    res.json({
        success: true,
        message: "Login route"
    })
})