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
  // @Prop({ required: true }) readonly member!: object
  @Prop({ required: true }) readonly data!: any
  public navigator: object = {
    enabled: false
  }

  public chartOptions: object =
    {
    chart: {
          type: 'areaspline'
        },
        tooltip: {
          shared: true,
          valueSuffix: ' TNBC'
        },
        xAxis: {
          categories: []
        },
        series: [
          {
            name: 'Transactions',
            data: [] as any
          }
        ]
  }
  public formatDate(dateString: any): any {
    const date = new Date(dateString)
    // Then specify how you want your dates to be formatted
    return new Intl.DateTimeFormat('default', { dateStyle: 'medium' } as any).format(date)
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
        categories: []
      },
      series: [
        {
          name: 'Transactions',
          data: [] as any
        }
      ]
    }
    
    _data.map((d: any) => {
      chartOptions.series[0].data.push(d[0] as never)
      let formated_created_date = ''
      formated_created_date = this.formatDate(new Date(d[1] as string) as any)
      chartOptions.xAxis.categories.push(formated_created_date as never)
    })

    return chartOptions
  }

}
</script>