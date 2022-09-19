const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const GreetingPeople = require("./greet");
const db = require("./database/db.js");
const GreetedUsersDb = require("./database/dbManipulation.js")(db);


let app = express();
//Instance of the factory function
let greeting = GreetingPeople([]);
// Express session
app.use(session({
    secret : 'codeforgeek',
    resave: true,
    saveUninitialized: true
}));

// initialize the flash middleware
app.use(flash());

//Configuring handlebars

const handlebarSetup = exphbs.engine({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static("public"));

//Configuring Body-parser to enable data to be read on the html form
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// Rendering the index handlebar.
app.get('/', async(req, res)=>{   
    res.render("index",  { 
        greeted : greeting.returningGreet(),
        counter : await GreetedUsersDb.getUserCount(),
    }
    );
});

//Posting the data from html
app.post('/greetings', async (req, res)=>{
    let warning = greeting.warningMessages(req.body.name, req.body.language)

    if(warning){
    req.flash('info', warning)
    }else{
    greeting.greetingUsers(req.body.name, req.body.language)
    greeting.numOfStoredNames()
    await GreetedUsersDb.greetings(re.body.name)
    // greeting.storingNames(req.body.name)
    }

    res.redirect("/");
});

app.get('/userInfo', async (req, res)=>{
    let names = await GreetedUsersDb.getNames();
    console.log(names)
    res.render("userInfo", {
        names,
    });
});

app.get('/counter/:names',async(req, res)=>{
    let user = req.params.names;
    let counter = await GreetedUsersDb.gettingUserCount(user);
    // console.log(counter + " Times");
    res.render("counter",{user, counter});
    
});





//Starting the app on Port

const PORT = process.env.PORT || 2022;

app.listen(PORT, (req, res)=>{
    console.log("App Started localhost:2022");
});
