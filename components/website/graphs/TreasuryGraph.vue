<template>
  <div class="relative h-full card">
  <div>
    <a>7 days</a>
    <a>14 days</a>
    <a>31 days</a>
    <a>Full year</a>
  </div>
    <highcharts 
      v-if="data.length"
      :constructor-type="'stockChart'" 
      :options="transactions" 
      :navigator="navigator">
    </highcharts>
    <div v-else class="text-center absolute top-1/2 transform -translate-y-1/2 w-full">
      <p class="text-lg font-semibold text-gray-500">There is no data available from the last 31 days.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator';

// import {Chart} from 'highcharts-vue'

@Component
export default class TreasuryGraph extends Vue {
  @Prop({ required: true }) readonly data!: any
  public navigator: object = {
    enabled: false
  }

  get transactions(): any {
    let _data = this.data
    let chartOptions: any =
    {
      chart: {
        type: 'areaspline'
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