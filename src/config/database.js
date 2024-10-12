import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()


export const connectToDb = async ()=>{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.f2nxohr.mongodb.net/Spendly`);
        console.log("Connected to Database");
    }

