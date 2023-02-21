async function alerting(data)
{   
   let {profilepic,email,name,dob,location}=data;
   Swal.fire({
        title:"Loading",
        allowEscapeKey:false,
        showConfirmButton:false,
        allowOutsideClick:false
        ,
        showLoaderOnConfirm: true,
        preConfirm:  () => {
          return  $.ajax({method:'PUT',url:'/user/',data:JSON.stringify({profilepic:profilepic,email:email,name:name,dob:dob,location:location}),contentType:'application/json'}).then((response)=>{
            
              let respone=response
              if(respone.success)
              {
                Swal.fire({
                  icon: 'success',
                  title: respone.message,
                  
                  showConfirmButton: false, 
                  allowOutsideClick: false, 
                  timer:5200
                  
                });
                setTimeout(()=>window.location.replace('/profile.html'),2000);
                return ;
              }
            else
            {
              Swal.fire({
                icon: 'error',
                
                title: respone.message,
        
                
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
async function doAjaxRequest()
{
    let data=await $.ajax({method:'GET',url:'/user/auth/loggedin'});
    
    console.log(data,"HERE");
    data=data;
    return data;

}
async function submitChange()
{
    let email=$("#email").val();
    let name=$('#name').val();
    let dob=$('#dob').val();
    let location=$("#autocompletestate").val();
    let profilepic=$('#profile').attr('src');
    alerting({profilepic:profilepic,email:email,name:name,dob:dob,location:location});
    
}
async function doRender(data)
{   let user=data.data;
    if(user==null||user==undefined)
    {   
        Swal.fire({
            icon: 'error',
            title: "Failed to get user!!!",
            showConfirmButton: false, 
            allowOutsideClick: false, 
            timer:2200
            
          });
        
        return;
    }
    
    $("#email").val(user.email);
    $("#name").val(user.name);
    $("#dob").val(user.dob);
    $("#autocompletestate").val(user.location);
    if(user.profilepic!=undefined)
      $("#profile").attr('src',user.profilepic);
   
   
    
}
async function toggleEditing()
{   let name=$('#name');
    let email=$('#email');
    let dob=$('#dob');
    let location=$('#autocompletestate');
    let input=$('#input');
    let arr=[input,name,dob];
    if(location.prop('disabled'))
      $("#autocompletestate").prop('disabled',false);
    else
    $("#autocompletestate").prop('disabled',true);
    arr.forEach(x=>{   console.log("HERE",x.attr('disabled')==='disabled')

            if(x.attr('disabled')=='disabled')
            {
                x.attr('disabled',false);
            }
            else
                x.attr('disabled','disabled');
        }
        );
    if(name.attr('disabled')=='disabled')
    {
      Swal.fire({
        icon: 'error',
        title: "Editing has been disabled!!!",
        showConfirmButton: false, 
        allowOutsideClick: false, 
        timer:2200
        
      });
    }
    else
    {
      Swal.fire({
        icon: 'success',
        title: "Editing has been enabled!!!",
        showConfirmButton: false, 
        allowOutsideClick: false, 
        timer:1500
        
      });
    }
    
    

}
async function doRegisterListener(data)
{   $('#edit').on('click',toggleEditing);
    $('#save').on('click',submitChange);
    
  
}

async function doHook(data)
{  console.log("IN HOOK")
  autoCompleteLocation(data.data.location);
}

PageTemplate(doAjaxRequest,doRender,doRegisterListener,doHook);