import express from 'express'
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


// routes decleration
app.use("/api/v1/users", userRouter)
// http://localhost:8000/api/v1/users/register

export {app}