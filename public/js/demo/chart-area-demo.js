// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = 'Nunito'),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

$(document).ready(function () {
  pieChartData();
  lineChartData();
});

// Area Chart Example
const lineChartData = async () => {
  let datesArray = [];
  let confirmedArray = [];
  let deathsArray = [];
  await $.ajax({
    url: '/dailyData',
    type: 'GET',
    datatype: 'json',
    success: (response) => {
      if (response !== null) {
        response.forEach((element) => {
          console.log(element);
          datesArray.push(element.reportDate);
          console.log(element.reportDate);
          confirmedArray.push(element.confirmed.total);
          deathsArray.push(element.deaths.total);
        });
      }
    },
    error: (err) => {
      console.log(err);
    },
  });

  var ctx = document.getElementById('myAreaChart');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: datesArray,
      datasets: [
        {
          label: 'Kasus Kematian',
          lineTension: 0.3,
          backgroundColor: 'rgba(78, 115, 223, 0.05)',
          borderColor: 'rgba(78, 115, 223, 1)',
          pointRadius: 3,
          pointBackgroundColor: 'rgba(78, 115, 223, 1)',
          pointBorderColor: 'rgba(78, 115, 223, 1)',
          pointHoverRadius: 3,
          pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
          pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: deathsArray,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0,
        },
      },
      scales: {
        xAxes: [
          {
            time: {
              unit: 'date',
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              maxTicksLimit: 7,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
            },
            gridLines: {
              color: 'rgb(234, 236, 244)',
              zeroLineColor: 'rgb(234, 236, 244)',
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2],
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: 'rgb(255,255,255)',
        bodyFontColor: '#858796',
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
      },
    },
  });
};
