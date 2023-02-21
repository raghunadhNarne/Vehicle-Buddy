async function alerting(data)
{   
   let {role,email,name,password}=data;
   Swal.fire({
        title:"Loading",
        showConfirmButton:false,
        allowOutsideClick:false
        ,
        allowEscapeKey:false
        ,
        showLoaderOnConfirm: true,
        preConfirm:  () => {
          return $.ajax({method:'POST',url:'/user/',contentType:'application/json',data:JSON.stringify({role:role,email:email,name:name,password:password})}).then((response)=>{
            
              let respone=response
              if(respone.success)
              {
                Swal.fire({
                  icon: 'success',
                  title: 'Yahooo!!!',
                  text: respone.message,
                  showConfirmButton: false, 
                  allowOutsideClick: false, 
                  timer:5200
                  
                });
                setTimeout(()=>window.location.replace('/'),2000);
                return ;
              }
            else
            {
              Swal.fire({
                icon: 'error',
                title:  "Oops, seems we got a problem.",
                text: respone.message,
        
                
              });
            }

           }).
          catch(e=>
            {             console.log(e);
              Swal.fire({
                icon: 'error',
                title: "Seems there is an error",
                text: "Internal error/Problem with the Network"
                
              });;});;},});
      setTimeout(()=>Swal.clickConfirm(),5);
 
       
}
//This page doesn't have doAjax
//This page doesn't have doRender
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
    let name=$("#name").val();
    let repassword=$("#repassword").val();
    let role=$("#role").val();
    console.log(name);
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
        return;

    }
    if(password!=repassword)
    {
        Swal.fire({
            icon: 'error',
            title: 'Passwords do not match.',
            text: 'Minimum characters are 3 for a password.',
            
          });
          return;
    }
    
   alerting({email:email,role:role,name:name,password:password});
}
async function  doRegisterListener()
{
    $('#signUp').on('click',buttonClicked);

}

PageTemplate(undefined ,undefined,doRegisterListener,undefined);