<template>
  <div class="mt-12 mb-20 mx-6 md:mx-12">
    <div class="mb-16">
      <h1 class="text-titlelg mb-2 font-sans font-semibold">Government Payments</h1>
      <span class="text-subtitle text-pcsecondery">TNBC Released From Government Account</span>
    </div>

    <div class="flex flex-wrap mx-auto">
      <div class="w-full mb-8">
        <div class="flex flex-wrap md:grid md:justify-items-stretch md:grid-cols-2 xl:grid-cols-4 gap-4 break-words">
          <NumberCard 
            title="Balance"
            :number="analytics.balance"
            class="text-red-400 self-start" />
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
            :number="analytics.lastTransactionDate"
            class="break-all w-1/2 self-start" />
        </div>
        <DefaultCard 
          title="Public Key"
          :number="government.account_number"
          class="break-all w-1/2 self-start" />
      </div>
      <div class="flex flex-wrap w-full md:grid md:justify-items-stretch md:grid-cols-2 gap-4">
        <GovernmentGraphIn :data="getFormatedInCumulatedData" @handleFilter="changeDateRange"/>
        <GovernmentGraphOut :data="getFormatedOutTransactions" @handleFilter="changeDateRange"/>
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
import GovernmentGraphIn from '~/components/website/graphs/GovernmentGraphIn.vue';
import GovernmentGraphOut from '~/components/website/graphs/GovernmentGraphOut.vue';
import { Options } from '@/constants/types/Table'
import { Government } from '@/constants/types/AnalyticsData'
import moment from 'moment'

export default Vue.extend({
  components: {
    Table,
    NumberCard,
    DefaultCard,
    GovernmentGraphIn,
    GovernmentGraphOut
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
      graphTxsIn: [],
      graphTxsCumulated: [],
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
    const txs: any = await $axios.$get(`http://54.183.16.194/bank_transactions?limit=5&account_number=${pk}&block__sender=${pk}&fee=NONE`)

    let transactions = txs.results

    let tableOptions: Options = {
      total: txs.count,
      previous: txs.previous,
      next: txs.next,
      count: txs.results.length
    }

    const gd: any = await $axios.get('http://bank.tnbexplorer.com/stats/api')
    const gd2: any = await $axios.get('http://54.183.16.194/bank_transactions?id=&account_number=&block__sender=23676c35fce177aef2412e3ab12d22bf521ed423c6f55b8922c336500a1a27c5&block__balance_key=&fee=&recipient=6e5ea8507e38be7250cde9b8ff1f7c8e39a1460de16b38e6f4d5562ae36b5c1a')

    const graphTxsCumulated = gd2.data.results
    
    let graphTxsIn = gd.data
    if (graphTxsIn && graphTxsIn.length) {
      graphTxsIn.reduce((previousTotal: number, record: any) => {
        record.changeInCoins = record.total - previousTotal;
        return record.total;
      }, 0);
    }
    const nTxs: any = await $axios.get('http://54.183.16.194/bank_transactions')
    let analytics = {
        balance: graphTxsIn[graphTxsIn.length - 1].total,
        lastTransaction:  transactions[0].amount,
        lastTransactionDate:  moment(transactions[0].block.created_date).fromNow(),
        totalOfTransactions:  nTxs.data.count,
    }

    return { government, transactions, tableOptions, graphTxsIn, analytics, graphTxsCumulated } as any
  },
  methods: {
    formatDate(dateString: any): any {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('default', { dateStyle: 'medium' } as any).format(date);
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
        // this.tableOptions.count = _previousTransactions.results.length
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
    async changeDateRange(value: any): Promise<void> {
      const _graphTxsIn: any = await fetch('https://tnbanalytics.pythonanywhere.com/government-chart', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({days: value})
      })
      .then((res: any) => res.json())
      .catch(err => console.log(err))
      this.graphTxsIn = _graphTxsIn.data
    },
    formatTransactions(unformatedTransactions): any {
      let formatedTransactions: any = []
      unformatedTransactions.map((transaction: any) => {
        const date = transaction.block.created_date
        const lastTransactionDate = moment(date).format('MMM Do, YYYY')
        const githubRegex = /(?<=PROJECT_)[\d+.-]+/
        let githubId = transaction.memo.match(githubRegex)

        const paymentForRegex = /(?<=TNB_)[\w].*?(?=_)/
        let paymentFor = transaction.memo.match(paymentForRegex)
        formatedTransactions.push(
          {
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
    getFormatedTransactions(): any {
      return this.formatTransactions(this.transactions)
    },
    getFormatedOutTransactions(): any {
      let cumulatedData: any = []
      this.graphTxsIn.forEach((data: any) => {
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
    },
    getFormatedInCumulatedData(): any {
      let _temp: any = []
      let dates: any = []
      let amounts: any = []
      let cumulatedAmounts: any = []
      
      this.graphTxsCumulated.map(function (d: any){
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
