const express=require("express")
const route=express.Router()
const app= express();
const listing=require("../models/listing");
const { isAuth } = require("../authMiddleware");



route.get("", async function(req, res,next){
    let data=await listing.find({});
    res.render("listing/index.ejs",{data})
   }
 )
//new listing
route.get("/new",isAuth,(req,res,next)=>{
    if(req.user.isFarmer){
       return res.render("listing/new.ejs")
    }
    req.flash("err", "you dont have access");
    res.redirect("/listing")
})

route.post("",(
    async (req,res,next)=>{
    let list=req.body.listing;
    let newData=new listing(list)
    newData.owner=req.user.username
    newData.ownerId=req.user._id
    await newData.save()
    res.redirect("/listing")
  })
 )
 //on click of card

 route.get("/:id",isAuth,async (req,res)=>{
    let {id}=req.params;
    const result=await listing.findById(id).populate("reviews")
    res.render("listing/show.ejs",{result})
    }

 )

 route.get("/:id/edit",async (req,res)=>{
        let {id}=req.params;
        const result=await listing.findById(id);
        res.render("listing/edit.ejs",{result})
        }
    )

route.put("/:id",async(req,res)=>{
    let {id}=req.params;
    let result=await listing.findByIdAndUpdate(id,{...req.body.listing});
        result.save();
    res.redirect("/listing")
    }
)

route.get("/:id/delete",async (req,res)=>{
    let {id}=req.params;
    let listResult=await listing.findById(id);
    await listing.findByIdAndDelete(id,{...req.body.listing});
    res.redirect("/listing")
    }
)

 module.exports = route;