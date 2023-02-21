let mychart = "";
let data = "";
async function doAjax() {
  data=await $.ajax({url:"/bars",method:"GET"});
  console.log(data);
    return data;
}

async function doRender(data){

  const fromDate = $("#fromdate").val();
  const toDate = $("#todate").val();

  // const result = [];
  // const groupedData = new Map();
  
  // for (const item of data.data) {
  //   if (!groupedData.has(item.vehicleid)) {
  //     groupedData.set(item.vehicleid, {
  //       vehiclename: item.vehiclename,
  //       vehicleid: item.vehicleid,
  //       totalprice: 0
  //     });
  //     result.push(groupedData.get(item.vehicleid));
  //   }
  //   groupedData.get(item.vehicleid).totalprice += parseInt(item.vehicleprice);
  // }



//correct approach
  // let groupedData = {};

  // data.forEach(item => {
  //   if (
  //     (fromDate === "" || new Date(item.bookingdate) >= new Date(fromDate)) &&
  //     (toDate === "" || new Date(item.bookingdate) <= new Date(toDate))
  //   ) {
  //     if (!groupedData[item.vehicleid]) {
  //       groupedData[item.vehicleid] = {
  //         vehiclename: item.vehiclename,
  //         totalprice: 0
  //       };
  //     }
  //     groupedData[item.vehicleid].totalprice += parseInt(item.vehicleprice);
  //   }
  // });
  
  // let result = [];
  // for (const key in groupedData) {
  //   result.push({
  //     vehicleid: key,
  //     vehiclename: groupedData[key].vehiclename,
  //     totalprice: groupedData[key].totalprice
  //   });
  // }
  
  // console.log(result);



  //better code 
  let result = data.data.reduce((acc, item) => {
    if (
      (fromDate === "" || new Date(item.bookingdate) >= new Date(fromDate)) &&
      (toDate === "" || new Date(item.bookingdate) <= new Date(toDate))
    ) {
      let existingItem = acc.find(i => i.vehicleid === item.vehicleid);
      if (existingItem) {
        existingItem.totalprice += parseInt(item.vehicleprice);
      } else {
        acc.push({
          vehicleid: item.vehicleid,
          vehiclename: item.vehiclename,
          totalprice: parseInt(item.vehicleprice)
        });
      }
    }
    return acc;
  }, []);
  
  console.log(result);




  mychart =  new Chart(
    document.getElementById('graph'),
    {
      type: 'bar',
      data: {
        labels: result.map(item => [item.vehiclename,item.vehicleid]),
        datasets: [
          {
            label: 'Revenue Of Cars',
            // color:'#36A2EB',
            hoverBackgroundColor:'rgb(2, 117, 216)',
            backgroundColor:'#001973',
            // maxBarThickness:80,
            barPercentage: 0.5,
            data: result.map(item => item.totalprice)
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio:false,
        scales: {
          y: {
            ticks: { color: '#001973', beginAtZero: true, font: {
              weight: 'bold'
          } }
          },
          x: {
            ticks: { color: '#001973', beginAtZero: true ,font: {
              weight: 'bold'
          }}
          }
        },
        onClick: function(evt,item) {
          let e = item[0];
          var xLabel = this.data.labels[e.index];
          var yValue = this.data.datasets[0].data[e.index];
          console.log(xLabel);
          console.log(yValue);
          window.location.href = "vehicleBars.html#"+ xLabel[1];
      }
      }
    }
  );
}

PageTemplate(doAjax,doRender,undefined,undefined);
$("#showbtn").on("click",async ()=>{
  await mychart.destroy();
  doRender(data);
});