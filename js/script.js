// Parallax
var image = document.getElementsByClassName('parallax');
new simpleParallax(image, {
  delay: .6,
  transition: 'cubic-bezier(0,0,0,1)'
});

// Load in viewport
var isInViewPort = function (checkForThis) {
  var bounding = checkForThis.getBoundingClientRect();
  return (
    bounding.top >= 0 && bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Pick your elements
var inputs = Array.from(document.querySelectorAll('.btn'));

// chart.js global options
Chart.plugins.unregister(ChartDataLabels); // Unregister data labels for chart.js
Chart.defaults.global.tooltips.yPadding = 10;
Chart.defaults.global.tooltips.xPadding = 14;
Chart.defaults.global.title.fontSize = 24;
Chart.defaults.global.title.fontColor = '#fff';
Chart.defaults.global.title.padding = 30;
Chart.defaults.global.legend.labels.fontColor = '#fff';
Chart.defaults.scale.gridLines.color = '#555';
Chart.defaults.scale.ticks.fontColor = '#fff';
Chart.defaults.global.maintainAspectRatio = false;
Chart.defaults.global.responsive = true;
Chart.defaults.global.animation.duration = 750;
Chart.defaults.scale.gridLines.color = '#222';

// chart.js add padding below legend, comes before creating chart
Chart.Legend.prototype.afterFit = function() {
  this.height = this.height + 30;
};

var chart1Canvas = document.getElementById("chart1").getContext("2d");
// var chart2Canvas = document.getElementById("chart2").getContext("2d");
// var chart3Canvas = document.getElementById("chart3").getContext("2d");
// var chart4Canvas = document.getElementById("chart4").getContext("2d");
// var chart5Canvas = document.getElementById("chart5").getContext("2d");
// var chart6Canvas = document.getElementById("chart6").getContext("2d");
// var chart7Canvas = document.getElementById("chart7").getContext("2d");


var chart1AllRespondents = {
  label: 'All respondents',
  data: [33, 28, 26, 26, 26],
  backgroundColor: '#434343',
  // borderColor: 'rgba(0, 99, 132, 1)',
};

var chart1proDemocracy = {
  label: 'Pro-democracy',
  data: [53, 49, 30, 39, 15],
  backgroundColor: '#ffcb3e',
  // hidden: true
  // borderColor: 'rgba(99, 132, 0, 1)',
};

var chart1proEstablishment = {
  label: 'Pro-establishment',
  data: [15, 8, 23, 14, 36],
  backgroundColor: '#3a88fe',
  hidden: true
  // borderColor: 'rgba(99, 132, 0, 1)',
};

var chart1Male = {
  label: 'Males',
  data: [32, 31, 26, 25, 25],
  backgroundColor: '#081F5B',
  // hidden: true
  // borderColor: 'rgba(99, 132, 0, 1)',
};

var chart1Female = {
  label: 'Females',
  data: [34, 25, 26, 26, 27],
  backgroundColor: '#D2356B',
  // hidden: true
  // borderColor: 'rgba(99, 132, 0, 1)',
};

var chart1Under45 = {
  label: 'Under 45 yos',
  data: [41, 31, 28, 30, 22],
  backgroundColor: '#8073CA',
  // hidden: true
  // borderColor: 'rgba(99, 132, 0, 1)',
};

var chart1Over45 = {
  label: '45 yos and above',
  data: [26, 25, 24, 22, 30],
  backgroundColor: '#761969',
  // hidden: true
  // borderColor: 'rgba(99, 132, 0, 1)',
};

// var chart4protested = {
//   label: 'Yes, I have taken part in protests',
//   data: [24, 42, 8, 29, 20, 35, 16],
//   backgroundColor: ['#434343', '#3a88fe', '#ffcb3e', '#081F5B', '#D2356B', '#8073CA', '#761969']
//   // hidden: true
//   // borderColor: 'rgba(99, 132, 0, 1)',
// };

// var chart5AllRespondents = {
//   label: 'All respondents',
//   data: [35, 27, 27, 24, 19, 18, 18],
//   backgroundColor: '#434343',
//   // borderColor: 'rgba(0, 99, 132, 1)',
// };

// var chart5proDemocracy = {
//   label: 'Pro-democracy',
//   data: [58, 46, 45, 42, 32, 31, 30],
//   backgroundColor: '#3a88fe',
//   // hidden: true
//   // borderColor: 'rgba(99, 132, 0, 1)',
// };

// var chart5proEstablishment = {
//   label: 'Pro-establishment',
//   data: [14, 9, 11, 10, 7, 7, 8],
//   backgroundColor: '#ffcb3e',
//   hidden: true
//   // borderColor: 'rgba(99, 132, 0, 1)',
// };

// var chart5Male = {
//   label: 'Males',
//   data: [37, 28, 28, 26, 21, 21, 20],
//   backgroundColor: '#081F5B',
//   // hidden: true
//   // borderColor: 'rgba(99, 132, 0, 1)',
// };

// var chart5Female = {
//   label: 'Females',
//   data: [34, 27, 25, 24, 17, 17, 17],
//   backgroundColor: '#D2356B',
//   // hidden: true
//   // borderColor: 'rgba(99, 132, 0, 1)',
// };

// var chart5Under45 = {
//   label: 'Under 45 yos',
//   data: [45, 42, 39, 37, 29, 27, 25],
//   backgroundColor: '#8073CA',
//   // hidden: true
//   // borderColor: 'rgba(99, 132, 0, 1)',
// };

// var chart5Over45 = {
//   label: '45 yos and above',
//   data: [27, 15, 16, 15, 11, 12, 13],
//   backgroundColor: '#761969',
//   // hidden: true
//   // borderColor: 'rgba(99, 132, 0, 1)',
// };

var chart1Data = {
  labels: [['Pro-democracy', 'for Hong Kong'], ['To protest against', 'police conduct'], ['To express my', 'views about the', 'current protests'], ['To express my',  'views about how', 'Hong Kong is', 'governed'], ['I am against', 'the violence that', 'is happening']],
  datasets: [chart1AllRespondents, chart1proDemocracy, chart1proEstablishment]
};

// var chart2Data = {
//   labels: [['Pro-democracy', 'for Hong Kong'], ['To protest against', 'police conduct'], ['To express my', 'views about the', 'current protests'], ['To express my',  'views about how', 'Hong Kong is', 'governed'], ['I am against', 'the violence that', 'is happening']],
//   datasets: [chart1AllRespondents, chart1Male, chart1Female]
// };

// var chart3Data = {
//   labels: [['Pro-democracy', 'for Hong Kong'], ['To protest against', 'police conduct'], ['To express my', 'views about the', 'current protests'], ['To express my',  'views about how', 'Hong Kong is', 'governed'], ['I am against', 'the violence that', 'is happening']],
//   datasets: [chart1AllRespondents, chart1Under45, chart1Over45]
// };

// var chart4Data = {
//   labels: ['All Respondents', 'Pro-democracy', 'Pro-establishment', 'Male', 'Female', 'Under 45 yos', '45 yos and above'],
//   datasets: [chart4protested]
// };
 
// var chart5Data = {
//   labels: [['Using laser pens', 'against the police', 'and authorities'], ['Blocking MTR'], ['Blocking major roads'], ['Damaging private', 'property, including', 'mainland businesses'], ['Damaging public', 'property, such as MTR,', 'university, etc.'], ['Throwing petrol', 'bombs and bricks'], ['Attacking opponents']],
//   datasets: [chart5AllRespondents, chart5proDemocracy, chart5proEstablishment]
// };

// var chart6Data = {
//   labels: [['Using laser pens', 'against the police', 'and authorities'], ['Blocking MTR'], ['Blocking major roads'], ['Damaging private', 'property, including', 'mainland businesses'], ['Damaging public', 'property, such as MTR,', 'university, etc.'], ['Throwing petrol', 'bombs and bricks'], ['Attacking opponents']],
//   datasets: [chart5AllRespondents, chart5Male, chart5Female]
// };

// var chart7Data = {
//   labels: [['Using laser pens', 'against the police', 'and authorities'], ['Blocking MTR'], ['Blocking major roads'], ['Damaging private', 'property, including', 'mainland businesses'], ['Damaging public', 'property, such as MTR,', 'university, etc.'], ['Throwing petrol', 'bombs and bricks'], ['Attacking opponents']],
//   datasets: [chart5AllRespondents, chart5Under45, chart5Over45]
// };

var chartOptions = {
  responsive: true,
  tooltips: {
    mode: 'label',
    callbacks: {
      title: () => null,
      label: function (tooltipItems, data) {
        return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.xLabel + '%';
      }
    },
  },
    // title: {
  //   display: true,
  //   text: 'Reasons for voting in the 2019 District Council Elections'
  // },
  responsive: true,
  scales: {
    xAxes: [{
      ticks: {
        suggestedMin: 0
      }
    }],
    yAxes: [{
      ticks: {
        suggestedMin: 0
      }
    }]
  }
};

var chart1 = new Chart(chart1Canvas, {
  type: 'horizontalBar',
  data: chart1Data,
  options: chartOptions
});

// var chart2 = new Chart(chart2Canvas, {
//   type: 'horizontalBar',
//   data: chart2Data,
//   options: chartOptions
// });

// var chart3 = new Chart(chart3Canvas, {
//   type: 'horizontalBar',
//   data: chart3Data,
//   options: chartOptions
// });

// var chart4 = new Chart(chart4Canvas, {
//   type: 'horizontalBar',
//   data: chart4Data,
//   options: {
//     legend: {
//       display: false,
//     },
//     responsive: true,
//     // tooltips: {
//     //   mode: 'label',
//     //   callbacks: {
//     //     title: () => null,
//     //     label: function (tooltipItems, data) {
//     //       return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel + '%';
//     //     }
//     //   },
//     // },
//   }
// });

// var chart5 = new Chart(chart5Canvas, {
//   type: 'horizontalBar',
//   data: chart5Data,
//   options: chartOptions
// });

// var chart6 = new Chart(chart6Canvas, {
//   type: 'horizontalBar',
//   data: chart6Data,
//   options: chartOptions
// });

// var chart7 = new Chart(chart7Canvas, {
//   type: 'horizontalBar',
//   data: chart7Data,
//   options: chartOptions
// });

// Flash website on load
window.onload = function() {
  document.body.className += ' loaded'
};

// Add active class to current button
$(document).on('click', '.btn', function() {
  $(this).siblings().removeClass('active')
  $(this).addClass('active');
});