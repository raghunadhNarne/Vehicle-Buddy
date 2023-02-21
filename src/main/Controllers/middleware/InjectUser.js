const { getUser } = require("../../mongo/dao/UserDAO");
let jwt = require('jsonwebtoken');

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
async function injectUser(req,res,next)
{
    if(req.cookies.token!=null)
        {   
            let token = req.cookies.token;
            let {email,name,role} = jwt.decode(token);
            // let {email,name,password,role}=JSON.parse(req.cookies.user);
            // user=await getUser(email)
            try{
                if(jwt.verify(token,process.env.JWT_SECRET_KEY))
                {
                    console.log(email,"verified successfully");
                    res.locals.user={"email":email,"name":name,"role":role};
                    next();
                    return;
                }
            }
            catch
            {

            }
        }
    next();
}

module.exports={injectUser}