
process.env.MONGO_URL="mongodb://localhost:27017";
const { addUser } = require("../../main/mongo/dao/UserDAO");
async function testAddUser(user)
{
    let val=await addUser(user);
    if(val)
        console.log("Added user");
    else
        console.log("Couldn't add user");
}

testAddUser({"name":"Govardhan","email":"govardhan@gmail.com","password":12345});

