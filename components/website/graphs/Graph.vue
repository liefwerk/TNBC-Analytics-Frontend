<template>
  <div>
    <highcharts :constructor-type="'stockChart'" :options="chartOptions"></highcharts>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator';

// import {Chart} from 'highcharts-vue'

@Component
export default class Graph extends Vue {
  // @Prop({ required: true }) readonly member!: object
  public chartOptions: object =
    {
      series: [
        {
          data: [1,2,3] // sample data
        }
      ]
    }

}
</script>