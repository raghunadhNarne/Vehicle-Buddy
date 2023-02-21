let mychart = "";
let gdata="";




function getBookingData(data, fromDate, toDate) {
  console.log(fromDate,toDate);
  const results = [];
  const dataMap = new Map();

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const date = new Date(item.bookingdate).toISOString().slice(0, 10);

    if (!dataMap.has(date)) {
      dataMap.set(date, {
        date: date,
        totalprice: 0,
        vehiclesdata: []
      });
    }

    const mapItem = dataMap.get(date);
    mapItem.totalprice += parseInt(item.vehicleprice);
    mapItem.vehiclesdata.push([item.vehicleid, item.vehiclename, item.vehicleprice]);
  }

  // Check if the date is within the given range
  for (let [date, item] of dataMap) {
    const dateObj = new Date(date);
    if (dateObj >= new Date(fromDate) && dateObj <= new Date(toDate)) {
      results.push(item);
    }
  }

  return results;
}





function dataFilter(option, data) {
  // console.log("option", option);
  console.log("func",data);
  let currentDate = new Date(); //change this to current date new Date() "2023-03-29"
  let fromday = "";
  let frommonth = "";
  let fromyear = "";
  let today = currentDate.getDate();
  let tomonth = currentDate.getMonth() + 1;
  let toyear = currentDate.getFullYear();

  document.getElementById("toDate").value = `${today}-${tomonth}-${toyear}`;
  switch (option) {
    case "currentWeekTillDate":
      let startOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
      );
      fromday = startOfWeek.getDate();
      frommonth = startOfWeek.getMonth() + 1;
      fromyear = startOfWeek.getFullYear();
      break;
    case "past7Days":
      let past7Days = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 7
      );
      fromday = past7Days.getDate();
      frommonth = past7Days.getMonth() + 1;
      fromyear = past7Days.getFullYear();
      break;


    case "currentMonthTillDate":
      let startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      fromday = startOfMonth.getDate();
      frommonth = startOfMonth.getMonth() + 1;
      fromyear = startOfMonth.getFullYear();
      break;


    case "past30Days":
      // let past30Days = new Date();
      // let day = past30Days.getTime() - 30 * 24 * 60 * 60 * 1000;
      // past30Days.setTime(day);
      // console.log("past30days",past30Days);

      let past30Days = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 30
      );

      fromday = past30Days.getDate();
      frommonth = past30Days.getMonth() + 1;
      fromyear = past30Days.getFullYear();
      break;


    case "past6Months":
      let past6Months = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 6,
        currentDate.getDate()
      );
      fromday = past6Months.getDate();
      frommonth = past6Months.getMonth() + 1;
      fromyear = past6Months.getFullYear();
      break;


    case "currentYearTillDate":
      let startOfYear = new Date(currentDate.getFullYear(), 0, 1);
      fromday = startOfYear.getDate();
      frommonth = startOfYear.getMonth() + 1;
      fromyear = startOfYear.getFullYear();
      break;


    case "last365Days":
      let last365Days = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 365
      );
      fromday = last365Days.getDate();
      frommonth = last365Days.getMonth() + 1;
      fromyear = last365Days.getFullYear();
      break;


    case "last2Years":
      let last2Years = new Date(
        currentDate.getFullYear() - 2,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      fromday = last2Years.getDate();
      frommonth = last2Years.getMonth() + 1;
      fromyear = last2Years.getFullYear();
      break;


    case "last5Years":
      let last5Years = new Date(
        currentDate.getFullYear() - 5,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      fromday = last5Years.getDate();
      frommonth = last5Years.getMonth() + 1;
      fromyear = last5Years.getFullYear();
      break;
  }

  document.getElementById("fromDate").value = `${fromday}-${frommonth}-${fromyear}`;

  let result = getBookingData(data,`${fromyear}-${frommonth}-${fromday}`, `${toyear}-${tomonth}-${today}`);
  console.log("result",result);





  mychart = new Chart(document.getElementById("graph"), {
    type: "line",
    data: {
      labels: result.map((item) => item.date),
      datasets: [
        {
          label: "Revenue On Day",
          // color:'#36A2EB',
          // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
          pointHoverBackgroundColor: "rgb(2, 117, 216)",
          borderColor: "#001973",
          fill: true,
          tension: 0.25,
          backgroundColor: "rgb(2, 117, 216)",
          pointStyle: "crossRot",
          pointRadius: 8,
          borderWidth: 2.7,
          data: result.map((item) => item.totalprice),
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
      // plugins: {
      //   tooltip: {
      //       callbacks: {
      //         label: function(tooltipItem, data) {
      //           var label = data.datasets[tooltipItem.datasetIndex].label || '';
      //           if (label) {
      //             label += ': ';
      //           }
      //           label += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
      //           return label;
      //         }}}}
      // animations: {
      //   tension: {
      //     duration: 500,
      //     easing: 'linear',
      //     from: 1.5,
      //     to: 0,
      //     loop: true
      //   }
      // },
    //   plugins: {
    //     legend: {
    //         display: false,
    //         labels: {
    //             color: 'rgb(255, 99, 132)'
    //         }
    //     }
    // }
    },
  });
}










async function doAjax() {
  console.log("ajax call");
  // let data = [
  //   {
  //     vehiclelocation: "Mumbai, Maharashtra",
  //     vehiclename: "Q7, Audi",
  //     vehicleid: "63e27fefa6e4dc13681865ba",
  //     selleremail: "raghunadhnarne1022@gmail.com",
  //     vehicleprice: "6000",
  //     customeremail: "customer@customer.com",
  //     bookingdate: "2023-02-15T00:00:00.000Z"
  //   },
  //   {
  //     vehiclelocation:"Mumbai, Maharashtra",
  //     vehiclename: "X6, BMW",
  //     vehicleid: "63e28038a6e4dc13681865bb",
  //     selleremail: "raghunadhnarne1022@gmail.com",
  //     vehicleprice: "6500",
  //     customeremail: "customer@customer.com",
  //     bookingdate: "2023-02-21T00:00:00.000Z"
  //   },
  //   {
  //     vehiclelocation: "Mumbai, Maharashtra",
  //     vehiclename: "Q7, Audi",
  //     vehicleid: "63e27fefa6e4dc13681865ba",
  //     selleremail: "raghunadhnarne1022@gmail.com",
  //     vehicleprice: "6000",
  //     customeremail: "customer2@customer.com",
  //     bookingdate: "2023-02-25T00:00:00.000Z"
  //   },
  //   {
  //     vehiclelocation: "Mumbai, Maharashtra",
  //     vehiclename: " C-Class clk, Benz",
  //     vehicleid: "63e2846d27c888f4320f40c6",
  //     selleremail: "raghunadhnarne1022@gmail.com",
  //     vehicleprice: "5500",
  //     customeremail: "customer2@customer.com",
  //     bookingdate: "2023-02-26T00:00:00.000Z"
  //   },
  //   {
  //     vehiclelocation: "Mumbai, Maharashtra",
  //     vehiclename: "Q7, Audi",
  //     vehicleid: "63e27fefa6e4dc13681865ba",
  //     selleremail: "raghunadhnarne1022@gmail.com",
  //     vehicleprice: "6000",
  //     customeremail: "customer@customer.com",
  //     bookingdate: "2023-02-21T00:00:00.000Z"
  //   },
  //   {
  //     vehiclelocation: "Mumbai, Maharashtra",
  //     vehiclename: "Q7, Audi",
  //     vehicleid: "63e27fefa6e4dc13681865ba",
  //     selleremail: "raghunadhnarne1022@gmail.com",
  //     vehicleprice: "6000",
  //     customeremail: "customer@customer.com",
  //     bookingdate: "2023-02-23T00:00:00.000Z"
  //   },
  //   {
  //     vehiclelocation: "Mumbai, Maharashtra",
  //     vehiclename: "Jeep, Mahindra",
  //     vehicleid: "63e284a327c888f4320f40c7",
  //     selleremail: "raghunadhnarne1022@gmail.com",
  //     vehicleprice: "4000",
  //     customeremail: "customer@customer.com",
  //     bookingdate: "2023-02-23T00:00:00.000Z"
  //   },
  //   {
  //     vehiclelocation: "Mumbai, Maharashtra",
  //     vehiclename: "X6, BMW",
  //     vehicleid: "63e28038a6e4dc13681865bb",
  //     selleremail: "raghunadhnarne1022@gmail.com",
  //     vehicleprice: "6500",
  //     customeremail: "customer2@customer.com",
  //     bookingdate: "2023-02-23T00:00:00.000Z"
  //   },
  //   {
  //     vehiclelocation: "Hyderabad, Telangana",
  //     vehiclename: "Q7, Audi",
  //     vehicleid: "63e67ca1bc98f25ebb070c65",
  //     selleremail: "raghunadhnarne1022@gmail.com",
  //     vehicleprice: "10000",
  //     customeremail: "customer@customer.com",
  //     bookingdate: "2023-02-28T00:00:00.000Z"
  //   }
  // ];


  let data = await $.ajax({
    method: "GET",
    url: "/book/getSellerBookings",
  });
  console.log("from ajax",data);
  gdata = data.data;
  return data.data;
}

async function doRender(data) {
  // console.log("option", option);
  dataFilter("currentWeekTillDate",data)
}

async function doRegisterListener(){
  document.getElementById("options").addEventListener("change", async (e)=> {
    await mychart.destroy();
    let selectedOption = e.target.value;
    console.log("selected", e.target.value);
    dataFilter(selectedOption, gdata);
  });
}

PageTemplate(doAjax, doRender, doRegisterListener, undefined);
