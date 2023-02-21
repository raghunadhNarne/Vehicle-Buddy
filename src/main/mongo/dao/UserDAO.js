
const {MongoClient}=require('mongodb');


//Function to add user to database
async function addUser(user)
{    let client=globalThis.mongoClient;
    try
    {  // await client.connect();
        
        let collection=client.db('vehicle_buddy').collection('users');
        await collection.insertOne({"email":user.email.toLowerCase(),"name":user.name,"password":user.password,"role":user.role});
        //await client.close();
        return true;
    }
    catch(E)
    {
        console.log(E);
        //client.close();
        return false;
    }
    finally
    {
        //await client.close();
    }

}

//Function to updateUser
async function updateUser(email,user)
{    let client=globalThis.mongoClient;
    try
    {   //Existing editable properties
       // await client.connect();
        let validProperties=['name','password','location','dob','profilepic'];
        let filteredUser={};
        
        //Allow only specified properties to be set.
        for(let [key,value] of Object.entries(user))
            if(validProperties.indexOf(key)!=-1)
                filteredUser[key]=value;

        //await client.connect();

        let collection=client.db('vehicle_buddy').collection('users');

        let result=await collection.updateOne({'email':email.toLowerCase()},{$set:filteredUser});
        
       // await client.close();

        if(result.matchedCount==1)
            return true;
        else
            return false;
    }
    catch(E)
    {
        console.log(E);
        //client.close();
        return false;
    }
    finally
    {
      //  await client.close();
    }

}

async function containsUser(email)
{    let client=globalThis.mongoClient;
    try
    {
       // await client.connect();
        let collection=client.db('vehicle_buddy').collection('users');
        let result=collection.find({"email":email.toLowerCase()});
        let containsUser=false;
        
        if(await result.hasNext())
            containsUser=true;
        else
            containsUser=false;
        
        await result.close();
       

        return containsUser;
    }
    catch(E)
    {
        console.log(E);
       
        return false;
    }
    finally
    {
      //  await client.close();
    }

}

async function getUser(email)
{
    let client=globalThis.mongoClient;
    try
    {   
       //await client.connect();
        let collection=client.db('vehicle_buddy').collection('users');
        let result=await collection.findOne({"email":email.toLowerCase()});
        
        //await client.close();
        return result;
    }
    catch(E)
    {
        console.log(E);
        //client.close();
        return null;
    }
    finally
    {
        //await client.close();
    }


}

module.exports={addUser,getUser,updateUser,containsUser};