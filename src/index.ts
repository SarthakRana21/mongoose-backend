import { config } from "dotenv";
import connectDB from "./db/db";
import {app} from "./app";
config({path: './.env'})

const port = process.env.PORT || 8000

connectDB()
.then(() => {
    
    app.on('error', (err) => {
        console.log('Error on App: ', err)  
        throw err  
    })
    
    app.listen(port, () => {
        console.log(`server is running on port: ${port}`)
    })
    
}) 
.catch((err) => {
    console.log("MongoDB Connection Failed xxx")
})






// import express from 'express';
// const app = express();


// ;( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         app.on('error', (error) => {
//             console.log("Error on App: ", error)
//             throw error
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`app is listing on PORT: ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error('Error connecting DB', error);
//         throw error;
//     }
// })