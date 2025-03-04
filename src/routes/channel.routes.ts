import { Router } from "express"
import {
    getUserChannelProfile,
} from '../controllers/channel.controller'
import { verifyJWT } from "../middlewares/auth.middleware"

const channelRouter = Router()

// http://localhost:8000/api/v1/channel/:username
channelRouter.route('/:username').get(
    verifyJWT,
    getUserChannelProfile
)

export default channelRouter