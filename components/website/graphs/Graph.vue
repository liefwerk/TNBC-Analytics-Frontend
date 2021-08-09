<template>
  <div>
    <highcharts :constructor-type="'stockChart'" :options="chartOptions"></highcharts>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator';

import {Chart} from 'highcharts-vue'

@Component({
  // components: {
  //   highcharts: Chart
  // }
})
export default class Graph extends Vue {
  // @Prop({ required: true }) readonly member!: object
  public chartOptions: object =
    {
      series: [
        {
          data: [1,2,3,1,12,0,20,3,15,2,3,10,2,3] // sample data
        }
      ],
      backgroundColor: {
        linearGradient: [0, 0, 500, 500],
        stops: [
            [0, 'rgb(255, 255, 255)'],
            [1, 'rgb(240, 240, 255)']
        ]
      },
    }

}
</script>