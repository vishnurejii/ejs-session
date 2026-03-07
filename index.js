import express from "express"
import session from "express-session"
import expressEjsLayouts from "express-ejs-layouts"

const app = express()

app.set("view engine","ejs")
app.use(expressEjsLayouts)
app.set("views","views")
app.set("layout","layout")

app.use(express.urlencoded({extended:true}))

const users=[
 {id:1,name:"john",email:"john@gmail.com",password:"1234"},
 {id:2,name:"cathy",email:"cathy@gmail.com",password:"1234"}
]

app.use(session({
    secret:"secretkey",
    resave:false,
    saveUninitialized:false
}))

app.use((req,res,next)=>{
    res.locals.user = req.session.user
    next()
})

app.get("/",(req,res)=>{
    if(req.session.user){
        res.render("dashboard",{users})
    }else{
        res.redirect("/login")
    }
})

app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/logout",(req,res)=>{
    req.session.destroy()
    res.redirect("/logiin")
})

app.post("/login",(req,res)=>{
    const {email,password}=req.body
    const user = users.find(
        user=>user.email===email && user.password===password
    )

    if(user){
        req.session.user = user
        res.redirect("/")
    }else{
        res.render("login")
    }
})

app.listen(5000,()=>{
    console.log("server started")
})