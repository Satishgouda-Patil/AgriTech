const express=require("express")
const route=express.Router()
const app= express();

route.get("/AgriSupport",(req,res)=>{
    res.render("AgriSupport/show.ejs")
})
route.get("/AgriVision",(req,res)=>{
    res.render("AgriSupport/showVision.ejs")
})
module.exports=route;