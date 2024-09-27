const express = require("express");
const route = express.Router();

route.get("/buyer",(req, res) => {
    res.render("user/buyerProfile.ejs")
})

route.get("/farmers",(req, res) => {
    res.render("user/farmersProfile.ejs")
})

module.exports = route;