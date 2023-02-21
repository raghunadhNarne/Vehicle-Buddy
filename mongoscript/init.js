const fs=require('fs');
//db=connect('mongodb+srv://govardhan:12345@myatlasclusteredu.j0ekrwe.mongodb.net/?retryWrites=true&w=majority')
let landingPageCards=[
            {
                role:"default",
                cards:[
            {
                "card-description": "Rent Vehicles in your location. Renting just takes a minute or two. ",
                "card-icon": "fa-car",
                "card-name": "Rent a car",
                "card-href":"/signin.html"
                    
            },

            {
                "card-description": "Have a car lying around in your house? Then lease your car to many of the people wanting it.",
                "card-icon": "fa-inr",
                "card-name": "Lease Your Car.",
                "card-href":"/signin.html"
            }
            ,
            {
                "card-description": "24/7 , always open for service. Operate all across india. ",
                "card-icon": "fa-clock",
                "card-name": "We're always here",
                "card-href":"/signin.html"
            

            },
            
        ]
        },
        {
            role:"customer",
            cards:[
        {
            "card-name": "My Bookings",
            "card-icon": "fa-book",
            "card-description": "Your upcoming and previous vehicle bookings",
            "card-href":"/mybookings.html"
                
        },

        {
            "card-description": "Rent Vehicles in your location. Renting just takes a minute or two. ",
            "card-icon": "fa-car",
            "card-name": "Rent a car",
            "card-href":"/booknow.html"
        }

    ]
    },
    {
        role:"seller",
        cards:[
    {
        "card-description": "Your vehicles put up for lease",
        "card-icon": "fa-car",
        "card-name": "My Vehicles",
        "card-href":"/myvehicles.html"
            
    },

    {
        "card-name": "My Revenue",
        "card-icon": "fa-inr",
        "card-description": "Total Income made for this account",
        "card-href":"/myrevenue.html"
    },
    {
        "card-description": "Add a new vehicle to lease out.",
        "card-icon": "fa-plus",
        "card-name": "Add Vehicle",
        "card-href":"/addvehicle.html"
    

    }

]
},

];
let statesAndCountires=JSON.parse(fs.readFileSync(__dirname+'/data/india.json',{encoding:'utf-8'}));
let curDb=db.getSiblingDB('vehicle_buddy');


let indexCardCollection=curDb.getCollection('index_cards');
indexCardCollection.insertMany(landingPageCards);


let autocomplete_states=[];
for(let [k,v] of Object.entries(statesAndCountires))
    {   for(let city of v)
        {
            autocomplete_states.push({state:k,city:city,location:`${city}, ${k}`});
        }
    }
let cars=JSON.parse(fs.readFileSync(__dirname+'/data/cars.json',{encoding:'utf-8'}));
cars=cars.cars;
let autocomplete_cars=[];
for(let x of cars)
{
    autocomplete_cars.push({model:x.model,brand:x.brand,name:`${x.model}, ${x.brand}`});
}

let statesCollection=curDb.getCollection('autocomplete_states');
let carsCollection=curDb.getCollection('autocomplete_cars');
statesCollection.insertMany(autocomplete_states);
statesCollection.createIndex({state:1,city:1});
statesCollection.createIndex({location:1});
carsCollection.insertMany(autocomplete_cars);
carsCollection.createIndex({brand:1,model:1});
carsCollection.createIndex({name:1});

let bookingCollection=curDb.getCollection("bookings");
bookingCollection.createIndex({vehicleid:1,bookingdate:1},{unique:true});
