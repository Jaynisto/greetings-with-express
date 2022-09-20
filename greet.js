module.exports = function GreetingPeople(){

    var greetingMessage;
    var arry = [];

    function greetingUsers(usersName, language){ 
        if(language !== null){
            if(language === "english"){
                greetingMessage = "Hello, " + usersName + ".";
            }
            if(language === "zulu"){
                greetingMessage = "Sawubona, " + usersName + ".";
            }
            if(language === "xhosa"){
                greetingMessage = "Molo, " + usersName + ".";
            } 
            if(language === null){
                greetingMessage = "Select mesage"
            }
        } 
        
    }

    function warningMessages(usersName,language){
        if(!usersName){
            return "Please Enter Your Name.";
        }
        else if(!/^[a-zA-Z]+$/.test(usersName)){
            return "Invalid Name.";
        }
        else if(language != undefined){
            arry.push(usersName);
        }else{
            return "Please Select a Language.";
        }   
    }

    function returningGreet(){
        return greetingMessage;
    }

    return{
        greetingUsers,
        returningGreet,
        warningMessages
    }

}


// var greetedNames = {};

// function storingNames(usersName){
    //     if(greetedNames[usersName] === undefined){
    //         greetedNames[usersName] = 1;
    //     }
    //     else {
    //         greetedNames[usersName]++;
    //     }
    // }

    // function nameStorage(){
    //     return greetedNames;
    // }

    // function numOfStoredNames(){
    //     /* convert an object greetedName into an array*/
    //     const lengthOfNames = Object.values(greetedNames);
    //     return lengthOfNames.length;
    // }

    // function personCounter(name){
    //     const nameCount = greetedNames[name];
    //     return nameCount;
    //  }
     /*
    - storing names
    - returning stored names.
    - count all the names.
    - return how many times a user is greeted
    - error messages function.
    
    */