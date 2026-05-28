export class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"

    if (process.env.NODE_ENV !== "production") {
        console.error(err)
    }

    res.status(statusCode).json({
        success: false,
        status: err.status || "error",
        message,
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    })
}