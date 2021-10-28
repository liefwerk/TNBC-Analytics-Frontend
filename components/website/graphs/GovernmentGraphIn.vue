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
export default class GovernmentGraph extends Vue {
  @Prop({ required: true }) readonly data!: any

  public selectedFilterValue: number = 31

  public sortOptions: Array<Object> = [
    { name: 'day', value: "1" },
    { name: 'week', value: "7" },
    { name: 'month', value: "31" },
  ]

  handleFilterValue(value: number): void {
    this.$emit('handleFilter', value)
    this.selectedFilterValue = value
  }

  get transactions(): any {
    let chartOptions: any =
    {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Payments reveived on the TNB Government wallet',
        margin: 30,
        align: 'left'
      },
      subtitle: {
        text: 'From the TNB Treasury Account',
        align: 'left'
      },
      tooltip: {
        shared: true,
        valueSuffix: ' TNBC'
      },
      scrollbar: {
        enabled: false
      },
      navigator: { enabled: false },
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