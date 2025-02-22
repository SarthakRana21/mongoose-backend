import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    id: string,
    watchHistory: mongoose.Schema.Types.ObjectId[],
    username: string,
    email: string,
    fullName: string,
    avatar: string,
    coverImage: string,
    password: string,
    refreshToken: string,
}

const userSchema = new mongoose.Schema<IUser>({
    id: {
        type: String,
        required: true,
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    }
}, {timestamps: true})

export const User = mongoose.model('User', userSchema)