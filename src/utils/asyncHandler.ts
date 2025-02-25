import { NextFunction, Request, Response } from "express"

const asyncHandler = (reqHandler: (req: Request, res: Response, next: NextFunction) => Promise<any>)  => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(reqHandler(req, res, next))
        .catch((err) => {
            next(err)
        })
    }
}
export {asyncHandler}



// const asyncHandler = () => {}
// const asyncHandler = (fn) => () => {}
// const asyncHandler = async (fn) => () => {}

// const asyncHandler = (fn) => async (req, res, next) => {
//  try {
//     await fn(req, res, next)
//  } catch (error) {
//     res.status(error.code || 500).json({
//         success: false,
//         message: error.message
//     })
//  }
// }