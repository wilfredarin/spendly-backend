export const isValidUserProfileData = (req)=>{
    const requiredFields = ["name","email","phone","password"]
    const userData = req.body;
    return requiredFields.every((e)=> e in userData)
}

export const isValidUserProfileUpdate = (req)=>{
    const allowedUpdate = ["name","phone","password"]
    const userData = req.body;
    const a =  Object.keys(userData).every(k=>allowedUpdate.includes(k));
    return a;
}

export const isValidExpenseData = (req)=>{
    const reqFields = ["amount","comment"]
    return reqFields.every(e=>Object.keys(req.body).includes(e));
}