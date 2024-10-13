import nodemailer from "nodemailer";



export const sendEmailNotification = async (email,title,body) => {
  try{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });
    let mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        html: body,
        subject: title,
    };
    // Send mail with defined transport object
    let result = await transporter.sendMail(mailOptions);
    console.log(`Success: Email sent to ${email}`);
    }catch(error){
            console.log(error);        
    }
  };

