import { Router } from "express";
import {
    toggleCommentLike,
    toggleVideoLike,
    getLikedVideos
} from "../controllers/like.controller"
import { verifyJWT } from "../middlewares/auth.middleware";

const likeRouter = Router()

likeRouter.use(verifyJWT)

// http://localhost:8000/api/v1/like/toggle/v/:videoId
likeRouter.route('/toggle/v/:videoId').post(toggleVideoLike)

// http://localhost:8000/api/v1/toggle/c/:commentId
likeRouter.route('/toggle/c/:commentId').post(toggleCommentLike)

// http://localhost:8000/api/v1/like/videos
likeRouter.route('/videos').get(getLikedVideos)

export default likeRouter