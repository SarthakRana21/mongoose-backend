import mongoose from 'mongoose'

interface IPlaylist {
    name: string,
    description: string,
    video: mongoose.Schema.Types.ObjectId[],
    owner: mongoose.Schema.Types.ObjectId
}

const playlistSchema = new mongoose.Schema<IPlaylist>(
    {
        name: {
            type: String,
            required: true
        },
        description: {
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

export const Playlist = mongoose.model<IPlaylist>("Playlist", playlistSchema)