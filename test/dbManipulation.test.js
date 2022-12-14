const assert = require('assert');
const dbManipulation = require('../database/dbManipulation');
const pgp = require('pg-promise')();

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:Jnisto9801@localhost:5432/my_tests";

const db = pgp(connectionString);

describe('The basic database web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        try {
            // clean the tables before each test run
            await db.none('TRUNCATE TABLE Greeted_Users RESTART IDENTITY CASCADE;');
        } catch (err) {
            console.log(err);
            throw err;
        }
    });

    it('Should be able to store user names.', async function(){
        
        // the Factory Function is called CategoryService
        let database = dbManipulation(db);
        await database.storingNames("Jack");

        const checkName = await database.getStoredNames();
        const getObject = checkName[0];        
        assert.equal("Jack", getObject.username)
    });

    it('Should return the number of how many time a user is being greeted.', async function(){
        
        // the Factory Function is called CategoryService
        let database = dbManipulation(db);
        await database.storingNames("Jack");
        await database.storingNames("Jack");

        const getNameCount = await database.getUser("Jack");      
        assert.equal("2", getNameCount)
    });

    it('Should return the amount of the names stored.', async function(){
        
        // the Factory Function is called CategoryService
        let database = dbManipulation(db);
        await database.storingNames("Jack");
        await database.storingNames("Nana");

        const getNames = await database.getCount();      
        assert.equal("2", getNames)
    });

    it('Should be able to clear the names of the users.', async function(){
        
        // the Factory Function is called CategoryService
        let database = dbManipulation(db);
        await database.storingNames("Jack");
        await database.storingNames("Nana");
        await database.deleteData();

        const clearNames = await database.getCount();       
        assert.equal("0", clearNames)
    });


    

    after(function(){
        db.$pool.end
    })
})