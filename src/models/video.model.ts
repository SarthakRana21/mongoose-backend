import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

interface IVideo {
    videoFile: string,
    thumbnail: string,
    owner: mongoose.Schema.Types.ObjectId,
    title: string,
    description?: string,
    duration: number,
    views: number,
    isPublished: boolean
}

const videoSchema = new mongoose.Schema<IVideo>({
    videoFile: {
        type: String, // Cloudinary URl
        required: true
    },
    thumbnail: {
        type: String, // Cloudinary Url
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
        type: Number, // Cloudinary timestamps
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model<IVideo>('Video', videoSchema)