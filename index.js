const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const GreetingPeople = require("./greet");
const pgp = require('pg-promise')();

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


const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:Jnisto9801@localhost:5432/users"
const config ={  
    connectionString : DATABASE_URL
}
if(process.env.NODE_ENV == 'production'){
    config.ssl ={
        rejectUnauthorized: false
    }
}

const db = pgp(config);

const greetedUsersDb = GreetedUsersDb(db)

app.get('/', async(req, res)=>{   
    res.render("index",  { 
        greeted : greeting.returningGreet(),
        counter : await greetedUsersDb.getCount()
    }
    );
});

app.post('/greetings', async (req, res)=>{
    let warning = greeting.warningMessages(req.body.name, req.body.language)

    if(warning){
    req.flash('info', warning)
    }else{
    greeting.greetingUsers(req.body.name, req.body.language)
    await greetedUsersDb.getUser()
    await greetedUsersDb.storingNames(req.body.name)
    }

    res.redirect("/");
});

app.get('/userInfo', async (req, res)=>{
    let nameStored = await greetedUsersDb.getStoredNames()
    console.log(nameStored)
    res.render("userInfo", {
        nameStored,
    });
});

app.get('/counter/:names',async(req, res)=>{
    let user = req.params.names;
    let counter = await greetedUsersDb.getUser(user)
    res.render("counter",{user, counter});
    
});


const PORT = process.env.PORT || 2022;

app.listen(PORT, (req, res)=>{
    console.log("App Started localhost:2022");
});
