<template>
  <div>
    <highcharts 
      :constructor-type="'stockChart'" 
      :options="getTransactionAmount" 
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
  name: 'HomeGraph',
  data(){
    return {
      navigator: { enabled: false },
      transactions: {
        count: null,
        next: null,
        previous: null,
        results: [],
      }
    }
  },
  async fetch() {
    this.transactions = await fetch('api/transaction')
      .then((res) => res.json())
      .catch(err => console.log(err))
  },
  computed: {
    getTransactionAmount() {
      let _transactions = this.transactions.results
      let chartOptions: any =
      {
        series: [
          {
            type: 'areaspline',
            data: [] as any
          }
        ]
      }
      
      _transactions.map((transaction: Transaction) => {
        chartOptions.series[0].data.push(transaction.amount as never)
      })
      return chartOptions
    }
  }

})
</script>