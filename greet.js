module.exports = function GreetingPeople(){

    var greetingMessage;
    var arry = [];

    var greetedNames = {};

    function storingNames(usersName){
        if(greetedNames[usersName] === undefined){
            greetedNames[usersName] = 1;
        }
        else {
            greetedNames[usersName]++;
        }
    }

    function nameStorage(){
        return greetedNames;
    }

    function numOfStoredNames(){
        const lengthOfNames = Object.values(greetedNames);
        return lengthOfNames.length;
    }

    function personCounter(name){
        const nameCount = greetedNames[name];
        return nameCount;
    }

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
        } 
        return greetingMessage;
        
    }

    function warningMessages(usersName,language){
        if(!usersName){
            return "Please Enter Your Name.";
        }
        if(!language){
            return "Please Select A Language.";
        } 
        else if(!/^[a-zA-Z]+$/.test(usersName)){
            return "Invalid Name.";
        }  
    }

    return{
        greetingUsers,
        warningMessages,
        personCounter,
        numOfStoredNames,
        nameStorage,
        storingNames
    }

}