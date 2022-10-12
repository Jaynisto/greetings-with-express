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

    it('should pass the db test', async function(){
        
        // the Factory Function is called CategoryService
        let database = dbManipulation(db);
        await database.storingNames("Jack");

        const checkName = await database.getStoredNames();
        const getObject = checkName[0];        
        assert.equal("Jack", getObject.username)
    });

    it('should pass the db test', async function(){
        
        // the Factory Function is called CategoryService
        let database = dbManipulation(db);
        await database.storingNames("Jack");
        await database.storingNames("Jack");

        const getNameCount = await database.getUser("Jack");
        const getObject = getNameCount[0];        
        assert.equal(2, getObject.greetecount)
    });


    

    after(function(){
        db.$pool.end
    })
})