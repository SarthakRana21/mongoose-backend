import { config } from "dotenv";
import connectDB from "./db/index.js";

config({path: './env'})


connectDB()












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