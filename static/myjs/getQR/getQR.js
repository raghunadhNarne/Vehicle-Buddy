async function attachQR(){
let qrmycode="http://"+window.location.host+"/bookvehicle.html#"+window.location.hash.substring(1);
console.log(qrmycode)
let x=new QRCode(document.getElementById("carqrcode"), qrmycode);
}
async function doAjax()
{
    let id = window.location.hash.substring(1);
    let data = await $.ajax({url:"/vehicle/getVehicle?id="+id,method:"GET"});
    return data;
}
async function renderCard(curCard)
{
    let cur=` <div style="transform:scale(0.9)" class=" mt-1 col-lg-4 col-md-6 col-8 mx-md-0 mx-auto" data-aos="fade-up" data-aos-delay="100">
    <div class="mycard card">
      <div class="card-img border-bottom border-5 border-primary ">
        <img  src="${curCard["pic"]}" alt=""  class="card-img-top">
      </div>
      <h2 class="h2 text-center mx-0"><a href="#" >${curCard["fullmodel"]}</a></h2>
      <h6 class="h6 text-center mx-3 my-2 fw-bolder">Price:<br><div class="icon flex-shrink-0 text-primary"><i class="fa-solid me-2 fa-inr"></i>${curCard["vehicleprice"]} / Per day</div></h6>
      <h6 class="h6 text-center mx-3 my-2 fw-bolder">Location:<br><div class="icon flex-shrink-0 text-primary"><i class="fa-solid me-2 fa-location-dot"></i>${curCard["location"]}</div></h6>
      <h6 class="h6 text-center mx-3 my-2 fw-bolder">Seller:<div class="icon flex-shrink-0 text-primary"><i class="fa-solid me-2 fa-envelope"></i>${curCard["selleremail"]}</div></h6>
      
     
    </div>
   
  </div>`
  return cur;
}
async function doRender(data)
{
    let vehicle = data.data;
    if(vehicle== null)
    {
        $("#vehicleContainer").html("<h1 class='text-danger text-center h1'>Oops! Couldn't find vehicle</h1>");
    }
    else
    {
        $("#vehicleContainer").html(`
        <div class="row  justify-content-center">${await renderCard(vehicle)}<div class='col-md-5 col-8 row justify content-center justify-content-center' id='carqrcode'></div></div>`);
        attachQR();

    }
}
PageTemplate(doAjax,doRender);