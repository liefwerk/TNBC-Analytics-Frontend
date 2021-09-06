<template>
  <div>
    <highcharts 
      :constructor-type="'stockChart'" 
      :options="chartOptions" 
      :navigator="navigator">
    </highcharts>
    {{ transactions.results }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HomeGraph',
  data(){
    return {
      navigator: { enabled: false },
      transactions: {},
      series: []
    }
  },
  async fetch() {
    this.transactions = await fetch('api/transaction')
      .then((res) => res.json())
      .catch(err => console.log(err))
  }

})
</script>