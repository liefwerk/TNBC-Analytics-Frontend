<template>
<div>
  <div class="bg-gray-800 h-96 relative">
    <div class="absolute top-1/2 transform -translate-y-1/2 w-full">
      <h1 class="text-5xl text-gray-100 text-center uppercase font-serif">TNBC Analytics</h1>
    </div>
    <Particles />
  </div>
  <div class="my-16">
    <h2 class="title-h1 text-center">Transactions of the Month</h2>
    <p class="text-xl text-center my-8">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor</p>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

import Particles from '@/components/website/particles/Particles.vue'

export default Vue.extend({

  components: {
    Particles
  }

})
</script>
