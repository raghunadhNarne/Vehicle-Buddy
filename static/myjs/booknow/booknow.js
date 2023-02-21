let gdata;

async function doAjaxRequest()
{
    let data=await $.ajax({"url":'/vehicle/allVehicles',"method":"GET"});

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
      
      <a href="/bookvehicle.html#${curCard["_id"]}" class="btn mt-auto btn-outline-primary align-self-center mb-3 col-6">Book Now</a>
    </div>
   
  </div>`
  return cur;
}

async function doRenderPage(data)
{
  gdata = data.data;
  console.log("gdata",gdata);
    let renderedString="";
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

async function doAddListeners(){
  $("#filter").on("click",filter);
}

async function filter(){
  let location = $("#location").val();
  let vehiclename = $("#model").val();
  let sorttype = $("#sortbyprice").val();
  console.log("sorttype",sorttype);
  console.log("location",location);
  console.log("vehiclename",vehiclename);
  let data = await filterData(vehiclename,location,sorttype);

  console.log("data",data);
  let renderedString="";
    for(let x of data)
        renderedString+=await renderCard(x);
    $("#servicecontainer").html(renderedString);
}



function filterData(vehiclename, location, sorttype) {
  let filteredData = gdata;

  // Filter data based on vehiclename and location
  if (vehiclename) {
    const name = vehiclename.toLowerCase();
    filteredData = filteredData.filter(vehicle => vehicle.fullmodel.toLowerCase().includes(name));
  }
  if (location) {
    const loc = location.toLowerCase();
    filteredData = filteredData.filter(vehicle => vehicle.location.toLowerCase().includes(loc));
  }

  // Sort data based on sorttype
  if (sorttype === 'ascending') {
    filteredData.sort((a, b) => a.vehicleprice - b.vehicleprice);
  } else if (sorttype === 'descending') {
    filteredData.sort((a, b) => b.vehicleprice - a.vehicleprice);
  }

  return filteredData;
}

  


PageTemplate(doAjaxRequest,doRenderPage,doAddListeners,doHook);