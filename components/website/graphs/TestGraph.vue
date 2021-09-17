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
  name: 'Testgraph',
  data(){
    return {
      navigator: { enabled: true }
    }
  },
  props: {
    transactions: {
      type: Array,
      required: true
    }
  },
  computed: {
    getTransactions(): any {
      let _transactions = this.transactions
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
          type: 'datetime'
        },
        series: [
          {
            name: 'Transactions',
            data: this.transactions as any
          }
        ]
      }
      
      // _transactions.map((transaction: any) => {
      //   chartOptions.series[0].data.push(transaction[1] as never)
      //   chartOptions.xAxis.categories.push(transaction[0] as never)
      //   console.log(transaction[1])
      // })
      return chartOptions
    }
  }

})
</script>