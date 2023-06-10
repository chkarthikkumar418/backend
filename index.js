const express=require("express")
const app=express()
const products=require("./products")
const mongoose=require("mongoose")
const cors=require("cors")
const bodyParser=require("body-parser")
const Content=require("./schema")

console.log(Content)
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(bodyParser.json())

app.use(cors)
mongoose.connect("mongodb+srv://chkarthik:karthik184@cluster0.bypecbc.mongodb.net/firstdb?retryWrites=true&w=majority")
.then(()=>{
    console.log("Mongobd connected successfully")
})
.catch((err)=>{
    console.log(err)
})
app.post("/add",(req,res)=>{
    console.log("data from front end",req.body)
    const {name,passcode}=req.body
    const newData=new Content({
        name,passcode
    })
    newData.save()
    res.send("added")
})
app.get("/",(req,res)=>{
    res.send("server started successfully")
})

app.get("/retrieve",(req,res)=>{
    Content.find()
    .then(found=>res.json(found))
})

    

app.get("/products",(req,res)=>{
    res.json(products)
})

app.get("/name",(req,res)=>{
    res.send("hlo ")
})

app.listen(4000,()=>console.log("server is started"))