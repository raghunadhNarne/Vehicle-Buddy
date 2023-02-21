const {MongoClient}=require('mongodb');

async function getStates(state)
{ 
    let client=globalThis.mongoClient;
    
    try{
            //await   client.connect();
           
            let collection=client.db('vehicle_buddy').collection('autocomplete_states');
            let result=collection.aggregate([{$group:{_id:"$state"}},{$project:{_id:1}}]);
            let stateArray=[]
            while(await result.hasNext())
                stateArray.push((await result.next())._id);
            await result.close();
            return stateArray;

        }
    catch(E)
    {   
        console.log(E);
    }
    finally
    {
       // await client.close();
    }
    return null
}

async function getCities(state)
{    let client=globalThis.mongoClient;

    try{
        //await client.connect();
       
        let collection=client.db('vehicle_buddy').collection('autocomplete_states');
        let cursor=collection.find({state:{'$regex' : `^${state}$`, '$options' : 'i'}},{projection:{_id:0,city:1}});
        let result=[]
        while(await cursor.hasNext())
            {   
                result.push((await cursor.next()).city)
            }
        
        
        if(result!=null)
        return result;

    }
    catch(E)
    {   console.log(E)
      
    }
    finally
    {
       // client.close();
    }
    return null
}

async function getLocations(search)
{    let client=globalThis.mongoClient;
    try{
        
        //await client.connect();
        let collection=client.db('vehicle_buddy').collection('autocomplete_states');
        let result=collection.find({location:{'$regex' : `${search}`, '$options' : 'i'}},{projection:{_id:0,location:1}});
        let locations=[]
        while(await result.hasNext())
            locations.push((await result.next()).location);
       
        if(result!=null)
        return locations;

    }
    catch(E)
    {   console.log(E)
        
    }
    finally
    {
        //await client.close();
    }
    return null
}

async function getCarTypes(search)
{    let client=globalThis.mongoClient;
    try{
        
       // await client.connect();
        let collection=client.db('vehicle_buddy').collection('autocomplete_cars');
        let result=collection.find({name:{'$regex' : `${search}`, '$options' : 'i'}},{projection:{_id:0,name:1}});
        let cars=[]
        while(await result.hasNext())
            cars.push((await result.next()).name);
       
        if(result!=null)
        return cars;

    }
    catch(E)
    {   console.log(E)
        
    }
    finally
    {
        //await client.close();
    }
    return null
}

module.exports={getStates,getCities,getLocations,getCarTypes};