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
        <GovernmentGraph />
      </div>
    </div>

    <div class="mt-10">
      <h2 class="text-titlemd mb-4 font-sans font-semibold">Transactions</h2>
      <Table :columns="columns" :items="items" />
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import DefaultCard from '@/components/website/cards/DefaultCard.vue';
import NumberCard from '@/components/website/cards/NumberCard.vue';
import Table from '@/components/website/table/Table.vue';
import GovernmentGraph from '@/components/website/graphs/GovernmentGraph.vue';
import formatDateMixin from '@/mixins/formatDateMixin'

export default Vue.extend({

  components: {
    NumberCard,
    DefaultCard,
    Table,
    GovernmentGraph
  },
  data() {
    return {
      government: {},
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
          name: 'paid to',
          attribute: 'paidTo'
        },
        {
          name: 'github issue id',
          attribute: 'githubIssueId'
        },
        {
          name: 'recipient public key',
          attribute: 'recipientPublicKey'
        },
      ],
      items: [
        {
          date: '10th July 2021',
          amount: 3000000,
          paidTo: 'Government',
          githubIssueId: 295,
          recipientPublicKey: 'a2sa3e6re2d3adf3dfer1a3fe3r...'
        },
        {
          date: '4th July 2021',
          amount: 2000000,
          paidTo: 'Government',
          githubIssueId: 295,
          recipientPublicKey: 'a2sa3e6re2d3adf3dfer1a3fe3r...'
        },
        {
          date: '18th June  2021',
          amount: 1000000,
          paidTo: 'Government',
          githubIssueId: 295,
          recipientPublicKey: 'a2sa3e6re2d3adf3dfer1a3fe3r...'
        },
        {
          date: '4th July 2021',
          amount: 2000000,
          paidTo: 'Government',
          githubIssueId: 295,
          recipientPublicKey: 'a2sa3e6re2d3adf3dfer1a3fe3r...'
        },
        {
          date: '18th June  2021',
          amount: 1000000,
          paidTo: 'Government',
          githubIssueId: 295,
          recipientPublicKey: 'a2sa3e6re2d3adf3dfer1a3fe3r...'
        },
        {
          date: '4th July 2021',
          amount: 2000000,
          paidTo: 'Government',
          githubIssueId: 295,
          recipientPublicKey: 'a2sa3e6re2d3adf3dfer1a3fe3r...'
        },
        {
          date: '18th June  2021',
          amount: 1000000,
          paidTo: 'Government',
          githubIssueId: 295,
          recipientPublicKey: 'a2sa3e6re2d3adf3dfer1a3fe3r...'
        },
        {
          date: '4th July 2021',
          amount: 2000000,
          paidTo: 'Government',
          githubIssueId: 295,
          recipientPublicKey: 'a2sa3e6re2d3adf3dfer1a3fe3r...'
        },
        {
          date: '18th June  2021',
          amount: 1000000,
          paidTo: 'Government',
          githubIssueId: 295,
          recipientPublicKey: 'a2sa3e6re2d3adf3dfer1a3fe3r...'
        },
      ]
    }
  },
  mixins: [formatDateMixin],
  async asyncData({ $http }: any) {
    const _government: any = await $http.$get('/api/government')
    let government = _government.results[0]
    return { government } as any
  },
  computed: {
    getLastTransactionDate(){
      let lastTransactionDate = this.formatDate(new Date(this.government.last_transaction_at))
      return lastTransactionDate
    }
  }

})
</script>
