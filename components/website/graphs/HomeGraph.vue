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
        next: null,
        previous: null,
        results: [],
      }
    }
  },
  mixins: [formatDateMixin],
  async fetch() {
    this.transactions = await fetch('api/transaction?limit=50')
      .then((res) => res.json())
      .catch(err => console.log(err))
  },
  computed: {
    getTransactions() {
      let _transactions = this.transactions.results
      let chartOptions: any =
      {
        chart: {
          type: 'areaspline'
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
        chartOptions.series[0].data.push(transaction.amount as never)

        let formated_created_date = ''
        formated_created_date = this.formatDate(new Date(transaction.created_at))
        chartOptions.xAxis.categories.push(formated_created_date as never)
      })
      return chartOptions
    },
    getTransactionTime(){
      let _transactions = this.transactions.results
      let dates = []
      let formated_created_date = ''
       _transactions.map((transaction: Transaction) => {
      
        if (transaction.created_at !== null)
          formated_created_date = this.formatDate(new Date(transaction.created_at))

        dates.push(formated_created_date)  
      })
      return dates
    }
  }

})
</script>