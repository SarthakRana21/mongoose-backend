import {Router} from 'express';
import {
    registerUser, 
    loginUser, 
    logOutUser, 
    changeCurrentPassword,
    editUserDetails,
    deleteUser,
    updateUserAvatar
} from '../controllers/user.controller'
import {upload} from '../middlewares/multer.middleware'
import { verifyJWT } from '../middlewares/auth.middleware';

const userRouter = Router()

userRouter.route('/register').post(
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1
        },
        {
            name: 'coverImage',
            maxCount: 1
        }
    ]),
    registerUser
)

userRouter.route('/login').post(loginUser)


// secured routes
userRouter.route('/logout').post(
    verifyJWT, logOutUser
)

userRouter.route('/change-password').post(
    verifyJWT, changeCurrentPassword
)

userRouter.route('/edit-user-details').post(
    verifyJWT, editUserDetails
)

userRouter.route('/delete-user').post(
    verifyJWT, deleteUser
)

userRouter.route('/update-image').post(
    verifyJWT, 
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1
        },
        {
            name: 'coverImage',
            maxCount: 1
        }
    ]),
    updateUserAvatar
)

export default userRouter
