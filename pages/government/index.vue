<template>
  <div class="mt-12 mb-20 mx-6 md:mx-12">
    <div class="mb-16">
      <h1 class="text-titlelg mb-2 font-sans font-semibold">Government</h1>
      <span class="text-subtitle text-pcsecondery">TNBC withdrawal and distribution information</span>
    </div>

    <div class="flex flex-wrap mx-auto">
      <div class="w-full mb-8">
        <div class="flex flex-wrap md:grid md:justify-items-stretch md:grid-cols-2 xl:grid-cols-4 gap-4 break-words">
          <NumberCard 
            title="Balance"
            :number="analytics.balance"
            class="text-red-400 self-start" />
          <NumberCard 
            title="Number of Transactions"
            :number="analytics.totalOfTransactions"
            class="text-blue-400 self-start" />
          <NumberCard 
            title="Last Transaction Amount"
            :number="analytics.lastTransaction"
            class="text-green-400 self-start" />
          <DefaultCard 
            title="Last Transaction Date"
            :number="analytics.lastTransactionDate"
            class="break-all w-1/2 self-start" />
        </div>
        <div class="flex flex-wrap w-full md:grid md:justify-items-stretch md:grid-cols-2 gap-4">
          <DefaultCard 
            title="Public Key"
            :number="government.account_number"
            class="break-all w-1/2 self-start" />
          <DefaultCard 
            title="Last Transaction's Recipient's Key"
            :number="analytics.lastTransactionKey"
            class="break-all" />
        </div>
      </div>
      <div class="flex flex-wrap w-full md:grid md:justify-items-stretch md:grid-cols-2 gap-4">
        <LazyPaymentReceivedGovGraph />
        <LazyPaymentsSentGovPieGraph />
      </div>
    </div>

    <div class="mt-10">
      <h2 class="text-titlemd font-sans font-semibold">Distributions</h2>
      <p class="mb-4">TNBC distributed to the contributors</p>
      <Table
        @previousPage="handlePreviousPage"
        @nextPage="handleNextPage"
        @changePageOffset="handlePageOffset"
        @changePerPage="handlePerPageChange"
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
import LazyPaymentReceivedGovGraph from '~/components/website/graphs/PaymentsReceivedGovGraph.vue';
import LazyPaymentsSentGovPieGraph from '~/components/website/graphs/PaymentsSentGovPieGraph.vue';
import { Options } from '@/types/Table'
import { Government } from '@/types/TnbAnalyticsApi'
import { ExplorerTransaction } from "@/types/TnbExplorerApi"
import moment from 'moment'

export default Vue.extend({
  components: {
    Table,
    NumberCard,
    DefaultCard,
    LazyPaymentReceivedGovGraph,
    LazyPaymentsSentGovPieGraph
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
      transactions: [] as Array<any>,
      analytics: {},
      sentTxs: {} as Array<ExplorerTransaction>,
      receivedTxs: [],
      numberOfTransactions: 0,
      perPage: 5,
      pageOffset: 0,
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
          attribute: 'githubLink'
        },
        {
          name: 'purpose',
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
    const txs: any = await $axios.$get(`http://54.183.16.194/bank_transactions?limit=5&account_number=${pk}&block__sender=${pk}&fee=NONE`)

    let transactions = txs.results

    let tableOptions: Options = {
      total: txs.count,
      previous: txs.previous,
      next: txs.next,
      count: txs.results.length
    }

    const _balance = await $http.$get(`http://54.219.234.129/accounts/${pk}/balance`)
    const totalTxs: any = await $axios.get(`http://54.183.16.194/bank_transactions?account_number=${pk}&limit=1`)

    let analytics = {
      balance: _balance.balance,
      lastTransaction:  transactions[0].amount,
      lastTransactionDate:  moment(transactions[0].block.created_date).fromNow(),
      totalOfTransactions:  totalTxs.data.count,
      lastTransactionKey: transactions[0].recipient
    }

    return { government, transactions, tableOptions, analytics } as any
  },
  methods: {
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
    async handlePageOffset(offset: number): Promise<void> {
      const url = this.transactionUrl
      const link = 
      `${url.protocol}://${url.bank}/bank_transactions?limit=${this.perPage}&offset=${offset}&account_number=${url.publicKey}&fee=NONE`

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
      `${url.protocol}://${url.bank}/bank_transactions?limit=${perPage}&offset=${this.pageOffset}&account_number=${url.publicKey}&fee=NONE`

      const _newTransactions = await fetch(link)
          .then(res => res.json())
          .catch(err => console.log(err))

      this.perPage = perPage
      this.transactions = _newTransactions.results
      this.tableOptions.previous = _newTransactions.previous
      this.tableOptions.next = _newTransactions.next
      this.tableOptions.count = _newTransactions.results.length
      
    },
    prepareGithubIssue(type: string, issueId: number): any {
      let url: null | string = null
      switch(type){
        case 'PROJECT':
          return url = `https://github.com/thenewboston-developers/Projects/issues/${issueId}`
        case 'BOUNTY':
          return url = `https://github.com/thenewboston-developers/Website/issues/${issueId}`
        case 'TS':
          return url = `https://github.com/thenewboston-developers/Website/issues/${issueId}`
        default:
          return url = null
      }
    },
    formatTransactions(unformatedTransactions): any {
      let formatedTransactions: any = []
      unformatedTransactions.map((transaction: any) => {
        const date = transaction.block.created_date
        const lastTransactionDate = moment(date).format('MMM Do, YYYY')
        const githubRegex = /(?<=PROJECT_|BOUNTY_|TS_)[\d+.-]+/
        let githubId = transaction.memo.match(githubRegex)

        const paymentForRegex = /(?<=TNB_)[\w].*?(?=_)/
        let paymentFor = transaction.memo.match(paymentForRegex)

        formatedTransactions.push(
          {
            date: lastTransactionDate,
            amount: transaction.amount,
            githubLink: githubId ? {id: githubId[0], url: this.prepareGithubIssue(paymentFor[0], githubId[0])} : null,
            paymentFor: paymentFor ? paymentFor[0] : null,
            recipientPublicKey: transaction.recipient
          }
        )
      })
      return formatedTransactions
    }
  },
  computed: {
    getFormatedTransactions(): any {
      return this.formatTransactions(this.transactions)
    }
  }

})
</script>
