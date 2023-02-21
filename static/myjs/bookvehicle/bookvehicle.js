async function alerting(data)
{   
   let {vehicleId,date}=data;
   Swal.fire({
        title:"Loading",
        allowEscapeKey:false,
        showConfirmButton:false,
        allowOutsideClick:false
        ,
        showLoaderOnConfirm: true,
        preConfirm:  () => {
          return  $.ajax({method:'POST',url:'/book/bookvehicle',data:JSON.stringify({vehicleid:vehicleId,date:date}),contentType:'application/json'}).then((response)=>{
            
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
                setTimeout(()=>window.location.replace('/'),2000);
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
async function submit()
{
  let date=$("#bookdate").val();
  let vehicleId=window.location.hash.substring(1);
  alerting({date:date,vehicleId:vehicleId});

}
async function renderVehicle(vehicle){
    return (`<div id="display-container container-fluid" class="row gy-4 mt-4">
      <div class="row justify-content-around">
        
        <div class="container-fluid justify-content-center col-md-4 col-8 ">
          <div class="row justify-content-center ">
          <u> <p class="mt-4 h2 text-center text-primary">${vehicle["fullmodel"]}</p> </u>
           <img  src="${vehicle.pic}" alt="">
        </div>
        </div>

        <div class="mt-4 container-fluid col-8   ">
          <u> <h3 class="h3 text-center text-primary">INFO</h3> </u>
          <div class="row justify-content-center text-center">
            <p class=" h4 ">Location</p>
            <div class="text-primary icon h5 flex-shrink-0"><i class="fa-solid me-2 fa-location-dot"></i>${vehicle["location"]}</div>
            <p class="mt-4 h4">Price:</p>
            <div class="text-primary icon h5 flex-shrink-0"><i class="fa-solid me-2 fa-inr"></i>${vehicle["vehicleprice"]} / Per day</div>
            <p class="mt-4 h4">Seller</p>
            <div class="text-primary icon h5 flex-shrink-0"><i class="fa-solid me-2 fa-envelope"></i>${vehicle["selleremail"]}</div>
          </div>
        </div>


      </div>
    <div class="container-fluid">
      <div class="row  justify-content-md-end justify-content-center ">
        <div id="booknow" class="btn p-2 mt-auto m-0 align-self-center btn-outline-primary col-md-3 col-6 mx-3"><span class="h4"> Book Now</span> </div>
        <input  id="bookdate" class="mt-3 align-self-center p-2 col-md-4 col-6 form-control-lg datepicker" placeholder="Book Date" data-date-format="dd/mm/yyyy">
      </div>
    </div>
  </div>`);
}
async function doAjaxRender()
{   
    let id = window.location.hash.substring(1);
    let data = await $.ajax({url:"/vehicle/getVehicle?id="+id,method:"GET"});
    console.log("MYDATA",data);
    return data;
}

async function doRender(data){
    let vehicle = data.data;
    if(vehicle== null){
        $("#vehicleContainer").html("<h1 class='text-danger text-center h1'>Oops! Couldn't find vehicle</h1>");
    }
    else{
        $("#vehicleContainer").html(await renderVehicle(vehicle));
    }
}


async function doRegisterListener()
{
  $("#booknow").on('click',submit);
}
async function doHook(data)
{   
  let disabledDays = data.data.bookings;
  console.log(disabledDays)
  $('.datepicker').datepicker({
    startDate: '0d',
    format:"yyyy-mm-dd",
    endDate:"+1m",
    datesDisabled:disabledDays
  });
}


PageTemplate(doAjaxRender,doRender,doRegisterListener,doHook);