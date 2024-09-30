const express = require("express");
const route = express.Router();
const user=require("../models/user");
const { isAuth } = require("../authMiddleware");
const User = require("../models/user");

route.get("/buyer",(req, res) => {
    const user=req.user
    res.render("user/buyerProfile.ejs",{user})
})

route.get("/farmers",isAuth,(req, res) => {
    const user=req.user
    res.render("user/farmersProfile.ejs",{user})
})

route.get("/edit/:id",isAuth,async(req, res) => {
   const id=req.params.id;
   const user = await User.findById(id);
   res.render("user/editProfile.ejs",{user})
})

route.put("/farmer/:id",async(req,res)=>{
    let { username } = req.body;
    let id = req.params.id;
    let result = await User.findByIdAndUpdate(id, { username }, { new: true });
    // console.log(result)
        result.save();
    //     console.log("resukt",result)
        res.redirect("/farmers")
})

  

module.exports = route;