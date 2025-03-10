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
import channelRouter from './routes/channel.routes'
import likeRouter from './routes/like.routes'
import { ApiError } from './utils/ApiError'


// routes decleration
app.use("/api/v1/users", userRouter)
// http://localhost:8000/api/v1/users/register
// http://localhost:8000/api/v1/users/login
// http://localhost:8000/api/v1/users/logout
// http://localhost:8000/api/v1/users/change-password
// http://localhost:8000/api/v1/users/edit-user-details
// http://localhost:8000/api/v1/users/delete-user
// http://localhost:8000/api/v1/users/update-image
// http://localhost:8000/api/v1/users/watch-history


app.use("/api/v1/channel/user", channelRouter)
// http://localhost:8000/api/v1/channel/:username


app.use("/api/v1/like", likeRouter)
// http://localhost:8000/api/v1/like/video/:videoId
// http://localhost:8000/api/v1/like/comment/:commentId
// http://localhost:8000/api/v1/like/videos



// global error handling
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    console.log("Global Error: ", err)

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
})

export {app}