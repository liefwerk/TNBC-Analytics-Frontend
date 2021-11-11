<template>
  <div class="relative h-full card">
    <highcharts 
      v-if="data.length"
      :constructor-type="'stockChart'" 
      :options="transactions">
    </highcharts>
    <div v-else class="text-center absolute top-1/2 transform -translate-y-1/2 -right-1/2 -translate-x-1/2 w-full">
      <p class="text-lg font-semibold text-gray-500">There is no data available from the last {{ selectedFilterValue }} days.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TreasuryGraph extends Vue {
  @Prop({ required: true }) readonly data!: any

  public selectedFilterValue: number = 31

  get transactions(): any {
    let chartOptions: any =
      {
        chart: {
          type: 'areaspline'
        },
        rangeSelector: {
          enabled: false
        },
        title: {
          text: 'Periodic withdrawals of TNBC',
          margin: 30,
          align: 'left'
        },
        subtitle: {
          text: 'From Treasury Account',
          align: 'left'
        },
        tooltip: {
          shared: true,
          valueSuffix: ' TNBC'
        },
        xAxis: {
          type: 'datetime'
        },
        series: [
          {
            name: 'Transactions',
            data: this.data
          }
        ]
      }
    
    return chartOptions
  }

}
</script>