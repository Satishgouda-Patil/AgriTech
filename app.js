const express=require("express");
const app=express();
const mongoose=require("mongoose")
const path=require("path")
const ejs=require("ejs")
const methodOverride=require("method-override")
const ejsMate = require('ejs-mate');
let dataInit=require("./init/list.js")
const listing=require("./models/listing.js")
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash=require("connect-flash");
const passport = require("passport");
const User = require("./models/user.js");
const {isAuth}=require("./authMiddleware.js");
// const route = express.Router();
// const wrapasync = require("./util/wrapasync.js");

app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine","ejs")
app.set("views" ,path.join(__dirname,"views") )
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join((__dirname,"/public"))))
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate);
app.use(express.static(path.join((__dirname,"/public"))))
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use(express.json())

// using flash
app.use(flash())

app.use((req, res, next) => {
    res.locals.sucMsg=req.flash("suc")
    res.locals.errMsg=req.flash("err")
    res.locals.isLogin=req.isAuthenticated()
    res.locals.currentUser=req.user;
    next();
})

let mongoUrl="mongodb://127.0.0.1:27017/AgriTech";

let main=async ()=>{
    await mongoose.connect(mongoUrl)
}

main().then(()=>{
    console.log("conntected to db")
}).catch((error)=>{
    console.log(error)
})

const listingRoute=require("./routes/listingRoute.js");
const reviewRoute=require("./routes/reviewRoute.js");
const userRoute=require("./routes/userRoute.js");
const profileRoute=require("./routes/profileRoute.js");

// app.get('/testing',async (req,res)=>{
//     await listing.deleteMany({})
//     let newData=dataInit.map(data=>({ ...data, ownerId:'66f5705af0b2c8fd5e0c095f'}))
//     console.log(newData)    
//     await listing.insertMany(newData)
//     res.send("hi");
// })
app.use("/listing",listingRoute)
app.use("/listing",reviewRoute)
app.use("/auth",userRoute)
app.use("",profileRoute)
app.listen(3000,(req,res)=>{
    console.log("listing..");
})