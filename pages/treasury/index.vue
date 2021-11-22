<template>
  <div>
    <div class="mt-12 mb-20 mx-6 md:mx-12">
      <div class="mb-16">
        <h1 class="text-titlelg mb-2 font-sans font-semibold">Treasury</h1>
        <span class="text-subtitle text-pcsecondery">Minted TNBC and its withdrawal information</span>
      </div>

      <div class="flex flex-wrap mx-auto">
        <div class="w-full mb-8">
          <div class="flex flex-wrap md:grid md:justify-items-stretch md:grid-cols-2 xl:grid-cols-4 gap-4 break-words">
            <NumberCard 
              title="Balance"
              :number="analytics.balance"
              class="text-red-400" />
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
              :number="analytics.lastTransactionDate" />
          </div>
          <div class="flex flex-wrap w-full md:grid md:justify-items-stretch md:grid-cols-2 gap-4">
            <DefaultCard 
              title="Public Key"
              :number="transactionUrl.publicKey"
              class="break-all" />
            <DefaultCard 
              title="Last Transaction's Recipient's Key"
              :number="analytics.lastTransactionKey"
              class="break-all" />
          </div>
        </div>
        <div class="flex flex-wrap w-full md:grid md:justify-items-stretch md:grid-cols-2 gap-4">
          <TreasuryGraph :data="getFormatedPieChartData" />
          <TreasuryGraphCumulated :data="getFormatedSplineChartData" />
        </div>
      </div>

      <div class="mt-10">
        <h2 class="text-titlemd font-sans font-semibold">Withdrawals</h2>
        <p class="mb-4">TNBC sent from Treasury account to Government account</p>
        <Table
          @previousPage="handlePreviousPage"
          @nextPage="handleNextPage"
          @changePageOffset="handlePageOffset"
          @changedMaxItems="handlePerPageChange"
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
import TreasuryGraph from '~/components/website/graphs/TreasuryPieGraph.vue';
import TreasuryGraphCumulated from '@/components/website/graphs/TreasuryGraphCumulated.vue';
import { Pagination } from '~/types/TnbAnalyticsApi'
import { Transaction } from '@/types/TnbBankApi'
import { Analytics, FormatedTransaction, FormatedPieChartTransaction } from '@/types/Treasury'
import { Options } from '@/types/Table'
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
      transactions: [] as Array<Transaction>,
      analytics: {} as Analytics,
      graphData: [] as Array<Transaction>,
      perPage: 5 as number,
      pageOffset: 0 as number,
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
          name: 'Purpose',
          attribute: 'paymentFor'
        },
        {
          name: 'recipient public key',
          attribute: 'recipientPublicKey'
        },
      ]
    }
  },
  async asyncData({ $http }: any) {

    const pk: string = '23676c35fce177aef2412e3ab12d22bf521ed423c6f55b8922c336500a1a27c5'
    const _transactions: Pagination =
    await $http.$get(`http://54.183.16.194/bank_transactions?limit=5&account_number=${pk}&block__sender=${pk}&fee=NONE`)
    
    const _balance = await $http.$get(`http://52.52.160.149/accounts/${pk}/balance`)

    let transactions: Array<Transaction> = _transactions.results
    
    let tableOptions: Options = {
      total: _transactions.count,
      previous: _transactions.previous,
      next: _transactions.next,
      count: _transactions.results.length
    }

    let graphData: Array<Transaction> = _transactions.results

    let analytics: Analytics = {
        balance: _balance.balance,
        lastTransaction: transactions[0].amount,
        lastTransactionDate: moment(transactions[0].block.created_date).fromNow(),
        totalOfTransactions: tableOptions.total,
        lastTransactionKey: transactions[0].recipient
    }

    return { transactions, tableOptions, graphData, analytics } as any
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
      const url = this.transactionUrl
      const link = 
      `${url.protocol}://${url.bank}/bank_transactions?limit=${this.perPage}&offset=${offset}&account_number=${url.publicKey}&fee=NONE`


      const _transactions: Pagination = await fetch(link)
        .then(res => res.json())
        .catch(err => console.log(err))

      this.pageOffset = offset
      this.transactions = _transactions.results
      this.tableOptions.previous = _transactions.previous
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
    formatTransactions(unformatedTransactions): Array<FormatedTransaction> {
      let formatedTransactions: Array<FormatedTransaction> = []
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
    getLastTransactionDate(): string {
      return this.analytics.lastTransactionDate
    },
    getTransactions(): Array<FormatedTransaction> {
      let txs = this.formatTransactions(this.transactions)
      return txs
    },
    getFormatedData(): Array<number> {
      let _: any = []
      this.graphData.map(function (d: any){
        const formatedDate: number = moment(d.block.created_date).valueOf()
        _.push([formatedDate, d.amount])
      })
      return _;
    },
    getFormatedSplineChartData(): Array<Array<Number>> {
      let _temp: any = []
      
      this.graphData.map(function (d: any){
        const formatedDate: number = moment(d.block.created_date).valueOf()
        _temp.push([formatedDate, d.amount])
      })
      return _temp
    },
    getFormatedPieChartData(): any {
      let bank_transactions = this.transactions;
      let treasuryTxs = [];
      const pk = '23676c35fce177aef2412e3ab12d22bf521ed423c6f55b8922c336500a1a27c5';
      for (const txs of bank_transactions){
        let recipient = txs.recipient;
        let amount = 0;
        if(recipient != pk){
          for(const tx of bank_transactions){
            if(recipient === tx.recipient){
              amount = amount + tx.amount;
            }
          }
          let obj: FormatedPieChartTransaction = {
            name: recipient,
            y: amount,
          }
          treasuryTxs.push(obj as never);
        }
      }
      const treasuryGraph: any = treasuryTxs.reduce((acc: any, current: any) => {
        const x = acc.find((item: any) => item.name === current.name);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      return treasuryGraph
    }
  }

})
</script>
