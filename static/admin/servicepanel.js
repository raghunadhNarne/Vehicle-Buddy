function servicePanelProcess(services){

function getAllDetails()
{
    let vals=document.querySelectorAll('input');
    let serviceObj={}
    for(let x of vals)
        serviceObj[x.id]=x.value;
    return serviceObj;
  
}

function saveService(service)
{   

        $.ajax({'method':"PUT","url":'/api/services/',data:JSON.stringify(service),
            contentType:"application/json"
            ,

            success:function(e)
            {
                ToastDisplay(e.message,e["toast-class"]);
            },
            error:function(e)
            {   console.log(e);
            ToastDisplay("Error While Saving service :(",'bg-danger');
            }

            }); 


    
    
}




function deleteService(service)
{
console.log("HERE");
if(service["service-name"].length==0 || service["service-name"] == undefined)
{   
    ToastDisplay("Please enter a service name:(",'bg-danger');
    return;

}
    $.ajax({'method':"DELETE",'url':`/api/services/${service["service-name"]}`,

    success:function(e)
    {
  ToastDisplay(e["message"],e["toast-class"])
    },
    error:function(e)
    {
    ToastDisplay("Error Deleting services ::(",'bg-danger');
    }

});


}

function listenServicName(e)
{   

    let serviceName=e.target.value;
    if(serviceName in services)
        {   let dataObj=services[serviceName];
            let inputs=document.querySelectorAll('input');
            for(let x of inputs)
            {
                if(x.id in dataObj)
                    x.value=dataObj[x.id];
            }
        }

}
document.querySelector('#service-name').addEventListener('keyup',listenServicName);
document.querySelector('.submit').addEventListener('click',()=>{let obj=getAllDetails();saveService(obj)});

document.querySelector('.delete').addEventListener('click',()=>{let obj=getAllDetails();deleteService(obj)});
}

$.ajax({'method':"GET","url":'/api/services',

success:function(e)
{
  servicePanelProcess(e.data);
},
error:function(e)
{
  ToastDisplay("Error While Loading services :(",'bg-danger');
}

});
