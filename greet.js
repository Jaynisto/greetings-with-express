export default function GreetingPeople(usersName){

    var greetingMessage;
    var userNamesArray = [];
    function insertedName(usersName, language){
        if(usersName === ""){
            return
        }
        if(userNamesArray.includes(usersName)){
            return
        }
        if(language === null){
            return
        }
        userNamesArray.push(usersName);
    }

    function greetingUsers(usersName, language){
        if(usersName === " "){
            greetingMessage = "Please Enter Your Name On The Text Field.";
        }
        
        if(language === "english"){
            greetingMessage = "Hello, " + usersName;
        }
        if(language === "zulu"){
            greetingMessage = "Sawubona, " + usersName;
        }
        if(language === "xhosa"){
            greetingMessage = "Molo, " + usersName;
        }
        
        else {
            greetingMessage = "Please Select A Language Of Your Choice."
        }
    }

    function returningGreet(){
        return greetingMessage;
    }





return{
    insertedName,
    greetingUsers,
    userNamesArray,
    returningGreet

}

}