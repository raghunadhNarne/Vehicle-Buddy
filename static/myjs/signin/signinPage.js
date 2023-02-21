async function alerting(data)
{   
   
   Swal.fire({
        title:"Loading",
        showConfirmButton:false,
        allowEscapeKey:false,
        allowOutsideClick:false
        ,
        showLoaderOnConfirm: true,
        preConfirm:  () => {
          return $.ajax({method:'POST',url:'/user/auth/login',contentType:'application/json',data:JSON.stringify({email:data.email,password:data.password})}).then((response)=>
            {
            
              let respone=response
              if(response.success)
              {
                Swal.fire({
                  icon: 'success',
                  title: 'Yahooo!!!',
                  text: response.message,
                  showConfirmButton: false, 
                  allowOutsideClick: false, 
                  timer:5000
                  
                });
                setTimeout(()=>window.location.replace('/'),2000);
                return;
              }
                else
                { console.log(respone.message)
                  Swal.fire({
                    icon: respone.message.indexOf("find")!=-1? 'question':'error',
                    title:  respone.message.indexOf("find")!=-1? "Do you have an account bro?":"Seems like you forgot the password",
                    text: respone.message,
            
                    
                  });


                }

              

                
        
            }


          ) .
          catch(e=>
            {             console.log(e);
              Swal.fire({
                icon: 'error',
                title: "Seems there is an error",
                text: "Internal error/Problem with the Network"
                
              });;});;},});
      setTimeout(()=>Swal.clickConfirm(),5);
 
       
}
//doAjaxRequest ->Not required for page currently
//doRenderPage ->Not required for page currently.
function validateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true);
  }
   
    return (false);
}

async function buttonClicked(e)
{
    let email=$("#email").val();
    let password=$("#password").val();

    if(!validateEmail(email))
    {
        Swal.fire({
            icon: 'error',
            title: 'Not a valid email',
            text: 'Please enter a valid email.',
            
          });
          return
    }

    if(password.length<3)
    {
        Swal.fire({
            icon: 'error',
            title: 'Password too short.',
            text: 'Minimum characters are 3 for a password.',
            
          });

    }

    alerting({email:email,password:password});
 

}
async function  doRegisterListener()
{
    $('#signIn').on('click',buttonClicked);

}

PageTemplate(undefined ,undefined,doRegisterListener,undefined);