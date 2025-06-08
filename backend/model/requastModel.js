const mongoose=require("mongoose")
const requestSheme=mongoose.Schema({
    patientName:{
        type:String,
        required:true
    },
    hospitalName:{
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
    why:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }

})
module.exports=mongoose.model("request",requestSheme)
