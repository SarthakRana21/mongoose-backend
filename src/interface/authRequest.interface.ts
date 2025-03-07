import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

interface AuthRequest extends Request {
    user?: JwtPayload
}

export {
    AuthRequest
}