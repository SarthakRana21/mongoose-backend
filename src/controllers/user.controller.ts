import {asyncHandler} from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import {User} from '../models/user.model'
import {uploadOnCloudidnary} from '../utils/cloudinary'
import {ApiResponse} from '../utils/ApiResponse'
import fs from 'fs'

const registerUser = asyncHandler(async (req, res)  => {

    const {username, email, fullName, avatar, coverImage, password} = req.body 
    const userFields = [username, email, fullName, password]

    const files = req.files as {
        avatar?: Express.Multer.File[],
        coverImage?: Express.Multer.File[]
    }

    const avatarLocalPath = files.avatar?.[0]?.path || null;
    const coverImageLocalPath = files.coverImage?.[0]?.path || null;
    
    try {
        if (userFields.some((item) => !item || item?.trim() === "")) {
            throw new ApiError(400, "All fields are required")
        }
        
        const userExist = await User.findOne({
            $or: [
                {email}, {username}
            ]
        })
    
        if(userExist) {
            
            throw new ApiError(400, userExist.email == email ? "Email must be unique": "Username must be unique");
        }
    
        if (!avatarLocalPath) {
            throw new ApiError(400, "Please upload avatar pic")
        }
    
        const avatarIMG = await uploadOnCloudidnary(avatarLocalPath)
        const coverImageIMG = await uploadOnCloudidnary(coverImageLocalPath)
    
        if (!avatarIMG) {
            throw new ApiError(500, "Cloudinary upload issue")
        }
    
        const newUser = await User.create({
            username: username,
            email: email,
            fullName: fullName,
            avatar: avatarIMG.url,
            coverImage: coverImageIMG?.url || "",
            password: password,
        })
    
        const createdUser = await User.findById(newUser._id).select("-password -refreshToken -watchHistory").lean()
    
        if(!createdUser) throw new ApiError(500, "something went wrong while registering a user")
    
    
        return res.status(201).json(
            new ApiResponse(200, createdUser, "User Registered successfully")
        )

    } catch (error) {
        if (avatarLocalPath) fs.unlinkSync(avatarLocalPath)
        if (coverImageLocalPath) fs.unlinkSync(coverImageLocalPath)
            
        throw error
    }
})

export {registerUser}