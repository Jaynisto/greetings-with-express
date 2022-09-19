module.exports = function GreetedUsersDb(db){
    const greetings = async(name)=>{
        let output = await greetedNames(name)
        if(output === false){
            await db.none('INSERT INTO Greeted_Users(userName,greetedCount) VALUES ($1, $2);',[name,1])
        }
        else{
            const counter = await db.oneOrNode('SELECT greetedCount FROM Greeted_Users WHERE userName = $1',[name])
            await db.none('UPDATE Greeted_Users SET greetedCount = greetedCount + 1 WHERE userName = $1', [name])
        }

    }

    // Checking if the user is greeted

    const greetedNames = async (name)=>{
        const output = await db.oneOrNone('SELECT userName FROM Greeted_Users WHERE userName = $1', [name])
        return output !== null
    }

    // Getting all greeted names in the table
    const getNames = async()=>{
        const output = await db.manyOrNone('SELECT * FROM Greed_Users')
        return output;
    }

    // Counting how many times a user is being greeted .//////////////
    const gettingUserCount = async(counter)=>{
        const output = await db.one('SELECT greetedCount(*) FROM Greeted_Users')
        return output.greetedCount
    }

    // Get count for all users
    const getUserCount = async()=>{
        const output = await db.one('SELECT greetedCount(*) FROM Greeted_Users')
        return output.greetedCount
    }

    // CLEARING NAMES
    const clearingNames = async()=>{
        await db.none('DELETE FROM Greeted_Users')
    }

    return{
        greetings,
        greetedNames,
        getNames,
        gettingUserCount,
        getUserCount,
        clearingNames
    }
    


}