const {MongoClient, ObjectId}=require('mongodb');

async function addVehicle(vehicle,sellermail)
{
    let client=globalThis.mongoClient;//new MongoClient(process.env.MONGO_URL);
    try
    {   
        //await client.connect();

        console.log("vehicle",vehicle.pic,vehicle.fullmodel);
        let collection=client.db('vehicle_buddy').collection('vehicles');
        let {location,model,vehicleprice,pic}=vehicle;
        let [modelName,brand]=model.split(',');
        let [city,state]=location.split(',');
        city=city.trim();
        state=state.trim();
        modelName=modelName.trim();
        brand=brand.trim();
        await collection.insertOne({"selleremail":sellermail,location:location,vehicleprice:vehicleprice,pic:pic,model:modelName,brand:brand,fullmodel:model,city:city,state:state});
    
        return true;
    }
    catch(E)
    {
        console.log(E);
       
        return false;
    }
    finally
    {
        //await client.close();
    }


}

async function getVehicles(email)
{
    let client=globalThis.mongoClient;
    try
    {           //await client.connect();

        let collection=client.db('vehicle_buddy').collection('vehicles');
        let query={};
        
        if(email!=undefined)
            query["selleremail"]=email;

        let cursor= collection.find(query);
        let results=[];
        while(await cursor.hasNext())
            {
                results.push(await cursor.next());
            }
        return results;
    }
    catch(E)
    {
        console.log(E);
        
        return [];
    }
    finally
    {
       // await client.close();
    }

}


async function getVehicle(id)
{
    let client=globalThis.mongoClient;
    try
    {   
        //await client.connect();
        
        let collection=client.db('vehicle_buddy').collection('vehicles');
        //console.log(id,id.length)
        console.log("HERE",id);
        if(id == undefined|| id.length!=24)
            return null;
        let objectId=new ObjectId(id);
        let cursor= await collection.findOne({_id:objectId});
        
        //Retrieving the bookings of vehicle
        let bookingCollection=client.db('vehicle_buddy').collection('bookings');
        let bookings=[];
        let bookingsCursor=bookingCollection.find({vehicleid:id},{projection:{date:{ $dateToString: { format: "%Y-%m-%d", date: "$bookingdate" } }}});
        while(await bookingsCursor.hasNext())
        {   
            bookings.push((await bookingsCursor.next()).date);
        }

        cursor.bookings=bookings;
        return cursor;
    }
    catch(E)
    {
        console.log(E);
        
        return null;
    }
    finally
    {
        //await client.close();
    }

}



async function updateVehicle(vehicle)
{
    let client=globalThis.mongoClient;;
    try
    {   
        //await client.connect();
        let collection=client.db('vehicle_buddy').collection('vehicles');
        let {location,model,vehicleprice,profilepic}=vehicle;
        if(vehicle.id == undefined || model == undefined || location == undefined || vehicleprice == undefined || profilepic == undefined)
            return false;
        let [modelName,brand]=model.split(',');
        let [city,state]=location.split(',');
        city=city.trim();
        state=state.trim();
        modelName=modelName.trim();
        brand=brand.trim();
        let id = new ObjectId(vehicle.id);
        let count = await collection.updateOne({_id:id},{$set:{location:location,vehicleprice:vehicleprice,pic:profilepic,model:modelName,brand:brand,fullmodel:model,city:city,state:state}});
        if(count.matchedCount==0)
            return false;
        
        return true;
    }
    catch(E)
    {
        console.log(E);
      
        return false;
    }
    finally
    {
        //await client.close();
    }


}


module.exports={addVehicle,getVehicles,getVehicle, updateVehicle};