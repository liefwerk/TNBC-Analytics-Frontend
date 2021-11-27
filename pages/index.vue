<template>
  <div>
    <div class="mb-20">
      <div class="bg-gradient-to-b from-gray-900 to-gray-700 h-96 relative font-sans font-semibold">
        <div class="absolute top-1/2 transform -translate-y-1/2 w-full">
          <div class="relative max-w-max mx-auto">
            <h1 class="text-titlexl text-gray-100 text-center max-w-max mx-auto relative z-10 select-none">TNBC Analytics</h1>
            <div class="absolute bg-gray-800 w-56 left-1/2 -translate-x-1/2 md:w-full h-full filter blur-lg transform -translate-y-full"></div>
          </div>
        </div>
        <Particle />
      </div>
      <div class="relative w-3/4 mx-auto font-sans shadow-md">
        <div class="absolute transform -translate-y-full mx-auto bg-gray-900 w-full text-center text-white p-2">
          <p>With an average blocktime of 0.015 seconds and 3,238 transactions per second, TNBC is the best cryptocurrency.</p>
        </div>
        <div class="grid grid-cols-1 md:flex md:flex-nowrap justify-center text-gray-800 bg-white md:w-full md:mx-auto px-6 py-2 divide-y md:divide-y-0 md:divide-x divide-gray-300">
          <HomeCard 
            :number="analytics.total_paid_to_core_team"
            title="Distributed to Core Team"/>
          <HomeCard 
            :number="analytics.total_paid_to_projects"
            title="Distributed to Projects"/>
          <HomeCard 
            :number="analytics.total_paid_as_bounty"
            title="Disctributed as Bounty Rewards"/>
        </div>
      </div>
      <div class="my-16 mx-4 font-sans font-semibold">
        <h2 class="text-titlelg text-center">Distribution Chart</h2>
        <p class="text-inbtn font-normal text-center my-4 text-gray-500">This statistic represents the distribution of TNBC by "TNB Government" on last 12 months.</p>
      </div>
      <div class="mx-4 my-10 md:mx-auto md:w-3/4">
        <TotalPaymentsSentGraph @setDistributedCoins="setDistributedCoins" />
        <div class="flex flex-wrap md:w-10/12 md:mx-auto my-8 lg:divide-x divide-gray-400 border-l border-r border-gray-400">
          <div class="flex flex-col justify-between flex-nowrap w-full md:w-1/2 lg:w-1/4 p-4 border-t md:border-r lg:border-r-0 lg:border-b border-gray-400">
            <p class="text-sm mb-2">Treasury Balance</p>
            <p class="w-full text-left self-end text-xl">{{ getTreasuryBalance }}</p>
          </div>
          <div class="flex flex-col justify-between flex-nowrap w-full md:w-1/2 lg:w-1/4 p-4 border-t lg:border-b border-gray-400">
            <p class="text-sm mb-2">Distributed Coins</p>
            <p class="w-full text-left self-end text-xl">{{ getDistributedCoins }}</p>
          </div>
          <div class="flex flex-col justify-between flex-nowrap w-full md:w-1/2 lg:w-1/4 p-4 border-t md:border-r lg:border-r-0 md:border-b border-gray-400">
            <p class="text-sm mb-2">Transaction Count</p>
            <p class="w-full text-left self-end text-xl">{{ getTotalTransactions }}</p>
          </div>
          <div class="flex flex-col justify-between flex-nowrap w-full md:w-1/2 lg:w-1/4 p-4 border-t border-b border-gray-400">
            <p class="text-sm mb-2">Number of accounts</p>
            <p class="w-full text-left self-end text-lg">{{ totalAccounts }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TotalPaymentsSentGraph from '~/components/website/graphs/TotalPaymentsSentGraph.vue'
import Particle from '@/components/website/particles/Particle.vue'
import HomeCard from '@/components/website/cards/HomeCard.vue'
import { Analytics, Treasury, Government } from '~/types/TnbAnalyticsApi'
import { Transaction } from '~/types/TnbBankApi'
import { AdditionalApi } from '~/types/AdditionalApi'

export default Vue.extend({
  components: {
    Particle,
    TotalPaymentsSentGraph,
    HomeCard
  },
  data(){
    return {
      analytics: {} as Analytics,
      transactions: {} as Array<Transaction>,
      treasury: {} as Treasury,
      graphTxs: [],
      government: {} as Government,
      totalAccounts: null as null | number,
      treasuryBalance: null as null | number,
      treasury_withdrawals: null as null | number,
      transactionCount: null as null | number,
      distributedCoins: null as null | number
    }
  },
  async asyncData({ $http, $axios }: any) {
    const _analytics: Array<Analytics> = await $axios.$get('https://tnbanalytics.pythonanywhere.com/statistics')
    let analytics: Analytics = _analytics[0]

    const _transactionsCount = await $axios.$get('http://54.183.16.194/bank_transactions?limit=1&date=-1')
    let transactionCount = _transactionsCount.count

    const _treasury: Array<Treasury> = await $axios.$get('https://tnbanalytics.pythonanywhere.com/treasury')
    let treasury: Treasury = _treasury[0]

    const _government: Array<Government> = await $axios.$get('https://tnbanalytics.pythonanywhere.com/government')
    let government: Government = _government[0]

    const pk: string = '6e5ea8507e38be7250cde9b8ff1f7c8e39a1460de16b38e6f4d5562ae36b5c1a'
    const _transactions: any = await $axios.get(`http://54.183.16.194/bank_transactions?account_number=${pk}&fee=NONE&limit=100`)
    let transactions: Array<Transaction> = _transactions.data.results

    const treasuryPk: string = '23676c35fce177aef2412e3ab12d22bf521ed423c6f55b8922c336500a1a27c5'
    const _balance = await $axios.get(`http://52.52.160.149/accounts/${treasuryPk}/balance`)
    const treasuryBalance = _balance.data.balance

    const _additionalApi: AdditionalApi = await $http.$get('https://raw.githubusercontent.com/itsnikhil/tnb-analysis/master/web/js/static.json')
    const totalAccounts: number = _additionalApi.Accounts

    return { analytics, transactions, treasury, government, totalAccounts, transactionCount, treasuryBalance }
  },
  methods: {
    setDistributedCoins(value){
      this.distributedCoins = value
    }
  },
  computed: {
    getTreasuryBalance(): any {
      console.log(this.treasuryBalance)
      return this.treasuryBalance
    },
    getDistributedCoins(): number {
      return this.distributedCoins as any
    },
    getTotalTransactions(): number {
      return this.transactionCount as any
    }
  }

})
</script>
