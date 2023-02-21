const {Request,Response}=require('express');
const { containsUser, addUser, getUser,updateUser } = require('../mongo/dao/UserDAO');
const { validateEmail } = require('../Util/Utility');



/**
 * Endpoint to add the user
 * @param {Request} req 
 * @param {Response} res 
 */
async function addUserEndpoint(req,res)
{   let result={success:false,redirect:false,message:""};
    let user=req.body;
    try
    {   //If the email isn't speciefed or invalid email.
        if(user.email==undefined||user.email==null||!validateEmail(user.email))
        {
            result.success=false;
            result.message="Invalid Email";
            
        }
        else
        {   //Check whether user present or not
            if(user.name==undefined||user.password==undefined||user.name.length<3||user.password.length<3)
            {
                result.success=false;
                result.message="Password and Name must have minimum length of 3."   
            }
            else{
                if(await containsUser(user.email))
                {
                    result.success=false;
                    result.message="User Already present with email."
                }
                else
                {
                    await addUser(user);
                    user=await getUser(user.email);
                    result.success=true;
                    res.cookie('user',JSON.stringify({name:user.name,email:user.email,password:user.password,role:user.role}),{maxAge:1000*60*60*10});
                    result.message="Succesfully signed up user.";

                }
            }

        }

    }
    catch(E)
    {   result.success=false;
        result.message="A fatal Occured.";
        console.log(E);
    }
    res.json(result);
}


/**
 * Function to get the user
 * @param {Request} req 
 * @param {Response} res 
 */
async function getUserEndpoint(req,res)
{   
    let result={data:{},message:"",success:false,redirect:false};
    try{
        //Get user from params
        let email=req.params.email;
        if(await containsUser(email))
        {
            result["data"]=await getUser(email);
            result["success"]=true;
            result["message"]="Succesfully fetched user";
            
        }
        else
        {
            result["data"]=undefined;
            result["message"]="Couldn't Find User.";
            result["success"]=false;
            
        }

    }
    catch(E)
    {
        console.log(E);
        result["success"]=false;
        result["message"]="A fatal error occured";

    }
    res.json(result);


    
}



/**
 * Function to update user.
 * @param {Request} req 
 * @param {Response} res 
 */
async function updateUserEndpoint(req,res)
{   
    let result={message:"",success:false,redirect:false};
    try{
        //Get user from params
        let user=req.body;
        if(await containsUser(user.email))
        {
            if(await updateUser(user.email,user))
            {
                result["success"]=true;
                result["message"]="Succesfully Updated user";
            }
            else
            {
                result["success"]=false;
                result["message"]="Couldn't Update user";

            }
            
        }
        else
        {
            result["data"]=undefined;
            result["message"]="Couldn't Find User.";
            result["success"]=false;
        }

    }
    catch(E)
    {
        console.log(E);
        result["success"]=false;
        result["message"]="A fatal error occured";

    }
    res.json(result);

}



module.exports={addUserEndpoint,getUserEndpoint,updateUserEndpoint};