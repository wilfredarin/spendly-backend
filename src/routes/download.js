import pdfkit from "pdfkit";
import fs from "fs";
import express from "express";
import userAuth from "../middleware/auth.js";
import { getDates } from "../utils/getDates.js";
import Expense from "../models/expense.js";
const router = express.Router();

router.get('/:month',async(req,res)=>{
    try{
        // const user = req.user;
        const dateFormat = getDates(req.params.month);
        const expenses = await Expense.find({
            userId:"670ad42bb182e424ed616ed3",
            date:{$gte:dateFormat[0],$lte:dateFormat[1]}
        });

        const doc = new pdfkit();
        const fileName = `expenses_${req.params.month}_spendly.pdf`;
        const filePath = `../downloads/${fileName}`;
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);

        doc.fontSize(16).
            text(`Spendly Expenses for ${dateFormat[0]} to ${dateFormat[1]}`,
                {align:"center"}
            );

        expenses.forEach(expense=>{
            doc.moveDown().
            fontSize(12).
            text(`Amount: ${expense.amount}`);
            doc.text(`Comment: ${expense.comment}`);
            doc.text(`Tags: ${expense.tags.join(" ,")}`);
            doc.text(`Date: ${expense.date.toDateString()}`);
        });

        await doc.end();


        await doc.on('finish',function(){
            res.download(filePath, fileName, function(err) {
                if (err) {
                  console.log(err);
                } else {
                  fs.unlinkSync(filePath);
                }
              });
        });
        
    }catch(err){
        res.json({error:err.message,message:"failed to download"})
    }
});




export default router;