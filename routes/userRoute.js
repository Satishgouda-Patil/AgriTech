const express = require("express");
const User = require("../models/user");
const passport = require("passport");
const route = express.Router();

route.get("/register", (req, res) => {
    res.render("user/register.ejs");
});

route.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

route.post("/register", (async (req, res,) => {
    try {
        let {username, password,isFarmer} = req.body;
        if(username.trim()==0 || password.trim()==0) {
           throw new Error("white spaces are not considerd as password ");
        }
        isFarmer = (isFarmer === 'True');
        const newUser = new User({ username: username,isFarmer:isFarmer });
        console.log(newUser);
        await User.register(newUser, req.body.password);
        res.redirect("/auth/login");
    } catch (Error) {
        req.flash("err", "Something went wrong pls try again");
        res.redirect("/auth/register");
    }
}));

route.post("/login", passport.authenticate('local', {successRedirect: '/auth/suc',failureRedirect: '/auth/fail'}));

route.get("/suc", (req, res) => {
    req.flash("suc", "Logged in successfully");
    res.redirect("/listing");

});

route.get("/fail", (req, res) => {
    req.flash("err", "Password or Username was wrong");
    res.redirect("/auth/login");
});

module.exports = route;