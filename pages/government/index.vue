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
            title="Public Key"
            :number="government.account_number"
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
        :options="tableOptions"
        :columns="columns"
        :items="getTransactions" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Table from '@/components/website/table/Table.vue';
import NumberCard from '@/components/website/cards/NumberCard.vue';
import DefaultCard from '@/components/website/cards/DefaultCard.vue';
import GovernmentGraph from '@/components/website/graphs/GovernmentGraph.vue';
import { Options } from '@/contznts/types/Table'

export default Vue.extend({

  components: {
    Table,
    NumberCard,
    DefaultCard,
    GovernmentGraph
  },
  data() {
    return {
      tableOptions: Object as Options,
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
    const _government: any = await $http.$get('https://tnbanalytics.pythonanywhere.com/government')
    let government = _government.results[0]

    const _transactions: any = await $http.$get(`https://tnbanalytics.pythonanywhere.com/transaction?limit=5&transaction_type=GOVERNMENT`)
    
    let tableOptions: Options = {
      total: _transactions.count,
      previous: _transactions.previous,
      next: _transactions.next,
      count: _transactions.results.length
    }

    let transactions = _transactions.results

    const _graphData: any = await $http.post('https://tnbanalytics.pythonanywhere.com/government-chart', { days: '31' })
      .then((res: any) => res.json())
    let graphData = _graphData.data

    return { government, transactions, tableOptions, graphData } as any
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
        const _searchTransactions = await fetch(`https://tnbanalytics.pythonanywhere.com/transaction?github_issue_id=${value}&transaction_type=GOVERNMENT`)
          .then(res => res.json())
          .catch(err => console.log(err))
          
        this.transactions = _searchTransactions.results
        this.tableOptions.previous = _searchTransactions.previous
        this.tableOptionsnext = _searchTransactions.next
      } else if (value === 0) {
        const _searchTransactions = await fetch(`https://tnbanalytics.pythonanywhere.com/transaction?limit=10&transaction_type=GOVERNMENT`)
          .then(res => res.json())
          .catch(err => console.log(err))

        this.transactions = _searchTransactions.results
        this.tableOptions.previous = _searchTransactions.previous
        this.tableOptions.next = _searchTransactions.next
      }
    },
    async handlePreviousPage(): Promise<void>  {
      
      if (this.tableOptions.previous){
        const _previousTransactions = await fetch(`${this.tableOptions.previous}`)
          .then(res => res.json())
          .catch(err => console.log(err))

        this.transactions = _previousTransactions.results
        this.tableOptions.previous = _previousTransactions.previous
        this.tableOptions.next = _previousTransactions.next
      }

    },
    async handleNextPage(): Promise<void> {
      if (this.tableOptions.next){
        const _nextTransactions = await fetch(`${this.tableOptions.next}`)
          .then(res => res.json())
          .catch(err => console.log(err))

        this.transactions = _nextTransactions.results
        this.tableOptions.previous = _nextTransactions.previous
        this.tableOptions.next = _nextTransactions.next
      }
    },
    async handleItemsChange(perPage: number): Promise<void> {
      const _newTransactions = await fetch(`https://tnbanalytics.pythonanywhere.com/transaction?limit=${perPage}&transaction_type=GOVERNMENT`)
          .then(res => res.json())
          .catch(err => console.log(err))

        this.transactions = _newTransactions.results
        this.tableOptions.previous = _newTransactions.previous
        this.tableOptions.next = _newTransactions.next
        this.tableOptions.count = this.transactions.length
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
      return _data;
    }
  }

})
</script>
