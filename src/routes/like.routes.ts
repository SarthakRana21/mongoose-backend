import { Router } from "express";
import {
    toggleCommentLike,
    toggleVideoLike,
    getLikedVideos
} from "../controllers/like.controller"
import { verifyJWT } from "../middlewares/auth.middleware";

const likeRouter = Router()

likeRouter.use(verifyJWT)

// http://localhost:8000/api/v1/like/video/:videoId
likeRouter.route('/video/:videoId').post(toggleVideoLike)

// http://localhost:8000/api/v1/like/comment/:commentId
likeRouter.route('/comment/:commentId').post(toggleCommentLike)

// http://localhost:8000/api/v1/like/videos
likeRouter.route('/videos').get(getLikedVideos)

export default likeRouter