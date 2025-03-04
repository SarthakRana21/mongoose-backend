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
import { getWatchHistory } from '../controllers/channel.controller';

const userRouter = Router()

// http://localhost:8000/api/v1/users/register
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

// http://localhost:8000/api/v1/users/login
userRouter.route('/login').post(loginUser)


// secured routes
// http://localhost:8000/api/v1/users/logout
userRouter.route('/logout').post(
    verifyJWT, logOutUser
)

// http://localhost:8000/api/v1/users/change-password
userRouter.route('/change-password').post(
    verifyJWT, changeCurrentPassword
)

// http://localhost:8000/api/v1/users/edit-user-details
userRouter.route('/edit-user-details').post(
    verifyJWT, editUserDetails
)

// http://localhost:8000/api/v1/users/delete-user
userRouter.route('/delete-user').post(
    verifyJWT, deleteUser
)

// http://localhost:8000/api/v1/users/update-image
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

// http://localhost:8000/api/v1/users/watch-history
userRouter.route('/watch-history').get(
    verifyJWT,
    getWatchHistory
)

export default userRouter
