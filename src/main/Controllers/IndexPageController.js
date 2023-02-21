const {Request,Response}=require('express');
const { getIndexCards } = require('../mongo/dao/ServicesDAO');


/**
 * Function that returns categories for the first page
 * @param {Request} req 
 * @param {Response} res 
 */
async function getIndexPageCardsEndpoint(req,res)
{   let result={data:[],success:false};
    let role = null;
    if(res.locals.user!=undefined)
        role=res.locals.user.role;
    if(role==null)
        role="default";
    console.log(role);
    try
    {
        let data=await getIndexCards(role);
        result["data"]=data;
        result["success"]=true;
    }
    catch(E)
    {
        console.log(E);

    }
    res.json(result);
}


module.exports={getIndexPageCardsEndpoint};