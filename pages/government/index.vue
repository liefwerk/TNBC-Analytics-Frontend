<template>
  <div class="mt-12 mb-20 mx-6 md:mx-12">
    <div class="mb-16">
      <h1 class="title-h1 mb-2">Government Payments</h1>
      <span>TNBC Released From Government Account</span>
    </div>

    <div class="flex flex-wrap mx-auto">
      <div class="w-full md:w-1/2">
        <div class="flex flex-wrap md:grid md:justify-items-stretch md:grid-cols-2 xl:grid-cols-3 break-words">
          <NumberCard 
            title="Balance"
            number="994,824,452"
            class="text-red-400" />
          <NumberCard 
            title="Transactions"
            number="139"
            class="text-blue-400" />
          <NumberCard 
            title="Last Transaction"
            number="1,212,456"
            class="text-green-400" />
        </div>
        <div>
          <DefaultCard 
            title="Public Key"
            number="23676c35fce177aef2412e3ab12d22bf521ed423c6f55b8922c336500a1a27c5"
            class="break-all" />

          <DefaultCard 
            title="Last Transaction Date"
            number="15th June 2020" />
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <Graph />
      </div>
    </div>

    <div class="mt-10">
      <h2 class="title-h2 mb-6">Transactions</h2>
      <Table :columns="columns" :items="items" />
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import DefaultCard from '@/components/website/cards/DefaultCard.vue';
import NumberCard from '@/components/website/cards/NumberCard.vue';
import Table from '@/components/website/table/Table.vue';
import Graph from '@/components/website/graphs/Graph.vue';

export default Vue.extend({

  components: {
    NumberCard,
    DefaultCard,
    Table,
    Graph
  },
  data() {
    return {
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
  }

})
</script>
