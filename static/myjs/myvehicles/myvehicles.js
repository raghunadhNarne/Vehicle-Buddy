async function doAjaxRequest()
{
      let data=await $.ajax({"url":'/vehicle/seller/getVehicles',"method":"GET"});

    return data;
}

async function renderCard(curCard)
{
    let cur=` <div style="transform:scale(0.9)" class="mt-1 col-lg-4 col-md-6 col-8 mx-md-0 mx-auto" data-aos="fade-up" data-aos-delay="100">
    <div class="mycard card">
      <div class="card-img border-bottom border-5 border-primary ">
        <img  src="${curCard["pic"]}" alt=""  class="card-img-top">
      </div>
      <h2 class=" h2 text-center mx-0"><a href="#" >${curCard["fullmodel"]}</a></h2>
      <h6 class="h5 text-center mx-3 my-2 fw-bolder">Price:<br><div class="icon flex-shrink-0  text-primary"><i class="fa-solid me-2 fa-inr"></i>${curCard["vehicleprice"]} / Per day</div></h6>
      <h6 class="h5 text-center mx-3 my-2 fw-bolder">Location:<br><div class="icon flex-shrink-0 text-primary"><i class="fa-solid me-2 fa-location-dot"></i>${curCard["location"]}</div></h6>
      <h6 class="h5 text-center mx-3 my-2 fw-bolder">Seller:<div class="icon flex-shrink-0 text-primary"><i class="fa-solid me-2 fa-envelope"></i>${curCard["selleremail"]}</div></h6>
      <a href="/getVehicleQR.html#${curCard["_id"]}" class="mt-auto btn btn-outline-primary align-self-center mb-3 col-6">Get Vehicle QR</a> 
      <a href="/updateVehicle.html#${curCard["_id"]}" class="mt-auto btn btn-outline-primary align-self-center mb-3 col-6">Update Vehicle</a>
    </div>
   
  </div>`
  return cur;
}

async function doRenderPage(data)
{
    let renderedString="";
    if(data.data.length==0)
      return ;
    for(let x of data.data)
        renderedString+=await renderCard(x);
    $("#servicecontainer").html(renderedString);

}
function doHook()
{
        let elements=document.querySelectorAll('.mycard');
        console.log(elements);
        function onMouseOver(e)
        {   
            console.log("HERE")
            e.target.classList.add('services-featured');
            

        }
        function onMouseOut(e)
        {
            e.target.classList.remove('services-featured');
        }

        elements.forEach(x=>x.onmouseenter=onMouseOver)
        elements.forEach(x=>x.onmouseleave=onMouseOut);

}

PageTemplate(doAjaxRequest,doRenderPage,undefined,doHook);