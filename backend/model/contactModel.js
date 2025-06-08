const mongoose=require("mongoose")
const contactSheme=mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Fariin:{
        type:String,
        required:true
    },

})
module.exports=mongoose.model("contact",contactSheme)
