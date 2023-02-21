async function doAjaxRequest()
{
    let data=await $.ajax(
        {
            url:'/index/indexcards'
        }
    );
    
    console.log(data);

    return data;
}



async function renderCard(card)
{
    return (`<div class="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up">
    <div class="icon flex-shrink-0"><i class="fa-solid ${card["card-icon"]}"></i></div>
    <div>
      <h4 class="title">${card["card-name"]}</h4>
      <p class="description">${card["card-description"]}</p>
      <a href="${card["card-href"]}" class="readmore stretched-link"><span>Learn More</span><i class="bi bi-arrow-right"></i></a>
    </div>
  </div>`

);
}

async function doRenderPage(data)
{
  let cards=data.data;
  let renderedString='';
  
  for(let card of cards)
  {
    renderedString+=await renderCard(card);
   
  }

    $('#category-container').html(renderedString);
  
  

}

PageTemplate(doAjaxRequest,doRenderPage,undefined,undefined);