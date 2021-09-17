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
        <GovernmentGraph :data="getFormatedData" />
      </div>
    </div>

    <div class="mt-10">
      <h2 class="text-titlemd font-sans font-semibold">Payments</h2>
      <p class="mb-4">Paid by the Government of TNBC</p>
      <Table 
        @previousPage="handlePreviousPage"
        @nextPage="handleNextPage"
        @changedMaxItems="handleItemsChange"
        @githubUserEntry="handleGitHubIdSearch"
        :total="total"
        :count="count"
        :columns="columns"
        :next="next"
        :previous="previous"
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
      count: 0,
      government: {} as any,
      transactions: [],
      graphData: [],
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
  async asyncData({ $http }: any) {
    const _government: any = await $http.$get('/api/government')
    let government = _government.results[0]

    const _transactions: any = await $http.$get(`/api/transaction?limit=10&transaction_type=GOVERNMENT`)
    let transactions = _transactions.results
    let total = _transactions.count
    let previous = _transactions.previous
    let next = _transactions.next
    let count = transactions.length

    const _graphData: any = await $http.post('api/government-chart', { days: '31' })
      .then((res: any) => res.json())
    let graphData = _graphData.data

    return { government, transactions, total, previous, next, count, graphData } as any
  },
  methods: {
    formatDate(dateString: any): any {
      const date = new Date(dateString);
      // Then specify how you want your dates to be formatted
      return new Intl.DateTimeFormat('default', { dateStyle: 'medium' } as any).format(date);
    },
    async handleGitHubIdSearch(event: any): Promise<void> {
      let value: number = Number(event.target.value as string)
      if (value > 0){
        const _searchTransactions = await fetch(`/api/transaction?github_issue_id=${value}&transaction_type=GOVERNMENT`)
          .then(res => res.json())
          .catch(err => console.log(err))
          
        this.transactions = _searchTransactions.results
        this.previous = _searchTransactions.previous
        this.next = _searchTransactions.next
      } else if (value === 0) {
        const _searchTransactions = await fetch(`/api/transaction?limit=10&transaction_type=GOVERNMENT`)
          .then(res => res.json())
          .catch(err => console.log(err))

        this.transactions = _searchTransactions.results
        this.previous = _searchTransactions.previous
        this.next = _searchTransactions.next
      }
    },
    async handlePreviousPage(): Promise<void>  {
      
      if (this.previous){
        const _previousTransactions = await fetch(`${this.previous}`)
          .then(res => res.json())
          .catch(err => console.log(err))

        this.transactions = _previousTransactions.results
        this.previous = _previousTransactions.previous
        this.next = _previousTransactions.next
      }

    },
    async handleNextPage(): Promise<void> {
      if (this.next){
        const _nextTransactions = await fetch(`${this.next}`)
          .then(res => res.json())
          .catch(err => console.log(err))

        this.transactions = _nextTransactions.results
        this.previous = _nextTransactions.previous
        this.next = _nextTransactions.next
      }
    },
    async handleItemsChange(perPage: number): Promise<void> {
      const _newTransactions = await fetch(`/api/transaction?limit=${perPage}&transaction_type=GOVERNMENT`)
          .then(res => res.json())
          .catch(err => console.log(err))

        this.transactions = _newTransactions.results
        this.previous = _newTransactions.previous
        this.next = _newTransactions.next
        this.count = this.transactions.length
    }
  },
  computed: {
    getLastTransactionDate(): any {
      let lastTransactionDate: any = this.formatDate(new Date(this.government.last_transaction_at))
      return lastTransactionDate
    },
    getTransactions(): any {
      let transactions: object[] = []
      let _transactions: any = this.transactions.map((transaction: any) => {
        let lastTransactionDate = this.formatDate(new Date(transaction.txs_sent_at))
        transactions.push(
          {
            date: lastTransactionDate,
            amount: transaction.amount,
            githubIssueId: transaction.github_issue_id,
            recipientPublicKey: transaction.recipient_account_number
          }
        )
      })
      return transactions
    },
    getFormatedData(): any {
      const _data = this.graphData.map((d: any) => (
        [ Date.parse(d[0] as string), d[1] ]
      ))
      console.log(_data)
      return _data;
    }
  }

})
</script>
