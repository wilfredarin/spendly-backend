export const isValidUserProfileData = (req)=>{
    const requiredFields = ["name","email","phone"]
    const userData = req.body;
    return requiredFields.every((e)=> e in userData)
}

export default  isValidUserProfileData;