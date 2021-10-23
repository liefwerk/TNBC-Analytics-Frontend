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
        <!-- {{ getFormatedData }} -->
      </div>
    </div>

    <div class="mt-10">
      <h2 class="text-titlemd font-sans font-semibold">Payments</h2>
      <p class="mb-4">Paid by the Government of TNBC</p>
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
      graphData: [],
      perPage: 5,
      pageOffset: 0,
      transactionType: 'transaction_type=GOVERNMENT',
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
    let government = _government[0]

    const pk = '6e5ea8507e38be7250cde9b8ff1f7c8e39a1460de16b38e6f4d5562ae36b5c1a'
    const txs: any = 
    await $http.$get(`http://54.183.16.194/bank_transactions?limit=5&account_number=${pk}`)

    let transactions = txs.results

    let tableOptions: Options = {
      total: txs.count,
      previous: txs.previous,
      next: txs.next,
      count: txs.results.length
    }

    const gd: any = await $http.get('http://bank.tnbexplorer.com/stats/api/?format=json&ordering=date')
      .then((res: any) => res.json())

    if (gd && gd.length) {
      gd.reduce((previousTotal: number, record: any) => {
        record.changeInCoins = record.total - previousTotal;
        return record.total;
      }, 0);
    }
    let graphData = gd

    return { government, transactions, tableOptions, graphData } as any
  },
  methods: {
    async handleGitHubIdSearch(event: any): Promise<void> {
      let value: number = Number(event.target.value as string)
      if (value > 0){
        const _searchTransactions = 
        await fetch(`https://tnbanalytics.pythonanywhere.com/transaction?github_issue_id=${value}&${this.transactionType}`)
          .then(res => res.json())
          .catch(err => console.log(err))
          
        this.transactions = _searchTransactions.results
        this.tableOptions.previous = _searchTransactions.previous
        this.tableOptions.next = _searchTransactions.next
      } else if (value === 0) {
        const _searchTransactions =
        await fetch(`https://tnbanalytics.pythonanywhere.com/transaction?limit=${this.perPage}&offset=${this.pageOffset}&${this.transactionType}`)
          .then(res => res.json())
          .catch(err => console.log(err))

        this.transactions = _searchTransactions.results
        this.tableOptions.previous = _searchTransactions.previous
        this.tableOptions.next = _searchTransactions.next
      }
    },
    async handlePreviousPage(): Promise<void>  {
      
      if (this.tableOptions.previous){
        const _previousTransactions =await fetch(`${this.tableOptions.previous}`)
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
      `${url.protocol}://${url.bank}/bank_transactions?limit=${this.perPage}&offset=${offset}&account_number=${url.publicKey}`

      const _transactions = await fetch(link)
        .then(res => res.json())
        .catch(err => console.log(err))
        
      this.pageOffset = offset
      this.transactions = _transactions.results
      this.tableOptions.previous = _transactions.previous
      this.tableOptions.next = _transactions.next
    },
    async handleItemsChange(perPage: number): Promise<void> {
      const url = this.transactionUrl
      const link = 
      `${url.protocol}://${url.bank}/bank_transactions?limit=${perPage}&offset=${this.pageOffset}&account_number=${url.publicKey}`

      const _newTransactions = await fetch(link)
          .then(res => res.json())
          .catch(err => console.log(err))

      this.perPage = perPage
      this.transactions = _newTransactions.results
      this.tableOptions.previous = _newTransactions.previous
      this.tableOptions.next = _newTransactions.next
      this.tableOptions.count = this.transactions.length
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
    }
  },
  computed: {
    getLastTransactionDate(): any {
      const dateFromNow = moment(this.government.last_transaction_at).fromNow()
      return dateFromNow
    },
    getTransactions(): any {
      let transactions: object[] = []
      const filteredTransactions = this.transactions.filter((transaction: any) => transaction.block.sender == this.transactionUrl.publicKey)
      this.transactions.map((transaction: any) => {
        const date = transaction.block.created_date
        const lastTransactionDate = moment(date).format('MMM Do, YYYY')
        const regex = /(?<=PROJECT_)[\d+.-]+/
        let githubId = transaction.memo.match(regex)
        transactions.push(
          {
            date: lastTransactionDate,
            amount: transaction.amount,
            githubIssueId: githubId ? githubId[0] : null,
            recipientPublicKey: transaction.recipient
          }
        )
      })
      return transactions
    },
    getFormatedData(): any {
      
      let cumulatedData: any = []
      this.graphData.forEach((data: any) => {
        // const formatedDate = formatDate(new Date(data.date), dateFormat);
        if (cumulatedData.length === 0) {
          cumulatedData.push([
            data.date,
            data.changeInCoins,
          ]);
        } else {
          const prev = cumulatedData[cumulatedData.length - 1];
          if (prev.date !== data.date) {
            cumulatedData.push([
              data.date,
              data.changeInCoins,
            ]);
          } else {
            prev.changeInCoins += data.changeInCoins;
          }
        }
      })
      console.log(cumulatedData)
      return cumulatedData;
    }
  }

})
</script>
