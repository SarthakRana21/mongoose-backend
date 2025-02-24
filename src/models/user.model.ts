import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ms from 'ms';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY as ms.StringValue || '1d'
if(!accessTokenSecret) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables");
}

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string
const refreshTokenExpriry = process.env.REFRESH_TOKEN_EXPIRY as ms.StringValue || '5d';
if(!refreshTokenSecret) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined in environment variables");
}

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


userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.isPasswordCorrect = async function(password: string) {
    return await bcrypt.compare(password, this.password)
} 

userSchema.methods.generateAccessToken = function(): string {
    const payload = {
        _id: this._id.toString(),
        email: this.email,
        username: this.username,
        fullName: this.fullName
    }

    return jwt.sign(
        payload,
        accessTokenSecret,
        {
            expiresIn: accessTokenExpiry
        }
    )
}
userSchema.methods.generateRefreshToken = async function() {
    return jwt.sign(
        {
            _id: this._id
        },
        refreshTokenSecret,
        {
            expiresIn: refreshTokenExpriry
        }
    )
}

export const User = mongoose.model('User', userSchema)