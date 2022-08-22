export default function GreetingPeople(){

    var greetingMessage;
    var warningMessage;
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
        /* convert an object greetedName into an array*/
        const lengthOfNames = Object.values(greetedNames);
        return lengthOfNames.length;
    }

    
     function personCounter(name){
        const nameCount = greetedNames[name];
        return nameCount;
     }

    /*
    - storing names
    - returning stored names.
    - count all the names.
    - return how many times a user is greeted
    - error messages function.
    
    */

    function greetingUsers(usersName, language){ 
        // if(usersName === ""){
        //     warningMessage = "Please Type on the TextField provided";
        // }
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
        // else {
        //     greetingMessage = "Please Select A Language Of Your Choice."
        // }  
    
        
        }

        function warningMessages(usersName,language){
            let warningMessage = "";
            if(usersName === "" && language == null){
                warningMessage = "Please Select A Name And Language";
            }
            else if(usersName == ""){
                warningMessage = "Please Enter Your Name";
            }
            else if(language == null){
                warningMessage == "Please select a language"

            }
        }



    function returningGreet(){
        return greetingMessage;
    }
    function returningWarning(){
        return warningMessage;
    }





return{
    storingNames,
    greetingUsers,
    returningGreet,
    nameStorage,
    numOfStoredNames,
    warningMessages,
    returningWarning,
    personCounter
}

}