async function doAjax()
{
    let data=await $.ajax({url:"/book/getSellerBookings",method:"GET",});
    return data;
}

async function doRender(data)
{   if(data.data.length==0)
    {    $("#table").remove();
        $("#servicecontainer").html("<h2 class='h2 text-center'>You don't have any booking.</h2>")
        return ;
    }
    let dataFormat={
    data:data.data,
    columns:
    [   {title:"Vehicle ID",data:"vehicleid"},
        {title:"Vehicle Name",data:"vehiclename"},
        {title:"Vehicle Price",data:"vehicleprice"},
        {title:"Vehicle Location",data:"vehiclelocation"},
        {title:"Booking Date",data:"bookingdate", render:(data)=>(new Date(data)).toLocaleDateString()},
        {title:"Customer Email",data:"customeremail"}
    ],
    "columnDefs": [{ className: "dt-head-center", targets: [ 0,1,2,3,4 ] }]};

    var table = $("#table").DataTable(dataFormat);
   
    $('#table').on('click','td:first-child', function () {
        var data = table.row( this ).data();
        // alert( JSON.stringify(data) );
        console.log(data.vehicleid);
        window.open("vehicleBars.html#"+data.vehicleid);
    } );
   // $("td:first-child").each(function(){$(this).html(`<a href="vehicleBars.html#${$(this).html()}">${$(this).html()}</a>`)})
    
}

async function doAddListeners(){
    $("#stats").on("click",()=>window.open("bars.html", '_blank'));
}

PageTemplate(doAjax,doRender,doAddListeners);