async function signOut()
{   console.log("SigningOut");
    try{

    let data=await $.ajax({method:'GET',url:'/user/auth/logout'});
    if(data.success)
    {
        Swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: false, 
            allowOutsideClick: false, 
            timer:2200
          });
    }
    else
    {
        Swal.fire({
            icon: 'error',
            title: data.message,
            showConfirmButton: false, 
            allowOutsideClick: false, 
            timer:2200
            
          });
    }
    setTimeout(()=>window.location.replace('/'),2000);
    }
    catch(E)
    {
        console.log("ERROR  "+E);
    }
}

async function doRenderNav()
{   let data=await $.ajax({method:"GET",url:'/user/auth/loggedin'});
    let signInButton=$("#signIn");
    let signOutButton=$("#signOut");
    if($('#navbar')==undefined)
        return;
    let user=data.data;
    console.log("GOT USER",data);
    if(data.success)
        {
            signInButton.addClass('d-none');
            console.log(user.name);


            if(user.role=='seller')
                $('ul').first().prepend('<li><a href="myvehicles.html">My Vehicles</a></li><li><a href="myrevenue.html">My Revenue</a></li>');
             else
                if(user.role=='customer'||user.role==undefined)
                    $('ul').first().prepend('<li><a href="booknow.html">Book Now</a></li><li><a href="mybookings.html">My Bookings</a></li>');
            
            console.log(signOutButton.filter('span').first())
            //signOutButton.filter('span').first().text(user.username);

            signOutButton=signOutButton.get(0);
            signOutButton.querySelector('span').innerText=user.name;
            signOutButton.querySelector('span').style.fontWeight="bolder";
            signOutButton.querySelector('span').style.color="white";
            signOutButton.classList.remove('d-none');
            $("#signOut").children().children().last().on('click',signOut);
            
        }
       // let dropDownUser=$('#signOut').filter('a');
        //let signOut=dropDownUser[dropDownUser.length-1];
        
}


/**
 * This template is used for every page.
 * @param {Function} doAjaxRequest 
 * @param {Function} doRenderPage 
 * @param {Function} doRegisterListener 
 * @param {Function} doHook 
 */
async function PageTemplate(doAjaxRequest,doRenderPage,doRegisterListener,doHook)
{   let data={};
    try{
    //Do AJAX REQUEST IF REQUIRED
    if(doAjaxRequest!=undefined)
        data=await doAjaxRequest();

    //IF REDIRECT  REQUIRED RETURN TO HOME PAGE
    if(data['redirectlocation']){
        window.location.replace(`/${data['redirectlocation']}`);
        return;
    }
    if(data['redirect'])
    {
        window.location.replace('/');
        return;
    }
    doRenderNav(data);
    //If RENDER PAGE REQUIRED RENDER THE PAGE.
    if(doRenderPage!=undefined)
        await doRenderPage(data);

    //IF LISTENERS NEED TO BE REGISTER , DO THAT
    if(doRegisterListener!=undefined)
        await doRegisterListener(data);

    //IF ADDITIONAL HOOKS ARE THERE, DO IT
    if(doHook!=undefined)
        await doHook(data);
    }
    catch(E)
    {
        console.log(E);
    }
    finally
    {
    //This event used in main.js to remove loader
    console.log("Dispached Event");
    window.dispatchEvent(new CustomEvent('preloaderend'));
    }
    
}