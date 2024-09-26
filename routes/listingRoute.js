const express=require("express")
const route=express.Router()
const app= express();
const listing=require("../models/listing")



route.get("", async function(req, res,next){
    let data=await listing.find({});
    // console.log(data);
    res.render("listing/index.ejs",{data})
   }
 )
//new listing
route.get("/new",(req,res,next)=>{
    res.render("listing/new.ejs")
})

route.post("",(
    async (req,res,next)=>{
    let list=req.body.listing;
    let newData=new listing(list)
    newData.owner="satish"
    // console.log(newData)
    await newData.save()
    res.redirect("/listing")
  })
 )
 //on click of card

 route.get("/:id",async (req,res)=>{
    let {id}=req.params;
    const result=await listing.findById(id).populate("reviews")
    // console.log(result);
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