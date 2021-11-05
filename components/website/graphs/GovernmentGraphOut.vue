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
export default class GovernmentGraph extends Vue {
  @Prop({ required: true }) readonly data!: any

  public sortOptions: Array<Object> = [
    { name: 'day', value: "1" },
    { name: 'week', value: "7" },
    { name: 'month', value: "31" },
  ]

  get transactions(): any {
    let chartOptions: any =
    {
      chart: {
        type: 'column',
        alignTicks: false
      },
      title: {
        text: 'Payments sent from the TNB Government wallet',
        margin: 30,
        align: 'left'
      },
      subtitle: {
        text: 'From November 2nd 2020 until yesterday.',
        align: 'left'
      },
      tooltip: {
        shared: true,
        valueSuffix: ' TNBC'
      },
      xAxis: {
        categories: []
      },
      rangeSelector: {
        selected: 1
      },
      series: [
        {
          name: 'Transactions',
          data: this.data,
          dataGrouping: {
           approximation: 'sum',
            enabled: true,
            forced: true,
            smoothed:true,
            units: [[
              'month', // unit name
              [1] // allowed multiples
            ]]
          },
        }
      ]
    }

    return chartOptions
  }

}
</script>