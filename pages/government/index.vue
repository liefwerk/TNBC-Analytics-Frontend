<template>
  <div class="mt-12 mb-20 mx-6 md:mx-12">
    <div class="mb-16">
      <h1 class="text-titlelg mb-2 font-sans font-semibold">Government Payments</h1>
      <span class="text-subtitle text-pcsecondery">TNBC Released From Government Account</span>
    </div>

    <div class="flex flex-wrap mx-auto">
      <div class="w-full md:w-1/2">
        <div class="flex flex-wrap md:grid md:justify-items-stretch md:grid-cols-2 xl:grid-cols-3 break-words">
          <NumberCard 
            title="Balance"
            :number="government.balance"
            class="text-red-400" />
          <NumberCard 
            title="N° of Transactions"
            :number="government.total_transactions"
            class="text-blue-400" />
          <NumberCard 
            title="Last Transaction"
            :number="government.last_transaction_amount"
            class="text-green-400" />
        </div>
        <div>
          <DefaultCard 
            title="Total TNBC Spent"
            :number="government.total_tnbc_spent"
            class="break-all" />

          <DefaultCard 
            title="Last Transaction Date"
            :number="getLastTransactionDate" />
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <GovernmentGraph />
      </div>
    </div>

    <div class="mt-10">
      <h2 class="text-titlemd font-sans font-semibold">Payments</h2>
      <p class="mb-4">Paid by the Government of TNBC</p>
      <Table 
        @previousPage="handlePreviousPage"
        @nextPage="handleNextPage"
        :total="total"
        :columns="columns" 
        :items="getTransactions" />
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import DefaultCard from '@/components/website/cards/DefaultCard.vue';
import NumberCard from '@/components/website/cards/NumberCard.vue';
import Table from '@/components/website/table/Table.vue';
import GovernmentGraph from '@/components/website/graphs/GovernmentGraph.vue';
import formatDateMixin from '@/mixins/formatDateMixin'

export default Vue.extend({

  components: {
    NumberCard,
    DefaultCard,
    Table,
    GovernmentGraph
  },
  data() {
    return {
      total: 0,
      previous: null,
      next: null,
      government: {},
      transactions: [],
      columns: [
        {
          name: 'date',
          attribute: 'date'
        },
        {
          name: 'amount',
          attribute: 'amount'
        },
        {
          name: 'github issue id',
          attribute: 'githubIssueId'
        },
        {
          name: 'recipient public key',
          attribute: 'recipientPublicKey'
        },
      ]
    }
  },
  mixins: [formatDateMixin],
  async asyncData({ $http }: any) {
    const _government: any = await $http.$get('/api/government')
    let government = _government.results[0]

    const _transactions: any = await $http.$get(`/api/transaction?limit=30&transaction_type=GOVERNMENT`)
    let transactions = _transactions.results
    let total = _transactions.count
    let previous = _transactions.previous
    let next = _transactions.next
    return { government, transactions, total, previous, next } as any
  },
  methods: {
    async handlePreviousPage() {
      
      if (this.previous){
        const _previousTransactions = await fetch(`${this.previous}`)
          .then(res => res.json())
          .catch(err => console.log(err))

        this.transactions = _previousTransactions.results
        this.previous = _previousTransactions.previous
        this.next = _previousTransactions.next
      }

    },
    async handleNextPage() {
      if (this.next){
        const _nextTransactions = await fetch(`${this.next}`)
          .then(res => res.json())
          .catch(err => console.log(err))

        this.transactions = _nextTransactions.results
        this.previous = _nextTransactions.previous
        this.next = _nextTransactions.next
      }
    }
  },
  computed: {
    getLastTransactionDate(){
      let lastTransactionDate = this.formatDate(new Date(this.government.last_transaction_at))
      return lastTransactionDate
    },
    getTransactions(){
      let _transactions = []
      // console.log(this.transactions)
      this.transactions.map((transaction) => {
        let lastTransactionDate = this.formatDate(new Date(transaction.txs_sent_at))
        _transactions.push(
          {
            date: lastTransactionDate,
            amount: transaction.amount,
            githubIssueId: transaction.github_issue_id,
            recipientPublicKey: transaction.recipient_account_number
          }
        )
      })
      // return ''
      return _transactions
    }
  }

})
</script>
