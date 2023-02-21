
process.env.MONGO_URL="mongodb://localhost:27017";
const { containsUser } = require("../../main/mongo/dao/UserDAO");
async function testContainsUser(user)
{
    let val=await containsUser(user.email);
    if(val)
        console.log("Contains user");
    else
        console.log("Doesn't Contails user");
}

testContainsUser({"name":"Govardhan","email":"Gsovardhan@gmail.com","password":12345});

