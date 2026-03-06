import express from "express"

import session from "express-session"
const app=express()
app.set("view engine","ejs")
app.set("views","views")
app.use(express.urlencoded({extended:true}))
const users=[
    {id:1,name:"john",email:"john@gmail.com",password:"1234"},
     {id:2,name:"cathy",email:"cathy@gmail.com",password:"1234"}
]
app.use(session({
    secret:"secretkey",
    resave:false,
    saveUninitialized:false
}),
)
app.get("/",(req,res)=>{
    res.render("dashboard",{users})

})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",(req,res)=>{
    const{email,password}=req.body
    const user=users.find(user=>user.email===email && user.password===password)

    if(user){
        res.redirect("/")
    }else{
        res.render("login")
    }
})
app.listen(5000,()=>{
    console.log("sever started")
})