const { addBooking, getCustomersBooking, getSellersBooking } = require("../mongo/dao/BookingDAO");


async function addBookingEndpoint(req,res)
{
    let result={data:[],success:false};

    
    try
    {
        if(res.locals.user==undefined)
            {
                result.data=null;
                result.success=false;
                result.message="Not Authorized";
            }
        else
            {  if(res.locals.user.role!="customer")
               {
                result.data=null;
                result.success=false;
                result.message="User must be an customer.";
               }
                else{
                    let bookingDetails={vehicleid:req.body.vehicleid,date:req.body.date,customeremail:res.locals.user.email}
                    console.log(bookingDetails);
                    let success= await addBooking(bookingDetails);
                    if(success)
                    {
                            result.success=true;
                            result.message="Succesfully Booked!!"

                    }
                    else
                    {
                            result.success=false;
                            result.message="Couldn't Book the vehicle."

                    }
            }
            }
        
    }
    catch(E)
    {
        console.log(E);
        result.success=false;
        result.message="Couldn't Book the vehicle."

    }
    res.json(result);


}

async function getCustomerBookingsEndpoint(req,res)
{

    let result={data:[],success:false};

    
    try
    {
        if(res.locals.user==undefined)
            {
                result.data=[];
                result.success=false;
                result.redirect=true;
                
            }
        else
            {  if(res.locals.user.role!="customer")
               {
                result.data=[];
                result.success=false;
                result.redirect=true;
                
               }
                else{

                    let data= await getCustomersBooking(res.locals.user.email);
                    result.success=true;
                    result.data=data;
            }
            }
        
    }
    catch(E)
    {
        console.log(E);
        result.success=false;
        result.data=[]

    }
    res.json(result);



}

async function getSellersBookingEndpoint(req,res)
{

    let result={data:[],success:false};

    
    try
    {
        if(res.locals.user==undefined)
            {
                result.data=[];
                result.success=false;
                result.redirect=true;
            }
        else
            {  if(res.locals.user.role!="seller")
               {
                result.data=[];
                result.success=false;
                result.redirect=true;
               }
                else{

                    let data= await getSellersBooking(res.locals.user.email);
                    result.success=true;
                    result.data=data;
            }
            }
        
    }
    catch(E)
    {
        console.log(E);
        result.success=false;
        result.data=[]

    }
    res.json(result);

}
module.exports={addBookingEndpoint,getCustomerBookingsEndpoint,getSellersBookingEndpoint};