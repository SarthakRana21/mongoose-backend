import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({
    limit: "20kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}))

app.use(express.static("public"))

app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Welcome to mongoose backend")
})

// routers
import userRouter from './routes/user.routes'
import { ApiError } from './utils/ApiError'


// routes decleration
app.use("/api/v1/users", userRouter)
// http://localhost:8000/api/v1/users/register


// global error handling

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    console.log("Global Error: ", err)

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
})

export {app}