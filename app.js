const express=require("express");
const app=express();
const mongoose=require("mongoose")
const path=require("path")
const ejs=require("ejs")
const methodOverride=require("method-override")
const ejsMate = require('ejs-mate');
let dataInit=require("./init/list.js")
const listing=require("./models/listing.js")
// const session=require("express-session");
// const flash=require("connect-flash");
// const passport = require("passport");
// const User = require("./models/user.js");
// const route = express.Router();
// const wrapasync = require("./util/wrapasync.js");


app.set("view engine","ejs")
app.set("views" ,path.join(__dirname,"views") )
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join((__dirname,"/public"))))
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate);
app.use(express.static(path.join((__dirname,"/public"))))
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use(express.json())

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

// app.get('/testing',async (req,res)=>{
//     await listing.deleteMany({})
//     let newData=dataInit.map(data=>({ ...data, owner:"satish"}))
//     await listing.insertMany(newData)
//     res.send("hi");
// })

app.use("/listing",listingRoute)
app.use("/listing",reviewRoute)

app.listen(3000,(req,res)=>{
    console.log("listing..");
})