const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");

const Registers = require("./models/registers")
const {json} = require("express");

const port = process.env.PORT || 3000;

//for going to public page enter this command 
//console.log(path.join(__dirname, "../public"))

const static_path = path.join(__dirname, "../public");

//now we will ask express that can we use this path (static_path)

app.use(express.static(static_path)); //now our public path is showing in localhost home page (because we have wriiten code in html file and it's present in public folder)
app.set("view engine", "hbs");
const template_path = path.join(__dirname, "../templates/views");
app.set("views", template_path);

const partials_path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
;
app.get("/", (req, res) => {
    //res.send("Hello I am Good");
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});

//create a new user in our database
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerEmployee = new Registers({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: password,
                confirmpassword: cpassword,
                gender: req.body.gender
            })
            
            const registered = await registerEmployee.save();
            res.status(201).render("index");
        }else{
            res.send("password are not matching")
        }

    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/login", (req, res) => {
    res.render("login");
});


app.listen(port, () => {
    console.log(`server is running at port no. ${port}`)
})