const { Request,Response } = require("express");
const { getStates, getCities, getLocations, getCarTypes } = require("../mongo/dao/AutocompleteDAO");

/**
 * Function to get states
 * @param {Request} req 
 * @param {Response} res 
 */
async function getStatesAutoCompleteEndpoint(req,res)
{   let result={}
    try
    {
        result.data=await getStates();
        result.success=true;
    }
    catch(E)
    {
        result.data=null;
        result.success=false;

    }
    res.json(result);
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function getCitiesAutoCompleteEndpoint(req,res)
{   let result={};

    try
    {   if(req.params.state == undefined)
            {   
                result.data=null;
                result.success=false;
            }
        else
        {   
            result.data=await getCities(req.params.state);
            result.success=true;
         }


    }
    catch(E)
    {
        console.log(E);
        result.success=false;
        result.data=null;
    }

    res.json(result);


}

/**
 * Function used for select location
 * @param {Request} req 
 * @param {Response} res 
 */
async function getLocationsAutoCompleteEndpoint(req,res)
{   let result={}
    try
    {   if(req.query.location==undefined)
        {
            result.data=[];
            result.success=false;
        }
        else
        {
            let locations=await getLocations(req.query.location);
            result.data=locations;
            result.success=true;
        }
        
    }
    catch(E)
    {   result.data=null;
        result.success=false;
        console.log(E);

    }
    res.json(result);
}

/**
 * Function used for select location
 * @param {Request} req 
 * @param {Response} res 
 */
async function getCarTypesAutoCompleteEndpoint(req,res)
{   let result={}
    try
    {   if(req.query.carname==undefined)
        {
            result.data=[];
            result.success=false;
        }
        else
        {
            let cars=await getCarTypes(req.query.carname);
            result.data=cars;
            result.success=true;
        }
        
    }
    catch(E)
    {   result.data=null;
        result.success=false;
        console.log(E);

    }
    res.json(result);
}

module.exports={getStatesAutoCompleteEndpoint,getCitiesAutoCompleteEndpoint,getLocationsAutoCompleteEndpoint,getCarTypesAutoCompleteEndpoint};
