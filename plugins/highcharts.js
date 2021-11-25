import Vue from "vue";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import stockInit from "highcharts/modules/stock";

const options = {
  legend: { enabled: true },
  credits: { enabled: false },
  exporting: { enabled: false },
  chart: {
    style: {
      fontFamily: '"Roboto", sans-serif'
    },
    backgroundColor: 'transparent'
  },
  boost: {
    enabled: false
  },
  scrollbar: {
    enabled: true
  },
  navigator: { enabled: true },
  rangeSelector: {
    enabled: false
  },
  plotOptions: {
    series: {
      allowPointSelect: true,
      fillColor: {
        linearGradient: [0, 0, 0, 300],
        stops: [
          [0, Highcharts.getOptions().colors[0]],
          [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
        ]
      },
      marker: {
        enabled: true,
        radius: 3,
        fillColor: '#ff1145'
      }
    },
  },
}

if (typeof Highcharts === "object") {
  stockInit(Highcharts);
  Highcharts.setOptions({
    ...options
  })
  Highcharts.addEvent(Highcharts.Chart, 'displayError', function (event) {
    if (event.code === 12) {
      event.preventDefault();
    }
  });
}

Vue.use(HighchartsVue);