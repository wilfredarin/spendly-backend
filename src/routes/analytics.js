import express from "express";
import userAuth from "../middleware/auth.js";
import User from "../models/user.js";
import Expense from "../models/expense.js";
import { getDates } from "../utils/getDates.js";
const router = express.Router();

router.get("/summary",userAuth,async(req,res)=>{
    try{ 
        const user = req.user;
        const strFormat = req.query.month;
        const dateFormat  = getDates(strFormat);
        
       
        const expense = await Expense.aggregate(
            [
                {
                    $match:{
                        date:{$gte:dateFormat[0],$lte:dateFormat[1]},
                        userId:user._id
                    }
                },
                {$unwind:"$tags"},
                
                {
                    $group:{
                    _id:"$tags",
                    totalExpenditure:{$sum:"$amount"}
                    }
                }
            ]
        );
        const totalExpenditure = await Expense.aggregate([
            {
                $match:{
                    date:{$gte:dateFormat[0],$lte:dateFormat[1]},
                    userId:user._id
                }
            },
            {$group:{
                _id:null,
                totalExpenditure:{$sum:"$amount"}
            
            }}
        ])
        return res.json({byTags:expense,totalExpenditure})
    }catch(err){
        res.status(400).json({message:"Something went wrong",data:err.message});
    }
});

router.get("/trends",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        const expense = await Expense.aggregate([
        
                {
                    $match:{
                        userId:user._id
                    }
                },
            {
              $project: {
                year: { $year: "$date" },   
                month: { $month: "$date" },
                amount: 1                  
              }
            },
            {
      
              $group: {
                _id: {
                  year: "$year",
                  month: "$month"
                },
                totalExpense: { $sum: "$amount" }
              }
            },
            {
              $sort: {
                "_id.year": 1,
                "_id.month": 1
              }
            }
          ]);
          res.json({expense});
    }catch(err){
        res.status(400).json({message:"Something went wrong",data:err.message});
    }
});






   

export default router;



