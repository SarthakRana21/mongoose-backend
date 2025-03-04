import { JwtPayload } from "jsonwebtoken"
import { User } from "../models/user.model"
import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"
import { asyncHandler } from "../utils/asyncHandler"
import { Request } from "express"
import mongoose from "mongoose"


interface AuthRequest extends Request {
    user?: JwtPayload
}

// aggregation pipeline
const getUserChannelProfile = asyncHandler(async(req: AuthRequest, res) => {
    const {username} = req.params
    const userId = req.user?._id

    if(!username?.trim()) throw new ApiError(400, "User not found")

    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLocaleLowerCase()
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                subscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {
                            $in: [userId, "$subscribers.subscriber"]
                        },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                subscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1
            }
        }
    ])

    // console.log("Channel: ", channel)

    if(!channel?.length) throw new ApiError(400, "Channel does not exist") 

    return res.status(200)
    .json(new ApiResponse(200, channel[0]))

})

// nested pipelines
const getWatchHistory = asyncHandler(async (req: AuthRequest, res) => {

    const userId = req.user?._id
    if(!userId) throw new ApiError(400, "Pleae login to see watch history")
    
    const userObjectId = new mongoose.Types.ObjectId(userId)

    const user = await User.aggregate([
        {
            $match: {
                _id: userObjectId
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "userWatchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        username: 1,
                                        avatar: 1,
                                        fullName: 1,
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                watchHistory: "$userWatchHistory",
                owner: "$owner" // use less
            }
        },
        {
            $project: {
                watchHistory: 1,
                owner: 1
            }
        }
    ])

    return res.status(200)
    .json(
        new ApiResponse(200, user[0])
    )
})

export {
    getUserChannelProfile,
    getWatchHistory
}