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
  
  get transactions(): any {
    let chartOptions: any =
    {
      chart: {
        type: 'areaspline',
        alignTicks: true
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
        shared: false,
        valueSuffix: ' TNBC'
      },
      series: [
        {
          name: 'Transactions',
          data: this.data,
          // dataGrouping: {
          //   approximation: 'average',
          //   enabled: true,
          //   groupAll: true,
          //   forced: true,
          //   start: this.data[0][0],
          //   last: this.data[this.data.length - 1][0],
          //   anchor: false,
          //   units: [[
          //     'day', // unit name
          //     [1] // allowed multiples
          //   ]]
          // },
        }
      ]
    }

    return chartOptions
  }

}
</script>