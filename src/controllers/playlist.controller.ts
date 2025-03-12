import mongoose from "mongoose";
import { Playlist } from "../models/playlist.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../interface/authRequest.interface";

const createPlaylist = asyncHandler(async (req: AuthRequest, res) => {
    const {name, description} = req.body
    const userId = req.user?._id

    if(!userId) throw new ApiError(400, "Please login to create a playlist")

    const playlistExist = await Playlist.findOne({name: name, owner: userId})

    if(playlistExist) throw new ApiError(409, "Playlist already exist")

    const newPlaylist = await Playlist.create({
        name: name,
        description: description,
        owner: userId
    })

    return res.status(200)
    .json(
        new ApiResponse(200, newPlaylist, "Playlist created successfully")
    )

})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    
    if(!userId) throw new ApiError(400, "Please login to get your playlist")
    const userObjectId = new mongoose.Types.ObjectId(userId)

    const userPlaylist = await Playlist.find({owner: userObjectId}).select("name description _id").lean()

    if(!userPlaylist) throw new ApiError(400, "User Playlist not found")

    return res.status(200)
    .json(
        new ApiResponse(200, userPlaylist, "User playlist fetch success")
    )
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const playlistObjectID = new mongoose.Types.ObjectId(playlistId)

    if (!playlistId || !mongoose.Types.ObjectId.isValid(playlistId)) {
        throw new ApiError(400, "Invalid Playlist ID");
    }

    const playlist = await Playlist.aggregate([
        {
            $match: {
                _id: playlistObjectID
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "playlistVideos"
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                "playlistVideos._id": 1,
                "playlistVideos.title": 1,
                "playlistVideos.duration": 1,
                "playlistVideos.views": 1,
                "playlistVideos.thumbnail": 1,  
                "playlistVideos.videoFile": 1,  
            }
        }
    ])

    if(!playlist) throw new ApiError(400, "No Playlist found")

    return res.status(200)
    .json(
        new ApiResponse(200, playlist, "Playlist Fetch success")
    )
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
