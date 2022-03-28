// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = 'Nunito'),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

$(document).ready(function () {
  pieChartData();
  lineChartData();
});

// Pie Chart Example
var ctx = document.getElementById('myPieChart');

const pieChartData = async () => {
  let confirmedData = 0;
  let deathsData = 0;
  let recoveredData = 0;
  await $.ajax({
    url: '/piechartData',
    type: 'GET',
    datatype: 'json',
    success: (response) => {
      if (response !== null) {
        console.log(response);
        const { confirmed, deaths, recovered } = response;
        const total = confirmed.value + deaths.value + recovered.value;
        confirmedData = parseFloat(
          ((confirmed.value / total) * 100).toFixed(2)
        );
        deathsData = parseFloat(((deaths.value / total) * 100).toFixed(2));
        recoveredData = parseFloat(
          ((recovered.value / total) * 100).toFixed(2)
        );
      }
    },
    error: (err) => {
      console.log(err);
    },
  });

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Kasus Positif', 'Kasus Kematian', 'Kasus Sembuh'],
      datasets: [
        {
          data: [confirmedData, deathsData, recoveredData],
          backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
          hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
          hoverBorderColor: 'rgba(234, 236, 244, 1)',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: 'rgb(255,255,255)',
        bodyFontColor: '#858796',
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false,
      },
      cutoutPercentage: 80,
    },
  });
};
