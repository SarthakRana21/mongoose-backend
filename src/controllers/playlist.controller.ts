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
    //TODO: get user playlists
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
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
