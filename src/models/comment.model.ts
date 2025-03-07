import mongoose from 'mongoose'

interface IComment {
    content: string,
    video: mongoose.Schema.Types.ObjectId,
    owner: mongoose.Schema.Types.ObjectId
}

const commentSchema = new mongoose.Schema<IComment>(
    {
        content: {
            type: String,
            required: true
        },
        video: {
            type: mongoose.Types.ObjectId,
            ref: 'Video'
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    },
    {timestamps: true}
)

export const Comment = mongoose.model<IComment>("Comment", commentSchema)