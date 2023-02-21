
process.env.MONGO_URL="mongodb://localhost:27017";
const { getUser } = require("../../main/mongo/dao/UserDAO");
async function testGetUser(user)
{
    let val=await getUser(user.email);
    if(val!=null)
        console.log(val);
    else
        console.log("Doesn't Contails user");
}

testGetUser({"name":"Govardhan","email":"Govardhan@gmail.com","password":12345});

