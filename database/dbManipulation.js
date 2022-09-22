module.exports = function GreetedUsersDb(db){
    async function storingNames(name){
        const insertingTheName = await db.any('SELECT * FROM greeted_users WHERE username = $1;', [name])
        if(insertingTheName.length === 0){
            await db.any('INSERT INTO greeted_users (username,greetedcount) VALUES ($1,$2);',[name,1])
        }
        else{
            await db.any('UPDATE greeted_users SET username=$1, greetedcount=greetedcount + 1 WHERE username = $1;', [name])
        }
    }

    async function getStoredNames(){
        const gettingNamesFromTable = await db.any('SELECT username FROM greeted_users;')
        return gettingNamesFromTable;
    }

    async function getCount(){
        const gettingNamesFromTable = await db.any('SELECT * FROM greeted_users;')
        return gettingNamesFromTable.length;
    }

    async function getUser(name){
        const gettingNamesFromTable = await db.any('SELECT greetedcount FROM greeted_users WHERE username = $1;', [name])
        return gettingNamesFromTable;
    }

    async function deleteData(){
        const gettingNamesFromTable = await db.any('DELETE FROM greeted_users;')
        return gettingNamesFromTable;
    }

    
    return{
        storingNames,
        getStoredNames,
        getCount,
        getUser,
        deleteData
    }
}