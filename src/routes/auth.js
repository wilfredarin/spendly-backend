import express from "express"
import  {isValidUserProfileData,isValidUserProfileUpdate}  from "../utils/validation.js";
import loadTags from "../utils/userTags.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userAuth from "../middleware/auth.js"
const router = express.Router();

router.post("/api/auth/register",async(req,res)=>{
    try{
        if(!isValidUserProfileData(req)){
            throw new Error("Invalid Data");
        }
        const {name,phone,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({name,email,phone,password:hashedPassword});
        user.userTags = loadTags;
        const data = await user.save();
        res.json({message:"User Added",data:data})
    }catch(err){
        res.status(400).json({
            message:"Error while registering, Error: "+err.message
        })
    }    
})


router.post("/api/auth/login",async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            throw new Error("Enter Email and Password")
        }
        
        const user = await User.findOne({email});
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            throw new Error("Invalid Creds!")
        }
        const token =  jwt.sign({_id:user._id},"SECRET");
        res.cookie("token",token);
        res.json({message:"Logged in succefully!",user})
    }catch(err){
        res.status(400).json({message:"login failed! Error:" + err.message})
    }
});

router.get("/api/auth/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.json(user);
    }catch(err){res.status(400).json({message:"Profile not found!",error:err})}
});

router.put("/api/auth/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        if(!isValidUserProfileUpdate(req)){
            throw new Error("Invalid Update Request")
        }
        const{password,name,phone} = req.body;
        if(password){
            user.password = await bcrypt.hash(password,10);
        }
        if(name){
            user.name = name
        }
        if(phone){
            user.phone = phone;
        }
        const data = await user.save();
        res.json({message:"user data updated",data});
    }catch(err){
        res.status(400).send(err.message);
    }
})

router.put("/api/auth/:action/tags",userAuth,async(req,res)=>{
    try{
        const user= req.user;
        const action = req.params.action;
        if (action!="add" && action!="remove"){
            console.log(action)
            throw new Error("Invalid Action")
        }
        if(action=="add"){
            req.body.data.forEach(i=>{
                if(! user.userTags.includes(i)){
                    user.userTags.push(i);
                }
            });
            
            
        }else{
            req.body.data.forEach(i=>{
                if(user.userTags.includes(i)){
                    user.userTags.remove(i);
                }
            }); 
        }
        const data = await user.save();
        res.json({message:"tags updated successfully!",data:data.userTags})
    }catch(err){
        res.status(400).json({message:"Error while updating tags ",erorr:err.message})
    }
    

})

export default router;