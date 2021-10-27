<template>
  <div>
    <div class="mt-12 mb-20 mx-6 md:mx-12">
      <div class="mb-16">
        <h1 class="text-titlelg mb-2 font-sans font-semibold">Treasury Withdrawals</h1>
        <span class="text-subtitle text-pcsecondery">TNBC Withdrawed From Treasury Account</span>
      </div>

      <div class="flex flex-wrap mx-auto">
        <div class="w-full mb-8">
          <div class="flex flex-wrap md:grid md:justify-items-stretch md:grid-cols-2 xl:grid-cols-4 gap-4 break-words">
            <NumberCard 
              title="Balance"
              :number="treasury.balance"
              class="text-red-400" />
            <NumberCard 
              title="N° of Transactions"
              :number="analytics.totalOfTransactions"
              class="text-blue-400 self-start" />
            <NumberCard 
              title="Last Transaction"
              :number="analytics.lastTransaction"
             class="text-green-400 self-start" />
            <DefaultCard 
              title="Last Transaction Date"
              :number="analytics.lastTransactionDate" />
          </div>
          <DefaultCard 
            title="Public Key"
            :number="treasury.account_number"
            class="break-all" />
        </div>
        <div class="flex flex-wrap w-full md:grid md:justify-items-stretch md:grid-cols-2 gap-4">
          <TreasuryGraph :data="getFormatedData" />
          <TreasuryGraphCumulated :data="getFormatedCumulatedData" />
        </div>
      </div>

      <div class="mt-10">
        <h2 class="text-titlemd font-sans font-semibold">Withdrawals</h2>
        <p class="mb-4">Withdrawed from the Government's treasury</p>
        <Table
          @previousPage="handlePreviousPage"
          @nextPage="handleNextPage"
          @changePageOffset="handlePageOffset"
          @changedMaxItems="handleItemsChange"
          @githubUserEntry="handleGitHubIdSearch"
          :options="tableOptions"
          :columns="columns"
          :items="getTransactions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Table from '@/components/website/table/Table.vue';
import NumberCard from '@/components/website/cards/NumberCard.vue';
import DefaultCard from '@/components/website/cards/DefaultCard.vue';
import TreasuryGraph from '@/components/website/graphs/TreasuryGraph.vue';
import TreasuryGraphCumulated from '@/components/website/graphs/TreasuryGraphCumulated.vue';
import { Options } from '@/constants/types/Table'
import { Transaction } from '@/constants/types/Graph'
import { Treasury } from '@/constants/types/AnalyticsData'
import moment from 'moment'

export default Vue.extend({
  components: {
    Table,
    NumberCard,
    DefaultCard,
    TreasuryGraph,
    TreasuryGraphCumulated
  },
  data() {
    return {
      transactionUrl: {
        protocol: 'http',
        bank: '54.183.16.194',
        publicKey: '23676c35fce177aef2412e3ab12d22bf521ed423c6f55b8922c336500a1a27c5'
      },
      tableOptions: {} as Options,
      treasury: {} as Treasury,
      transactions: [] as Array<Transaction>,
      analytics: {},
      graphData: [],
      perPage: 5,
      pageOffset: 0,
      transactionType: 'transaction_type=TREASURY',
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
          name: 'recipient public key',
          attribute: 'recipientPublicKey'
        },
      ]
    }
  },
  async asyncData({ $http }: any) {
    const _treasury: any = await $http.$get('https://tnbanalytics.pythonanywhere.com/treasury')
    let treasury = _treasury[0]

    const pk = '23676c35fce177aef2412e3ab12d22bf521ed423c6f55b8922c336500a1a27c5'
    const _transactions: any =
    await $http.$get(`http://54.183.16.194/bank_transactions?limit=5&account_number=${pk}&block__sender=${pk}&fee=NONE`)
    
    let transactions = _transactions.results
    
    let tableOptions: Options = {
      total: _transactions.count,
      previous: _transactions.previous,
      next: _transactions.next,
      count: _transactions.results.length
    }

    // const _graphData: any = await $http.get(`http://54.183.16.194/bank_transactions?limit=5&account_number=${pk}&block__sender=${pk}&fee=NONE`)

    let graphData = _transactions.results

    let analytics = {
        balance:  9900,
        lastTransaction:  transactions[0].amount,
        lastTransactionDate:  moment(transactions[0].block.created_date).fromNow(),
        totalOfTransactions:  tableOptions.total,
    }

    return { treasury, transactions, tableOptions, graphData, analytics } as any
  },
  methods: {
    async handleGitHubIdSearch(event: any): Promise<void> {
      let value: number = Number(event.target.value as string)
      if (value > 0){
        const _searchTransactions = await fetch(`https://tnbanalytics.pythonanywhere.com/transaction?github_issue_id=${value}&${this.transactionType}`)
          .then(res => res.json())
          .catch(err => console.log(err))
          
        this.transactions = _searchTransactions.results
        this.tableOptions.previous = _searchTransactions.previous
        this.tableOptions.next = _searchTransactions.next
      } else if (value === 0) {
        const _searchTransactions = await fetch(`https://tnbanalytics.pythonanywhere.com/transaction?limit=${this.perPage}&offset=${this.pageOffset}&${this.transactionType}`)
          .then(res => res.json())
          .catch(err => console.log(err))

        this.transactions = _searchTransactions.results
        this.tableOptions.previous = _searchTransactions.previous
        this.tableOptions.next = _searchTransactions.next
      }
    },
    async handlePreviousPage(): Promise<void> {
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
    async handlePageOffset(offset: number, perPage: number): Promise<void> {
      console.log('received emit from function', offset, perPage)
      const _transactions = await fetch(`https://tnbanalytics.pythonanywhere.com/transaction?limit=${this.perPage}&offset=${offset}&${this.transactionType}`)
        .then(res => res.json())
        .catch(err => console.log(err))

      this.pageOffset = offset
      this.transactions = _transactions.results
      this.tableOptions.previous = _transactions.previous
      this.tableOptions.next = _transactions.next
    },
    async handleItemsChange(perPage: number): Promise<void> {
      const _newTransactions = await fetch(`https://tnbanalytics.pythonanywhere.com/transaction?limit=${perPage}&offset=${this.pageOffset}&${this.transactionType}`)
          .then(res => res.json())
          .catch(err => console.log(err))

        this.perPage = perPage
        this.transactions = _newTransactions.results
        this.tableOptions.previous = _newTransactions.previous
        this.tableOptions.next = _newTransactions.next
        this.tableOptions.count = this.transactions.length
    },
    async changeDateRange(value: any): Promise<void> {
      const _graphData: any = await fetch('https://tnbanalytics.pythonanywhere.com/treasury-chart', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({days: value})
      })
      .then((res: any) => res.json())
      .catch(err => console.log(err))
      this.graphData = _graphData.data
    },
    formatTransactions(unformatedTransactions): any {
      let formatedTransactions: any = []
      unformatedTransactions
        .map((transaction: any) => {
          const date = transaction.block.created_date
          const lastTransactionDate = moment(date).format('MMM Do, YYYY')
        
          formatedTransactions.push(
            {
              date: lastTransactionDate,
              amount: transaction.amount,
              recipientPublicKey: transaction.recipient
            }
          )
        })
      return formatedTransactions
    }
  },
  computed: {
    getLastTransactionDate(): any {
      const dateFromNow = moment(this.treasury.last_transaction_at).fromNow()
      return dateFromNow
    },
    getTransactions(): any {
      return this.formatTransactions(this.transactions)
    },
    getFormatedData(): any {
      let _: any = []
      this.graphData.map(function (d: any){
        const formatedDate = moment(d.block.created_date).valueOf()
        _.push([formatedDate, d.amount])
      })
      return _;
    },
    getFormatedCumulatedData(): any {
      let _temp: any = []
      let dates: any = []
      let amounts: any = []
      let cumulatedAmounts: any = []
      
      this.graphData.map(function (d: any){
        const formatedDate = moment(d.block.created_date).valueOf()
        _temp.push(formatedDate)
        dates = [].concat(_temp as any).reverse()
        amounts.push(d.amount)
        amounts.reverse()
      })
      amounts.reduce(function (prev: number, curr: number) {
        cumulatedAmounts.push(prev + curr)
        return prev + curr
      }, 0)
      return dates.map((date, index) => [date, cumulatedAmounts[index]])
    }
  }

})
</script>
