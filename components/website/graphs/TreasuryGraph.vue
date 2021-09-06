<template>
  <div>
    <highcharts :constructor-type="'stockChart'" :options="chartOptions" :navigator="navigator"></highcharts>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator';

// import {Chart} from 'highcharts-vue'

@Component
export default class TreasuryGraph extends Vue {
  // @Prop({ required: true }) readonly member!: object
  public navigator: object = {
    enabled: false
  }

  public chartOptions: object =
    {
    series: [
      {
        type: 'areaspline',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      }
    ]
  }

}
</script>