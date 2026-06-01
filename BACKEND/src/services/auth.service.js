import { userModel } from "../models/user.model.js"
import jsonwebtoken from "jsonwebtoken"
import { createUser, findUserbyEmail } from "../dao/user.dao.js"
import { signToken } from "../utils/helper.js"
import { AppError } from "../utils/errorHandler.js"

export const registerUser = async (name, email, password) => {
    // Implementation for registering a new user
    const user = await findUserbyEmail(email)
    if(user) 
        throw new AppError("User already exists")

    const newUser = await createUser(name, email, password)
    const token = await signToken({id: newUser._id})
    return token
    
}