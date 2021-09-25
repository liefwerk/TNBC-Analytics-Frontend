<template>
  <div class="relative h-full card">
    <div class="flex flex-nowrap">
      <span class="mr-3 font-semibold">Filter by: </span>
      <a
        v-for="(option, index) in sortOptions" :key="index"
        @click="handleFilterValue(option.value)"
        :class="option.value === selectedFilterValue ? 'underline' : ''"
        class="cursor-pointer hover:underline pr-2">
        {{ option.name }}
      </a>
    </div>
    <highcharts
      v-if="data.length"
      :constructor-type="'stockChart'" 
      :options="transactions" 
      :navigator="navigator">
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
  public navigator: object = {
    enabled: false
  }

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