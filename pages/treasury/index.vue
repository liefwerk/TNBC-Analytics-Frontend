<template>
  <div class="mt-12 mb-20 mx-6 md:mx-12">
    <div class="mb-16">
      <h1 class="text-titlelg mb-2 font-sans font-semibold font-light">Treasury Withdrawals</h1>
      <span class="text-subtitle text-pcsecondery">TNBC Withdrawed From Treasury Account</span>
    </div>

    <div class="flex flex-wrap mx-auto">
      <div class="w-full md:w-1/2">
        <div class="flex flex-wrap md:grid md:justify-items-stretch md:grid-cols-2 xl:grid-cols-3 break-words">
          <NumberCard 
            title="Balance"
            :number="treasury.balance"
            class="text-red-400" />
          <NumberCard 
            title="N° of Transactions"
            :number="treasury.total_transactions"
            class="text-blue-400" />
          <NumberCard 
            title="Last Transaction"
            :number="treasury.last_transaction_amount"
            class="text-green-400" />
        </div>
        <div>
          <DefaultCard 
            title="Public Key"
            :number="treasury.account_number"
            class="break-all" />

          <DefaultCard 
            title="Last Transaction Date"
            :number="getLastTransactionDate" />
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <TreasuryGraph />
      </div>
    </div>

    <div class="mt-10">
      <h2 class="text-titlemd mb-4 font-sans font-semibold">Transactions</h2>
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
import TreasuryGraph from '@/components/website/graphs/TreasuryGraph.vue';
import formatDateMixin from '@/mixins/formatDateMixin'

export default Vue.extend({

  components: {
    NumberCard,
    DefaultCard,
    Table,
    TreasuryGraph
  },
  data() {
    return {
      total: 0,
      previous: null,
      next: null,
      treasury: {},
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
          name: 'paid to',
          attribute: 'paidTo'
        },
        {
          name: 'github issue id',
          attribute: 'githubIssueId'
        },
        {
          name: 'recipient public key',
          attribute: 'recipientPublicKey'
        },
      ],
      items: [
        {
          date: '10th July 2021',
          amount: 3000000,
          paidTo: 'Government',
          githubIssueId: 295,
          recipientPublicKey: 'a2sa3e6re2d3adf3dfer1a3fe3r...'
        },
        {
          date: '4th July 2021',
          amount: 2000000,
          paidTo: 'Government',
          githubIssueId: 295,
          recipientPublicKey: 'a2sa3e6re2d3adf3dfer1a3fe3r...'
        },
        {
          date: '18th June  2021',
          amount: 1000000,
          paidTo: 'Government',
          githubIssueId: 295,
          recipientPublicKey: 'a2sa3e6re2d3adf3dfer1a3fe3r...'
        },
      ]
    }
  },
  mixins: [formatDateMixin],
  async asyncData({ $http }: any) {
    const _treasury: any = await $http.$get('/api/treasury')
    let treasury = _treasury.results[0]

    const _transactions: any = await $http.$get(`/api/transaction?limit=5&transaction_type=TREASURY`)
    let transactions = _transactions.results
    let total = _transactions.count
    let previous = _transactions.previous
    let next = _transactions.next
    return { treasury, transactions, total, previous, next } as any
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
      let lastTransactionDate = this.formatDate(new Date(this.treasury.last_transaction_at))
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
            paidTo: transaction.transaction_type,
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
