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
  name: 'HomeGraph',
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
            data: this.transactions
          }
        ]
      }

      return chartOptions
    }
  }

})
</script>