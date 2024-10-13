// import dotenv from "dotenv"
// dotenv.config()
import express from "express"
import cookieParser from "cookie-parser";
import { connectToDb } from "./config/database.js";


import authRouter from "./routes/auth.js"
import expenseRouter from "./routes/expense.js"
import analyticsRouter from "./routes/analytics.js"
import downloadRouter from "./routes/download.js"
const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth/",authRouter)
app.use("/api/expense/",expenseRouter)
app.use("/api/analytics/",analyticsRouter)
app.use("/api/download/",downloadRouter )
app.use("/",(req,res)=>{
    res.send("err")});



app.listen(3000,async (req,res)=>{
    try{
        await connectToDb();
        console.log("Server listeneing at PORT 3000");


        
    }catch(err){
        console.log("Error:"+err.message);
    }
});

