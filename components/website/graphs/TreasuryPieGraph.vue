<template>
  <div class="relative h-full card">
    <highcharts 
      :constructor-type="'stockChart'" 
      :options="transactions">
    </highcharts>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TreasuryGraph extends Vue {
  @Prop({ required: true }) readonly data!: any

  get transactions(): any {
    let chartOptions: any =
      {
        chart: {
          type: 'pie',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
        },
        colors: ['#2a297a', '#336faf'],
        title: {
          text: "Shares of withdrawals' amounts",
          margin: 30,
          align: 'left'
        },
        subtitle: {
          text: 'From the TNB Treasury Account',
          align: 'left'
        },
        navigator: { enabled: false },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        tooltip: {
          enabled: false,
          pointFormat: '<b>{point.percentage:.1f}%</b>',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.y}</b> - {point.percentage:.1f} %'
            },
            showInLegend: true
          }
        },
        legend: {
          enabled: true,
          floating: true,
        },
        series: [
          {
            name: 'Transactions',
            colorByPoint: true,
            data: this.data
          }
        ]
      }
    
    return chartOptions
  }

}
</script>