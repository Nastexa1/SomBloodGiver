const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())
//connecting server
mongoose.connect("mongodb://localhost:27017/donner").then(()=>{
    console.log("database is successs")
}).catch((error)=>{
    console.log(error)
})

//api post
const donateModel = require("./model/donateModel")
const requastModel = require("./model/requastModel")
const contactModel = require("./model/contactModel")
app.post("/create", async (req,res)=>{
    const newData=new donateModel(req.body)
    const saveData=await newData.save()
     if(saveData){
        res.send("data has ben success")
    }

})

//get api
app.get("/get", async (req, res)=>{
    const getdata=await donateModel.find()
    res.send(getdata)
})
//put

app.put("/update/:id", async (req, res)=>{
    const updateData= await donateModel.updateOne( {_id: req.params.id}, {$set: req.body})
    if(updateData){
        res.send("data has been updated")
    }
})
app.put("/updateRequest/:id", async (req, res)=>{
    const updateData= await requastModel.updateOne( {_id: req.params.id}, {$set: req.body})
    if(updateData){
        res.send("data has been updated")
    }
})
//Requas api 
app.post("/createRequest", async (req,res)=>{
    const newData=new requastModel(req.body)
    const saveData=await newData.save()
     if(saveData){
        res.send("data has ben success")
    }

})
//get
app.get("/getRequests", async (req, res)=>{
    const getdata=await requastModel.find()
    res.send(getdata)
})
//reomve api
app.delete("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await requastModel.findByIdAndDelete(id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
});
//contact
app.post("/contact", async (req,res)=>{
    const newData=new contactModel(req.body)
    const saveData=await newData.save()
     if(saveData){
        res.send("data has ben success")
    }

})
app.get("/getContact", async (req, res)=>{
    const getdata=await contactModel.find()
    res.send(getdata)
})
// DELETE - Tirtir fariin ID ahaan
app.delete("/removecontact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await contactModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Fariinta waa la tirtiray" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message", error });
  }
});
// PUT - Update fariin ID ahaan
app.put("/put/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await contactModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating message", error });
  }
});


app.listen(3000,()=>{
    console.log("server ka wuu shaqena")
})