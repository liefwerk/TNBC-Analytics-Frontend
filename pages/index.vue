<template>
  <div class="mb-20">
    <div class="bg-gradient-to-b from-gray-900 to-gray-700 h-96 relative font-serif">
      <div class="absolute top-1/2 transform -translate-y-1/2 w-full">
        <h1 class="text-5xl text-gray-100 text-center uppercase">TNBC Analytics</h1>
      </div>
      <Particles />
    </div>
    <div class="my-16 mx-4 font-serif">
      <h2 class="title-h1 text-center">Transactions of the Month</h2>
      <p class="text-lg text-center my-8 text-gray-500">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor</p>
    </div>
    <div class="mx-4 my-10 md:mx-auto md:w-3/4">
      <Graph />
      <div class="flex flex-wrap md:w-10/12 md:mx-auto my-8 lg:divide-x divide-gray-400 border-l border-r border-gray-400">
        <div class="w-full md:w-1/2 lg:w-1/4 p-4 border-t md:border-r lg:border-r-0 lg:border-b border-gray-400">
          <p class="text-sm mb-2">Latest Price</p>
          <p class="text-xl">$0.061381</p>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 p-4 border-t lg:border-b border-gray-400">
          <p class="text-sm mb-2">Total Govt payment</p>
          <p class="text-xl">$586.36M</p>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 p-4 border-t md:border-r lg:border-r-0 md:border-b border-gray-400">
          <p class="text-sm mb-2">Transaction Count</p>
          <p class="text-xl">$5.016M</p>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 p-4 border-t border-b border-gray-400">
          <p class="text-sm mb-2">Number of accounts</p>
          <p class="text-xl">26.08M</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Graph from '@/components/website/graphs/Graph.vue'
import Particles from '@/components/website/particles/Particles.vue'

export default Vue.extend({

  components: {
    Particles,
    Graph
  }

})
</script>
