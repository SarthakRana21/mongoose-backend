import mongoose from 'mongoose'

interface IComment {
    name: string,
    video: mongoose.Schema.Types.ObjectId[],
    owner: mongoose.Schema.Types.ObjectId
}

const commentSchema = new mongoose.Schema<IComment>(
    {
        name: {
            type: String,
            required: true
        },
        video: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Video'
            }
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {timestamps: true}
)

export const Comment = mongoose.model<IComment>("Comment", commentSchema)