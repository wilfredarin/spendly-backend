import { compare } from "bcrypt";
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true,
        lowercase:true
    },
    tags:{
        type:[String],
        lowercase:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    }
},{
    timestamps:true
}) 

const Expense = mongoose.model("Expense",expenseSchema);
export default Expense;