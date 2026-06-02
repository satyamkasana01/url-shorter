import { asyncHandler } from "../utils/errorHandler.js";
import { registerUser } from "../services/auth.service.js";
import { cookieOptions } from "../confing/confing.js";
import { loginUser } from "../services/auth.service.js";


export const register = asyncHandler(async (req,res)=>{
    const {name,email,password} = req.body
    const userToken = await registerUser(name, email, password)
    res.cookie("acessToken", userToken, cookieOptions)
    res.status(201).json({
        success: true,
        message: "User registered successfully",
    })
})

export const login = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    // Implementation for user login
    const userToken = await loginUser(email, password)
    res.cookie("acessToken", userToken, cookieOptions)
    res.json({
        success: true,
        message: "Login successful",
    })
})