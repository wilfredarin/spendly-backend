import Expense from "../models/expense.js";
import User from "../models/user.js";
import userAuth from "../middleware/auth.js";
import express from "express";
import {userTags,filterTags} from "../utils/userTags.js"
import {isValidExpenseData} from "../utils/validation.js"
import { getDates } from "../utils/getDates.js";
const router = express.Router();

router.post("/",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        if(!isValidExpenseData(req)){
            throw new Error("Invaid Expense Data")
        }
        const {amount,comment,date,tags} = req.body;
        const userId = user._id; 
        const allowedTags = userTags;
        let takenTags = filterTags(req.user,tags);
        const expense = new Expense({amount,comment,tags:takenTags,userId});
        if(date){
            expense.date = date;
        }
        const data = await expense.save();
        res.json({message:"expense added successfully",data})
    }catch(err){
        res.status(400).json({message:"failed to add expsense",error:err.message});
    }
});

router.get("/",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        const strFormat = req.query.month;
        const dateFormat = getDates(strFormat)
        const expense = await Expense.find({userId:user._id,date:{$gt:dateFormat[0],$lt:dateFormat[1]}});
        if(expense.length==0){
            return res.status(404).json({message:"No Expense found"});
        }
        res.send(expense)
    }catch(err){
        res.status(400).json({message:"failed to get expsense",error:err.message});
    }
})

router.put("/:expenseId",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        const expenseId = req.params.expenseId;
        const expense = await Expense.findOne({_id:expenseId,userId:user._id});
        if(!expense){
            return res.status(404).json({message:"Expense not found!"})
        }
        const {amount,tags,comment,date} = req.body;
        if(amount){
            expense.amount = amount;
        }
        if(tags){
            expense.tags = filterTags(req.user,tags);
        }
        if(date){
            expense.date = date;
        }
        if(comment){
            expense.comment = comment;
        }
        const data = await expense.save();
        res.json({message:"Expense updated successfuly",data});
    }catch(err){
        res.status(400).json({message:"failed to update expsense",error:err.message});
    }
});


router.delete("/api/expense/:expenseId",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        const expenseId = req.params.expenseId;
        const expense = await Expense.findOne({_id:expenseId,userId:user._id});
        if(!expense){
            return res.status(404).json({message:"Expense not found!"})
        }
        const data = await Expense.deleteOne({ _id: expenseId });
        res.json({message:"Expense deleted successfuly",data});
    }catch(err){
        res.status(400).json({message:"failed to delete expsense",error:err.message});
    }
});


export default router;