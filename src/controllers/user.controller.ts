import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { User } from '../models/user.model'
import { uploadOnCloudidnary } from '../utils/cloudinary'
import { ApiResponse } from '../utils/ApiResponse'
import fs from 'fs'
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

interface AuthRequest extends Request {
    user?: JwtPayload
}

const generateRefreshAndAccessTokens = async (userId: any) => {
    try {
        const user = await User.findById(userId)

        if(!user) throw new Error
        
        const accesstoken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user?.save({validateBeforeSave: false})

        return {refreshToken, accesstoken}

    } catch (error) {
        throw new ApiError(500, 'Error while generating Access and Refresh Tokens')
    }
}

const registerUser = asyncHandler(async (req, res)  => {

    const {username, email, fullName, password} = req.body 
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
            
            throw new ApiError(400, userExist.email == email ? "Email already registered": "Username must be unique");
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

const loginUser = asyncHandler(async (req, res) => {
    // take request from the user,
    // get username/email, password,
    // find the user/email,
    // validate the password using the User.methods
    // generate accesstoken, refreshToken and send to user
    // send secure cookies

    const {username, email, password} = req.body
    // console.log("username, email: ", req.body, req.headers)
    try {
        if (!username && !email) {
            throw new ApiError(400, "username or email is requried");
        }
        if (!password) throw new ApiError(400, "Password is required");

        const userExist = await User.findOne({
            $or: [
                {email}, {username}
            ]
        })

        if (!userExist) throw new ApiError(404, "User does not exist");

        const isPasswordValid = await userExist.isPasswordCorrect(password) 

        if(!isPasswordValid) throw new ApiError(401, "Incorrect Password, Please try again")

        const {refreshToken, accesstoken} = await generateRefreshAndAccessTokens(userExist._id)
        
        const updatedUser = await User.findById(userExist._id).select("-password -refreshToken").lean()

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
        .cookie("accessToken", accesstoken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {
                user: updatedUser, accesstoken, refreshToken
            }, "User logged in successfully")
        )

    } catch (error) {
        throw error
    }

})

const logOutUser = asyncHandler(async (req: AuthRequest, res) => {
    const user = req.user

    try {
        if(!user) throw new ApiError(401, "Invalid User")

        await User.findByIdAndUpdate(user._id, 
            {
                $set: {refreshToken: ""}
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {user: user}, "user logged out successfully")
        )
        
    } catch (error) {
        throw error
    }
})

const changeCurrentPassword = asyncHandler(async (req: AuthRequest, res) => {
    const {oldPassword, newPassword, confPassword} = req.body;

    try {
        const userId = req.user?._id
        const currentUser = await User.findById(userId)
        if(!currentUser) throw new ApiError(402, 'User not found')

        const isPasswordCorrect = await currentUser.isPasswordCorrect(oldPassword);
        if(!isPasswordCorrect) throw new ApiError(400, 'Incorrect Old password');

        currentUser.password = newPassword;
        await currentUser.save({validateBeforeSave: false})

        return res.status(200)
        .json(
            new ApiResponse(200, {}, 'Password Changed Successfully')
        )

    } catch (error) {
        throw error
    }

})

export {registerUser, loginUser, logOutUser}