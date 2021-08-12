<template>
  <div class="mt-12 mb-20 mx-8 md:mx-20">
    <h1 class="title-h1 text-center mb-8">DONATE</h1>
    <div class="flex flex-wrap md:flex-row md:flex-nowrap justify-center">
        <p class="text-xl text-center w-1/2 mb-8 break-words" >All donations will go to TNBC Analytics to help fund the team to continue to develop the community and create content.</p>
    </div>
    <div
      v-for="(donate, index) in donations"
      :key="index">
      <DonateCard :donate="donate" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import DonateCard from '@/components/website/cards/DonateCard.vue'

export default Vue.extend({

  components: {
    DonateCard
  },

  async asyncData({ $http }: any) {
    const donations = await $http.$get('/api/donate')
    
    return { donations }
  }

})
</script>
