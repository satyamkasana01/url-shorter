import { asyncHandler } from "../utils/errorHandler";


export const resister = asyncHandler(async (req,res)=>{
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