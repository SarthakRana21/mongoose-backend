import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model"
import {ApiError} from "../utils/ApiError"
import {ApiResponse} from "../utils/ApiResponse"
import {asyncHandler} from "../utils/asyncHandler"
import { AuthRequest } from "../interface/authRequest.interface"

const toggleVideoLike = asyncHandler(async (req: AuthRequest, res) => {
    const {videoId} = req.params
    const userId = req.user?._id

    if(!userId) throw new ApiError(400, "Please login to like the video")
    if (!videoId) throw new ApiError(400, "Invalid video ID");
    
    const removeLike = await Like.findOneAndDelete({video: videoId, likedBy: userId})

    if(removeLike) {
        res.status(200)
        .json(
            new ApiResponse(200, "Like Removed")
        )
    }
    const likeVideo = await Like.create({video: videoId, likedBy: userId})
    
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

})

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos

})

export {
    toggleCommentLike,
    toggleVideoLike,
    getLikedVideos
}