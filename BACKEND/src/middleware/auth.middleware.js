import { asyncHandler, AppError } from "../utils/errorHandler.js"
import { verifyToken } from "../utils/helper.js"
import { findUserById } from "../dao/user.dao.js"

export const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken

    if (!token) {
        throw new AppError("Please login first", 401)
    }

    const decoded = verifyToken(token)

    const user = await findUserById(decoded.id)

    if (!user) {
        throw new AppError("User not found", 401)
    }

    req.user = user
    next()
})