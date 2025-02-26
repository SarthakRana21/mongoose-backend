import {asyncHandler} from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import {User} from '../models/user.model'
import {uploadOnCloudidnary} from '../utils/cloudinary'
import {ApiResponse} from '../utils/ApiResponse'

const registerUser = asyncHandler(async (req, res)  => {

    const {username, email, fullName, avatar, coverImage, password} = req.body 
    const userFields = [username, email, fullName, avatar, coverImage, password]
    
    // if (userFields.some((item) => item?.trim() === "")) {
    //     throw new ApiError(400, "All fields are required")
    // }

    for (const item of userFields) {
        if (item?.trim() === "") {
            throw new ApiError(400, `${item} is a required field`);
        }
    }
    
    // const extestedUser = await User.findOne({
    //     $or: [ {username}, {email} ]
    // })

    const emailExist = await User.findOne({email: email})
    const usernameExist = await User.findOne({username: username})

    if (emailExist) throw new ApiError(400, "email must be unique")
    if (usernameExist) throw new ApiError(400, "Username must be unique")

    const files = req.files as {
        avatar?: Express.Multer.File[],
        coverImage?: Express.Multer.File[]
    }

    const avatarLocalPath = files.avatar?.[0]?.path || null;
    const coverImageLocalPath = files.coverImage?.[0]?.path || null;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Please upload avatar pic")
    }

    const avatarIMG = await uploadOnCloudidnary(avatarLocalPath)
    const coverImageIMG = await uploadOnCloudidnary(coverImageLocalPath)

    if (!avatarIMG) {
        throw new ApiError(400, "Please upload avatar pic")
    }

    const newUser = await User.create({
        username: username,
        email: email,
        fullName: fullName,
        avatar: avatarIMG.url,
        coverImage: coverImageIMG?.url || "",
        password: password,
    })

    const createdUser = User.findById(newUser._id).select("-password -refreshToken -watchHistory")

    if(!createdUser) throw new ApiError(500, "something went wrong while registering a user")



    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered successfully")
    )
})

export {registerUser}