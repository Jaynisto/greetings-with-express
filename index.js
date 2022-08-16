import bodyParser from "body-parser";
import express from "express";
import exphbs from "express-handlebars";
import GreetingPeople from "./greet.js";

let app = express();

//Instance of the factory function
let greeting = GreetingPeople([]);



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
app.get('/', (req, res)=>{   
    res.render("index",  { greeted : greeting.returningGreet()});
});

//Posting the data from html
app.post('/greetings', (req, res)=>{
    greeting.greetingUsers(req.body.name, req.body.language)
    console.log(req.body.name, req.body.language)
    res.redirect("/");
})

//Starting the app on Port

const PORT = process.env.PORT || 2022;

app.listen(PORT, (req, res)=>{
    console.log("App Started Departing....");
});
