
process.env.MONGO_URL="mongodb://localhost:27017";
const { updateUser} = require("../../main/mongo/dao/UserDAO");
async function testUpdateUser(user)
{
    let val=await updateUser(user.email,user);
    if(val)
        console.log("Update user");
    else
        console.log("Couldn't Update");
}

testUpdateUser({"name":"Govardhana reddy","age":77,"email":"Govardhan@gmail.com","password":123545});

