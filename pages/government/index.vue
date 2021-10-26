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
        <GovernmentGraph :data="getFormatedData" @handleFilter="changeDateRange"/>
      </div>
    </div>

    <div class="mt-10">
      <h2 class="text-titlemd font-sans font-semibold">Payments</h2>
      <p class="mb-4">Paid by the Government of TNBC</p>
      <Table
        @previousPage="handlePreviousPage"
        @nextPage="handleNextPage"
        @changePageOffset="handlePageOffset"
        @changePerPage="handlePerPageChange"
        @githubUserEntry="handleGitHubIdSearch"
        :options="tableOptions"
        :columns="columns"
        :items="getFormatedTransactions" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Table from '@/components/website/table/Table.vue';
import NumberCard from '@/components/website/cards/NumberCard.vue';
import DefaultCard from '@/components/website/cards/DefaultCard.vue';
import GovernmentGraph from '@/components/website/graphs/GovernmentGraph.vue';
import { Options } from '@/constants/types/Table'
import { Transaction } from '@/constants/types/Graph'
import { Government } from '@/constants/types/AnalyticsData'
import moment from 'moment'

export default Vue.extend({
  components: {
    Table,
    NumberCard,
    DefaultCard,
    GovernmentGraph
  },
  data() {
    return {
      transactionUrl: {
        protocol: 'http',
        bank: '54.183.16.194',
        publicKey: '6e5ea8507e38be7250cde9b8ff1f7c8e39a1460de16b38e6f4d5562ae36b5c1a'
      },
      tableOptions: {} as Options,
      government: {} as Government,
      transactions: [] as Array<Transaction>,
      filteredTransactions: [],
      graphData: [],
      perPage: 5,
      pageOffset: 0,
      columns: [
        {
          name: 'id',
          attribute: 'id'
        },
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
          name: 'payment for',
          attribute: 'paymentFor'
        },
        {
          name: 'recipient public key',
          attribute: 'recipientPublicKey'
        },
      ]
    }
  },
  async asyncData({ $http, $axios }: any) {
    const _government: any = await $http.$get('https://tnbanalytics.pythonanywhere.com/government')
    let government = _government[0]

    const pk = '6e5ea8507e38be7250cde9b8ff1f7c8e39a1460de16b38e6f4d5562ae36b5c1a'
    const txs: any = await $axios.$get(`/api2/?account_number=${pk}`)

    let transactions = txs.results

    let tableOptions: Options = {
      total: txs.count,
      previous: txs.previous,
      next: txs.next,
      count: txs.results.length
    }

    const gd: any = await $axios.get('/bank/?format=json&ordering=date')

    let graphData = gd.data

    if (graphData && graphData.length) {
      graphData.reduce((previousTotal: number, record: any) => {
        record.changeInCoins = record.total - previousTotal;
        return record.total;
      }, 0);
    }

    return { government, transactions, tableOptions, graphData } as any
  },
  mounted() {
    let filteredTransactions = this.transactions.filter((transaction: any) => transaction.amount !== 1)
    this.fetchNextTransactionsUntilComplete(filteredTransactions)
  },
  methods: {
    async fetchPreviousTransactionsUntilComplete(transactions): Promise<any> {
      const perPage = this.perPage
      let transactionsLength = transactions.length
      
      while (transactionsLength < perPage) {
        
        let page: any = this.tableOptions.previous
        if (page === null || page === 'null') {
          break;
        } else {
          await fetch(page)
            .then((res: any) => res.json())
            .then((res) => {
              this.tableOptions.next = res.next
              this.tableOptions.previous = res.previous
              this.tableOptions.count = res.results.length

              let filteredTransactions = res.results.filter((transaction: any) => transaction.amount !== 1)

              filteredTransactions.map((txs) => transactions.push(txs))

              transactionsLength = transactions.length
            })
            .catch(err => {
              console.log(err)
            })
        } 
      }
      this.filteredTransactions = (transactionsLength > this.perPage) ? transactions.slice(0, this.perPage) : transactions
      return this.filteredTransactions
    },
    async fetchNextTransactionsUntilComplete(transactions): Promise<any> {
      const perPage = this.perPage
      let transactionsLength = transactions.length
      const url = this.transactionUrl
      const link = 
        `${url.protocol}://${url.bank}/bank_transactions?limit=${this.perPage}&account_number=${url.publicKey}`
      
      let stop = 0
      let arrayofIds: any = []
      while (transactionsLength < perPage) {
        
        let page: any = this.tableOptions.next
        let toFetch: any = (this.tableOptions.count == this.perPage) ? page : link
        await fetch(toFetch)
          .then((res: any) => res.json())
          .then((res) => {
            this.tableOptions.next = res.next
            this.tableOptions.previous = res.previous
            this.tableOptions.count = res.results.length
            let filteredTransactions = res.results.filter((transaction: any) => transaction.amount !== 1)
            transactions.forEach((transaction) => arrayofIds.push(transaction.id))

            filteredTransactions.map((txs: any) => {
              if (!arrayofIds.includes(txs.id)) {
                arrayofIds.push(txs.id)
                transactions.push(txs)
              } else {
                stop++
              }
            })
            transactionsLength = transactions.length
          })
          .catch(err => console.log(err))

          if (stop > 10) {
            break;
          }
          
      }

      this.filteredTransactions = (transactionsLength > this.perPage) ? transactions.slice(0, this.perPage) : transactions
      return this.filteredTransactions
    },
    formatDate(dateString: any): any {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('default', { dateStyle: 'medium' } as any).format(date);
    },
    async handleGitHubIdSearch(event: any): Promise<void> {
      // let value: number = Number(event.target.value as string)
      // if (value > 0){
      //   const url = this.transactionUrl
      //   const link = 
      //   `${url.protocol}://${url.bank}/bank_transactions?limit=${this.perPage}&account_number=${url.publicKey}`

      //   // const _searchTransactions = 
      //   await fetch(link)
      //     .then(res => res.json())
      //     .catch(err => console.log(err))
          
      //   this.transactions = _searchTransactions.results
      //   this.tableOptions.previous = _searchTransactions.previous
      //   this.tableOptions.next = _searchTransactions.next

      // } else if (value === 0) {
      //   const url = this.transactionUrl
      //   const link = 
      //   `${url.protocol}://${url.bank}/bank_transactions?limit=${this.perPage}&${this.pageOffset}&account_number=${url.publicKey}`
      //   const _searchTransactions =
      //   await fetch(link)
      //     .then(res => res.json())
      //     .catch(err => console.log(err))

      //   this.transactions = _searchTransactions.results
      //   this.tableOptions.previous = _searchTransactions.previous
      //   this.tableOptions.next = _searchTransactions.next
      // }
    },
    async handlePreviousPage(): Promise<void>  {
      if (this.tableOptions.previous){
        const _previousTransactions = await fetch(`${this.tableOptions.previous}`)
          .then(res => res.json())
          .catch(err => console.log(err))

        this.transactions = _previousTransactions.results.filter((transaction: any) => transaction.amount !== 1)
        this.fetchPreviousTransactionsUntilComplete(this.transactions)
      }

    },
    async handleNextPage(): Promise<void> {
      if (this.tableOptions.next){
        const _nextTransactions = await fetch(`${this.tableOptions.next}`)
          .then(res => res.json())
          .catch(err => console.log(err))

        this.transactions = _nextTransactions.results.filter((transaction: any) => transaction.amount !== 1)
        this.fetchNextTransactionsUntilComplete(this.transactions)
      }
    },
    async handlePageOffset(offset: number): Promise<void> {
      const url = this.transactionUrl
      const link = 
      `${url.protocol}://${url.bank}/bank_transactions?limit=${this.perPage}&offset=${offset}&account_number=${url.publicKey}`

      const _transactions = await fetch(link)
        .then(res => res.json())
        .catch(err => console.log(err))
        
      this.pageOffset = offset
      this.transactions = _transactions.results
      this.tableOptions.previous = _transactions.previous
      this.tableOptions.next = _transactions.next
      this.tableOptions.next = _transactions.next
    },
    async handlePerPageChange(perPage: number): Promise<void> {
      const url = this.transactionUrl
      const link = 
      `${url.protocol}://${url.bank}/bank_transactions?limit=${perPage}&offset=${this.pageOffset}&account_number=${url.publicKey}`

      const _newTransactions = await fetch(link)
          .then(res => res.json())
          .catch(err => console.log(err))

      this.perPage = perPage
      this.transactions = _newTransactions.results.filter((transaction: any) => transaction.amount !== 1)
      this.fetchNextTransactionsUntilComplete(this.transactions).then((res) => this.formatTransactions(res))
      
    },
    async changeDateRange(value: any): Promise<void> {
      const _graphData: any = await fetch('https://tnbanalytics.pythonanywhere.com/government-chart', { 
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
      console.log(unformatedTransactions)
      unformatedTransactions.map((transaction: any) => {
          const date = transaction.block.created_date
          const lastTransactionDate = moment(date).format('MMM Do, YYYY')
          const githubRegex = /(?<=PROJECT_)[\d+.-]+/
          let githubId = transaction.memo.match(githubRegex)

          const paymentForRegex = /(?<=TNB_)[\w].*?(?=_)/
          let paymentFor = transaction.memo.match(paymentForRegex)
          formatedTransactions.push(
            {
              id: transaction.id,
              date: lastTransactionDate,
              amount: transaction.amount,
              githubIssueId: githubId ? githubId[0] : null,
              paymentFor: paymentFor ? paymentFor[0] : null,
              recipientPublicKey: transaction.recipient
            }
          )
      })
      return formatedTransactions
    }
  },
  computed: {
    getLastTransactionDate(): any {
      const dateFromNow = moment(this.government.last_transaction_at).fromNow()
      return dateFromNow
    },
    getFormatedTransactions(): any {
      return this.formatTransactions(this.filteredTransactions)
    },
    getFormatedData(): any {
      let cumulatedData: any = []
      console.log(this.graphData)
      this.graphData.forEach((data: any) => {
        const date = moment.utc(data.date).format()
        const formatedDate = moment(data.date).valueOf()
        if (cumulatedData.length === 0) {
          cumulatedData.push([
            formatedDate,
            data.changeInCoins,
          ]);
        } else {
          const prev = cumulatedData[cumulatedData.length - 1]
          if (prev[0] !== date) {

            cumulatedData.push([
              formatedDate,
              data.changeInCoins,
            ]);
          } else {
            prev.changeInCoins += data.changeInCoins;
          }
        }
      })
      return cumulatedData;
    }
  }

})
</script>
