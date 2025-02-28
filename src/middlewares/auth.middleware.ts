import { Request } from "express";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: JwtPayload
}

export const verifyJWT = asyncHandler(async (req: AuthRequest, res, next) => {
    
    try {
        const accesToken = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
    
        if(!accesToken) throw new ApiError(401, "Unauthorized Request")
    
        const decodedToken = jwt.verify(accesToken, accessTokenSecret) as JwtPayload
    
        const currentUser = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!currentUser) throw new ApiError(401, "Invalid Access Token")
        
        req.user = currentUser
    
        next();
        
    } catch (error) {
        throw new ApiError(401, `${error}`)
    }

})