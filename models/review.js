const mongoose=require("mongoose")
const schema=mongoose.Schema;
const reviewSchema=new schema({
    // by:{
    //     type:schema.Types.ObjectId,
    //     ref: "User",
    //   },
    message:String,
    // revOwner:{
    //     type: schema.Types.ObjectId,
    //     ref:"User",
    // }
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;