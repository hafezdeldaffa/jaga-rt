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
  let vaksinasiData1 = 0;
  let vaksinasiData2 = 0;
  await $.ajax({
    url: '/piechartData',
    type: 'GET',
    datatype: 'json',
    success: (response) => {
      if (response !== null) {
        console.log(response.vaksinasi.total);
        const { vaksinasi } = response;
        const total = vaksinasi.total.jumlah_vaksinasi_1 + vaksinasi.total.jumlah_vaksinasi_2;
        console.log(total);
        vaksinasiData1 = vaksinasi.total.jumlah_vaksinasi_1.toFixed(2);
        vaksinasiData2 = vaksinasi.total.jumlah_vaksinasi_2.toFixed(2);
      }
    },
    error: (err) => {
      console.log(err);
    },
  });

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Vaksinasi Dosis 1', 'Vaksinasi Dosis 2'],
      datasets: [
        {
          data: [vaksinasiData1, vaksinasiData2],
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
