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

    return res.status(200)
    .json(
        new ApiResponse(200, likeVideo, "Video liked successfully")
    )
    
})

const toggleCommentLike = asyncHandler(async (req: AuthRequest, res) => {
    const {commentId} = req.params
    const userID = req.user?._id

    if(!userID) throw new ApiError(400, "Please login to like the comment")

    const removeLive = await Like.findOneAndDelete({comment: commentId, likedBy: userID})

    if(removeLive) {
        return res.status(200)
        .json(
            new ApiResponse(200, "Like removed")
        )
    }

    const likeComment = await Like.create({comment: commentId, likedBy: userID})

    return res.status(200)
    .json(
        new ApiResponse(200, likeComment, "Comment liked successfully")
    )

})

const getLikedVideos = asyncHandler(async (req:AuthRequest, res) => {
    const userId = req.user?._id

    if(!userId) throw new ApiError(400, "Please login to see liked videos")
    
    const likedVideos = await Like.aggregate([
        {
            $match: {
                likedBy: userId?.toLocaleLowerCase()
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "videoList"
            }
        }
    ])

})

export {
    toggleCommentLike,
    toggleVideoLike,
    getLikedVideos
}