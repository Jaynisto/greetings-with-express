const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const GreetingPeople = require("./greet");
const db = require("./database/db.js")
const GreetedUsersDb = require("./database/dbManipulation.js");

let app = express();

let greeting = GreetingPeople([]);

app.use(session({
    secret : 'codeforgeek',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

const handlebarSetup = exphbs.engine({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


const greetedUsersDb = GreetedUsersDb(db)

app.get('/', async(req, res)=>{   
    res.render("index",  { 
        greeted : greeting.greetingUsers(req.body.name, req.body.language),
        counter : await greetedUsersDb.getCount()
    }
    );
});

app.post('/greetings', async (req, res)=>{
    let warning = greeting.warningMessages(req.body.name, req.body.language)

    if(warning){
    req.flash('info', warning)
    }
    else{
    greeting.greetingUsers(req.body.name, req.body.language)
    await greetedUsersDb.getCount()
    await greetedUsersDb.storingNames(req.body.name)
    }

    res.redirect("/");
});

app.get('/userInfo', async (req, res)=>{
    let nameStored = await greetedUsersDb.getStoredNames()
    // console.log(nameStored)
    res.render("userInfo", {
        nameStored,
    });
});

app.get('/counter/:names',async(req, res)=>{
    let user = req.params.names;
    let counter = await greetedUsersDb.getUser(user)
    console.log(counter)
    res.render("counter",{user, counter});
    
});

app.post('/clearing', async function(req,res){
    await greetedUsersDb.deleteData()
    res.redirect('/')
    })


const PORT = process.env.PORT || 2022;

app.listen(PORT, (req, res)=>{
    console.log("App Started on " + PORT);
});
