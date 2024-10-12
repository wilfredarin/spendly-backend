import express from "express"
import  isValidUserProfileData  from "../utils/validation.js";
import loadTags from "../utils/userTags.js";
import User from "../models/user.js";
const router = express.Router();

router.post("/api/auth/register",async(req,res)=>{
    try{
        if(!isValidUserProfileData(req)){
            throw new Error("Invalid Data");
        }
        const {name,phone,email} = req.body;
        const user = new User({name,email,phone});
        user.userTags = loadTags;
        const data = await user.save();
        res.json({message:"User Added",data:data})
    }catch(err){
        res.status(400).json({
            message:"Error while registering, Error: "+err.message
        })
    }    
})

export default router;