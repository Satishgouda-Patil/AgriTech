
const express=require("express")
const route=express.Router()
const app= express();
// const isAuth=require("../authMiddleware.js").isAuth;
// const wrapasync=require("../util/wrapasync.js")
const Review=require("../models/review.js")
const listing=require("../models/listing.js")

route.post("/:id/review",async (req,res)=>{
    let id=req.params.id;
    let review=req.body.Review;
    let newReview=new Review(review)
    // console.log("",newReview)
    // newReview.by=req.user._id;y
    // newReview.revOwner=req.user;
    // console.log("",newReview)
    const listResult = await listing.findById(id)
    listResult.reviews.push(newReview)
    // console.log("result\n",listResult)
    // console.log("",newReview)
    await newReview.save();
    await listResult.save();
    res.redirect(`/listing/${id}`)
})
route.delete("/:id/review/:id1",async (req,res)=>{
    let id=req.params.id;
    let {id1}=req.params;
    let result=await Review.findByIdAndDelete(id1);
    res.redirect(`/listing/${id}`)
})
// route.delete("/:id/review/:id1",isAuth,wrapasync(async (req,res)=>{
//     let id=req.params.id;
//     let {id1}=req.params;
//     let result=await Review.findByIdAndDelete(id1);
//     req.flash("suc","A new review deleted successfully")
//     res.redirect(`/listing/${id}`)
// }))

// app.all("*",(req,res,next)=>{
//     next(new expressError(404,"page not found"))
// })

// app.use((err,req,res,next)=>{
//     let {statusCode=500,message="don't no"}=err;
//     res.status(statusCode).render("listing/error.ejs",{err})
// })

module.exports = route;
