import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
    watchHistory: mongoose.Schema.Types.ObjectId[],
    username: string,
    email: string,
    fullName: string,
    avatar: string,
    coverImage?: string,
    password: string,
    refreshToken: string,
}

const userSchema = new mongoose.Schema<IUser>({
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // Cloudinary URL
        required: true
    },
    coverImage: {
        type: String, // Cloudinary URL
    },
    password: {
        type: String, // encrypted
        required: [true, 'Password is Required']
    },
    refreshToken: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true})

export const User = mongoose.model('User', userSchema)