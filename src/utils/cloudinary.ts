import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudidnary = async (localFilePath: string) => {
    try {
        if (!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log('File uploaded successfully: ', response.url);
        return response
    } catch (error) {
        // removes the locally saved temporary file as the operation failed
        fs.unlinkSync(localFilePath)

        console.error("Error uploading to Cloudinary: ", error)
    }
}

export default uploadOnCloudidnary