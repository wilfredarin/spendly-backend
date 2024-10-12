

export const getDates = (strDate)=>{
    try{
        const time = strDate;
        const dateTime = new Date(time);
        const year = dateTime.getFullYear()
        const month = dateTime.getMonth()
        const newDateStart = new Date(year, month, 0);
        const newDateEnd = new Date(year, month+1, 0);
        return [newDateStart,newDateEnd]
    }catch(err){
        return {isValid:false,message:err.message}
    }
}