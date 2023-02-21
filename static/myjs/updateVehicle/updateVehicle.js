async function alerting(data)
{   
   Swal.fire({

        showCancelButton: true,
        confirmButtonText: 'Update vehicle',
        icon:"warning",
        title:"Are your sure?",
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm:  () => {
          return $.ajax({method:"PUT",contentType:'application/json','data':JSON.stringify(data),'url':"/vehicle/updateVehicle"}).
          then((result)=>
            {

                if(result.success)
                {
                    console.log("Succesfully Updated");
                    Swal.fire({allowOutsideClick:false,
                        showConfirmButton: false, 
                        allowOutsideClick: false, 
                        "icon":"success",
                        "title":"Successfully Updated vehicle.",
                        "text":"Redirecting you to your vehicles."
                        }
                    );
                    setTimeout(()=>window.location.href='/myvehicles.html',3000);
                }
                else
                {

                    Swal.fire({allowOutsideClick:false,
                        confirmButtonText: 'OK',
                        allowOutsideClick: false, 
                        "icon":"error",
                        "title":`${result.message}`,
                            "text":'Try again'
                        }
                    );
                }

                
        
            }


          ) .
          catch(e=>
            {       console.log("Error babai",e);
                    Swal.fire({allowOutsideClick:false,
                        "icon":"error",
                        "title":"A fatal error occurend."
                        }
                     );});;},});
 

}
function displayError(message)
{
    Swal.fire({allowOutsideClick:false,
        confirmButtonText: 'OK',
        allowOutsideClick: false, 
        "icon":"error",
        "title":`${message}`,
            "text":'Try again'
        });


}
async function submitChange()
{
    let id = window.location.hash.substring(1);
    let model=$("#autocompletemodel").val();
    let vehicleprice=$('#vehicleprice').val();
    let location=$("#autocompletestate").val();
    let profilepic=$('#profile').attr('src');
    if(model==null)
    {   displayError("Enter the car model");
        return;
    }
    if(location==null)
    {   displayError("Enter the cars location");
        return;
    }
    if(vehicleprice==null||vehicleprice<=0)
    {   displayError("Enter vehicles price.");
        return;
    }
    
    let requestData={id:id,model:model,vehicleprice:vehicleprice,location:location,profilepic:profilepic};
    alerting(requestData);
}






async function doAjaxRequest(){
    let id = window.location.hash.substring(1);
    let data = await $.ajax({url:"/vehicle/getVehicle?id="+id,method:"GET"});
    return data;
}

async function doRender(data)
{
    let vehicle  = data.data;
    console.log("HERE",vehicle);
    if(vehicle == undefined){
        return;
    }
    else{

        $("#vehicleprice").val(vehicle["vehicleprice"]);
        $("#profile").attr("src",vehicle["pic"]);
    }
}
async function doRegisterListener(data)
{
    $("#submitVehicle").on('click',submitChange);
    

}
async function doHook(data)
{   
    console.log("IN HOOK")
    let vehicle=data.data;
    autoCompleteCar(vehicle.fullmodel);
    autoCompleteLocation(vehicle.location);
}

PageTemplate(doAjaxRequest,doRender,doRegisterListener,doHook);

