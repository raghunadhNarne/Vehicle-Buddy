
/**
 * function to retrieve index page cars according to role
 * @param {String} role 
 */

const {MongoClient}=require('mongodb');


async function getIndexCards(role)
{    let client=globalThis.mongoClient;
    try
    {
      //  await client.connect();
        let collection=client.db('vehicle_buddy').collection('index_cards');

        let result=await collection.findOne({role:role},{projection:{_id:0}});
        
        if(result!=null)
            return result.cards;
        else
            return null;


    }
    catch(E)
    {
        console.log(E);
        return null;
    }
    finally
    {
      //  await client.close();
    }


}

module.exports={getIndexCards}