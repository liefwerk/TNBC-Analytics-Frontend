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
import formatDateMixin from '@/mixins/formatDateMixin'

interface Transaction {
  amount: number,​​
  block_id: string,
  confirmation_status: string,
  created_at: string,
  direction: string,
  github_issue_id: number,
  memo: string,
  payment_type: string,
  recipient_account_number: string,
  sender_account_number: string,
  signature: string,
  transaction_type: string,
  txs_sent_at: string,
  updated_at: string,
  uuid: string
}

export default Vue.extend({
  name: 'HomeGraph',
  data(){
    return {
      navigator: { enabled: true },
      transactions: {
        count: null,
        data: []
      }
    }
  },
  mixins: [formatDateMixin],
  async fetch() {
    this.transactions = await this.$http.$post('api/homepage-chart', { days: '31' })
      .then()
      .catch(err => console.log(err))
  },
  computed: {
    getTransactions() {
      let _transactions = this.transactions.data
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
      
      _transactions.map((transaction: Transaction) => {
        chartOptions.series[0].data.push(transaction[0] as never)
        let formated_created_date = ''
        formated_created_date = this.formatDate(new Date(transaction[1]))
        chartOptions.xAxis.categories.push(formated_created_date as never)
      })
      return chartOptions
    }
  }

})
</script>