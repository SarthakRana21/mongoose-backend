import mongoose from "mongoose";

interface IVideo {
    id: string,
    videoFile: string,
    thumbnail: string,
    owner: mongoose.Schema.Types.ObjectId,
    title: string,
    description: string,
    duration: number,
    views: number,
    isPublished: boolean
}

const videoSchema = new mongoose.Schema<IVideo>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

export const Video = mongoose.model('Video', videoSchema)