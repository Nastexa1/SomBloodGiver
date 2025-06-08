const mongoose=require("mongoose")
const donateSheme=mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    blood:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }

})
module.exports=mongoose.model("donate",donateSheme)
