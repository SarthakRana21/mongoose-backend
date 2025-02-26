import {asyncHandler} from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import {User} from '../models/user.model'

const registerUser = asyncHandler(async (req, res)  => {

    const {username, email, fullName, avatar, coverImage, password} = req.body 
    const userFields = [username, email, fullName, avatar, coverImage, password]
    
    if (userFields.some((item) => item?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const extestedUser = await User.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if (extestedUser) {
        throw new ApiError(400, "Username and email must be unique")
    }

    const files = req.files as {
        avatar?: Express.Multer.File[],
        coverImage?: Express.Multer.File[]
    }

    const avatarLocalPath = files.avatar?.[0]?.path || null;
    const coverImageLocalPath = files.coverImage?.[0]?.path || null;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Please upload avatar pic")
    }

    res.status(200).json({
        message: "ok",
        data: "meow"
    })
})

export {registerUser}