import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()


export const connectToDb = async ()=>{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database");
    }

