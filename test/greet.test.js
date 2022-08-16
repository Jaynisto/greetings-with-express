import assert from "assert";
import GreetingPeople from "../greet.js";

let greeting = GreetingPeople([]);

describe("Greeting The User With Different Languages: ", ()=>{
 it ("It Should be Able To Greet User With English", ()=>{
    const greeting = GreetingPeople([]);
    assert.equal("Hello, Fanie", greeting.greetingUsers("Fanie", "english"))
 })
});