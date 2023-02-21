let mychart = "";
async function doAjax() {
  console.log("ajax call");
  let reqdata = {
    vehicleid: window.location.hash.substring(1),
    fromdate: $("#fromdate").val(),
    todate: $("#todate").val(),
  };
  let data = await $.ajax({
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(reqdata),
    url: "/bars",
  });
  console.log(data);
  return data;
}

async function doRender(data) {
  
let months = [];
for (let i = 0; i < 12; i++) {
  months.push({month: i + 1, totalprice: 0});
}

data.data.forEach(item => {
  let date = new Date(item.bookingdate);
  let month = date.getMonth();

  months[month].totalprice += parseInt(item.vehicleprice);
});

console.log("final data",months);

  mychart = new Chart(document.getElementById("graph"), {
    type: "line",
    data: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [
        {
          label: "Revenue Per Month",
          // color:'#36A2EB',
          // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
          pointHoverBackgroundColor: "rgb(2, 117, 216)",
          borderColor: "#001973",
          fill: true,
          tension: 0.35,
          backgroundColor: "rgb(2, 117, 216)",
          pointStyle: "crossRot",
          pointRadius: 8,
          borderWidth: 2.7,
          data: months.map((item) => item.totalprice),
          // backgroundColor: [
          //   'rgb(255, 99, 132)',
          //   'rgb(75, 192, 192)',
          //   'rgb(255, 205, 86)',
          //   'rgb(201, 203, 207)',
          //   'rgb(54, 162, 235)',
          //   'rgb(255, 99, 132)',
          //   'rgb(75, 192, 192)',
          //   'rgb(255, 205, 86)',
          //   'rgb(201, 203, 207)',
          //   'rgb(54, 162, 235)',
          //   'rgb(255, 99, 132)',
          //   'rgb(75, 192, 192)'
          // ]
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            color: "#001973",
            beginAtZero: true,
            font: {
              weight: "bold",
            },
          },
        },
        x: {
          ticks: {
            color: "#001973",
            beginAtZero: true,
            font: {
              weight: "bold",
            },
          },
        },
      },
      // animations: {
      //   tension: {
      //     duration: 700,
      //     easing: 'linear',
      //     from: 0.6,
      //     to: 0,
      //     loop: true
      //   }
      // },
    },
  });
}

PageTemplate(doAjax, doRender, undefined, undefined);

$("#showbtn").on("click",async ()=>{
  await mychart.destroy();
  let data = await doAjax();
  doRender(data);
});