<template>
  <div class="mb-20">
    <div class="bg-gradient-to-b from-gray-900 to-gray-700 h-96 relative font-sans font-semibold">
      <div class="absolute top-1/2 transform -translate-y-1/2 w-full">
        <div class="relative max-w-max mx-auto">
          <h1 class="text-titlexl text-gray-100 text-center max-w-max mx-auto relative z-10">TNBC Analytics</h1>
          <div class="absolute bg-gray-800 w-full h-full filter blur-lg transform -translate-y-full"></div>
        </div>
      </div>
      <Particle />
    </div>
    <div class="relative w-3/4 mx-auto font-sans shadow-md">
      <div class="absolute transform -translate-y-full mx-auto bg-gray-900 w-full text-center text-white p-2">
        <p>Average blocktime of 0.015 seconds and 3,238 transactions per second, TNBC is the best Crypto Currency.</p>
      </div>
      <div class="grid grid-cols-1 md:flex md:flex-nowrap justify-center text-gray-800 bg-white md:w-full md:mx-auto px-6 py-2 divide-y md:divide-y-0 md:divide-x divide-gray-300">
        <HomeCard 
          :number="analytics.total_paid_as_bounty"
          title="Total Distributed Coins"/>
        <HomeCard 
          :number="analytics.total_paid_to_core_team"
          title="Distributed to Core Team"/>
        <HomeCard 
          :number="analytics.total_paid_to_projects"
          title="Distributed to Projects"/>
      </div>
    </div>
    <div class="my-16 mx-4 font-sans font-semibold">
      <h2 class="text-titlelg text-center">Transactions of the Month</h2>
      <p class="text-inbtn font-normal text-center my-4 text-gray-500">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor</p>
    </div>
    <div class="mx-4 my-10 md:mx-auto md:w-3/4">
      <HomeGraph :transactions="getFormatedData" />
      <div class="flex flex-wrap md:w-10/12 md:mx-auto my-8 lg:divide-x divide-gray-400 border-l border-r border-gray-400">
        <div class="w-full md:w-1/2 lg:w-1/4 p-4 border-t md:border-r lg:border-r-0 lg:border-b border-gray-400">
          <p class="text-sm mb-2">Total Treasury Withdrawals</p>
          <p class="text-xl">{{ getTreasuryWithdrawals }}</p>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 p-4 border-t lg:border-b border-gray-400">
          <p class="text-sm mb-2">Total Govt payment</p>
          <p class="text-xl">{{ getGovernmentPayments }}</p>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 p-4 border-t md:border-r lg:border-r-0 md:border-b border-gray-400">
          <p class="text-sm mb-2">Transaction Count</p>
          <p class="text-xl">{{ getTotalTransactions }}</p>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 p-4 border-t border-b border-gray-400">
          <p class="text-sm mb-2">Number of accounts</p>
          <p class="italic text-lg text-gray-400">TBA</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import HomeGraph from '@/components/website/graphs/HomeGraph.vue'
import Particle from '@/components/website/particles/Particle.vue'
import HomeCard from '@/components/website/cards/HomeCard.vue'

export default Vue.extend({
  data(){
    return {
      analytics: {} as any,
      transactions: {} as any,
      treasury: {} as any,
      government: {} as any
    }
  },
  components: {
    Particle,
    HomeGraph,
    HomeCard
  },
  async asyncData({ $http }: any) {
    const _analytics: any = await $http.$get('/api/statistics')
    let analytics = _analytics.results[0]

    const _transactions = await $http.post('api/homepage-chart', { days: '31' })
      .then((res: any) => res.json())
    let transactions = _transactions.data

    const _treasury: any = await $http.$get('/api/treasury')
    let treasury = _treasury.results[0]

    const _government: any = await $http.$get('/api/government')
    let government = _government.results[0]

    return { analytics, transactions, treasury, government } as any
  },
  computed: {
    getTreasuryWithdrawals(): number {
      return this.treasury.total_transactions
    },
    getGovernmentPayments(): number {
      return this.government.total_tnbc_spent
    },
    getTotalTransactions(): number {
      return this.government.total_transactions + this.treasury.total_transactions
    },
    getFormatedData(): any {
      const _data = this.transactions.map((d: any) => (
        [ Date.parse(d[0] as string), d[1] ]
      ))
      console.log(_data)
      return _data;
    }
  }

})
</script>
