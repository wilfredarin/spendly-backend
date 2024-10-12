export const userTags=[
    "self",
    "family",
    "important",
    "unnecesary",
    "friend",
    "medical",
    "food",
    "groceries",
    "rent",
    "entertainment",
    "education",
    "travel",
    "shopping",
    "charity",
    "savings",
    "debt_repayment",
    "miscellaneous",
];

export const filterTags = (user,tags)=>{
    const userTags = user.userTags;
    let takenTags = [];
    if (tags){
        tags.forEach(element => {
            if(userTags.includes(element.toLowerCase())){
                if(!takenTags.includes(element.toLowerCase())){
                    takenTags.push(element.toLowerCase());
                }   
            }
        });
    }
    return takenTags;
}
