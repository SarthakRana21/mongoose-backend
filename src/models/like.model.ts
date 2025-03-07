import mongoose from 'mongoose'

interface ILike {
    video: mongoose.Schema.Types.ObjectId,
    comment: mongoose.Schema.Types.ObjectId,
    likedBy: mongoose.Schema.Types.ObjectId
}

const likeSchema = new mongoose.Schema<ILike>(
    {
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        },
        likedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {timestamps: true}
)

export const Like = mongoose.model<ILike>("Like", likeSchema)