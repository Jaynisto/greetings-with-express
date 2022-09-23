const assert = require("assert");
const GreetingPeople = require("../greet.js");

// let greeting = GreetingPeople([]);

describe("Greeting The User With Different Languages: ", ()=>{
 it ("It Should be Able To Greet User With English.", ()=>{
    let greeting = GreetingPeople([]);
    assert.equal("Hello, Fanie.", greeting.greetingUsers("Fanie", "english"))
   })
   it ("It Should be Able To Greet User With isiZulu", ()=>{
      let greeting = GreetingPeople([]);
      assert.equal("Sawubona, Fanie.", greeting.greetingUsers("Fanie", "zulu"))
     })
     it ("It Should be Able To Greet User With isiXhosa.", ()=>{
      let greeting = GreetingPeople([]);
      assert.equal("Molo, Fanie.", greeting.greetingUsers("Fanie", "xhosa"))
     })
});

describe("Warning The User When The Name Or Language is Not Entered:", ()=>{
   it("It Should Be Able To Tell The User To Enter Their Names When Not Entered.", ()=>{
      let greeting = GreetingPeople([]);
      assert.equal("Please Enter Your Name.", greeting.warningMessages("","english"))
   })
   it("It Should Be Able To Tell The User To Select A Language When Not Selected.", ()=>{
      let greeting = GreetingPeople([]);
      assert.equal("Please Select A Language", greeting.warningMessages("Fanie"," "))
   }) 
   it("It Should Be Able To Tell The User To Write Valid Charecters On The TextField.", ()=>{
      let greeting = GreetingPeople([]);
      assert.equal("Invalid Name", greeting.warningMessages("0l/","english"))
   })
});