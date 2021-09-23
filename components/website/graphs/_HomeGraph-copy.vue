<template>
  <div>
    <highcharts
      :constructor-type="'stockChart'" 
      :options="getTransactions" 
      :navigator="navigator">
    </highcharts>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Transaction } from '@/constants/types/Graph' 

export default Vue.extend({
  name: 'HomeGraph',
  data(){
    return {
      navigator: { enabled: true }
    }
  },
  props: {
    transactions: {
      type: [],
      required: true
    }
  },
  methods: {
    formatDate(dateString: any): any {
      const date = new Date(dateString)
      // Then specify how you want your dates to be formatted
      return new Intl.DateTimeFormat('default', { dateStyle: 'medium' } as any).format(date)
    },
  },
  computed: {
    getTransactions(): any {
      let chartOptions: any =
      {
        tooltip: {
          shared: false,
          valueSuffix: ' TNBC'
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
          },
          title: {
              text: 'Date'
          }
        },
        series: [
          {
            name: 'Transactions',
            data: this.transactions,
            type: 'areaspline',
            threshold: null,
            connectEnds: false
          }
        ]
      }

      return chartOptions
    }
  }

})
</script>