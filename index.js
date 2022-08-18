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
    console.log( greeting.nameStorage())
    console.log(greeting.numOfStoredNames())  
    res.render("index",  { 
        greeted : greeting.returningGreet(),
        counter : greeting.numOfStoredNames(),
        // warnings : greeting.returningWarning()
    }
    );
});

//Posting the data from html
app.post('/greetings', (req, res)=>{
    greeting.greetingUsers(req.body.name, req.body.language)
    // console.log(req.body.name, req.body.language)
    greeting.numOfStoredNames()
    greeting.storingNames(req.body.name)
    greeting.warningMessages(req.body.name, req.body.language)

    res.redirect("/");
});

app.get('/userInfo', (req, res)=>{

    res.render("userInfo", {
        nameStore: greeting.nameStorage(),
        amountGreeted: greeting.numOfStoredNames()
    });
});


//Starting the app on Port

const PORT = process.env.PORT || 2022;

app.listen(PORT, (req, res)=>{
    console.log("App Started Departing....");
});
