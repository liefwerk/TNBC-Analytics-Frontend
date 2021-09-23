<template>
  <div class="card">
    <highcharts 
      :constructor-type="'stockChart'" 
      :options="transactions" 
      :navigator="navigator">
    </highcharts>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator';

@Component
export default class GovernmentGraph extends Vue {
  @Prop({ required: true }) readonly data!: any
  public navigator: object = {
    enabled: false
  }

  get transactions(): any {
    let _data = this.data
    let chartOptions: any =
    {
      chart: {
        type: 'spline'
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
          data: this.data
        }
      ]
    }

    return chartOptions
  }

}
</script>