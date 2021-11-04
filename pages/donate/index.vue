<template>
  <div class="mt-12 mb-20 mx-6 md:mx-12">
    <h1 class="text-titlelg text-center mb-4 font-sans font-semibold">Donation</h1>
    <div class="flex flex-wrap md:flex-row md:flex-nowrap justify-center mb-8">
        <p class="text-subtitle text-pcsecondery text-center w-1/2 mb-8 break-words" >All donations will go to TNBC Analytics Team for continuous development.</p>
    </div>
    <div v-if="!donations.length" class="text-xl">
      <p>Loading...</p>
    </div>
    <div
      v-else
      v-for="(donation, index) in donations"
      :key="index">
      <DonateCard :donation="donation" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DonateCard from '@/components/website/cards/DonateCard.vue'
import { Donation } from '@/types/Donate'

export default Vue.extend({
  data(){
    return {
      donations: [] as Array<Donation>
    }
  },
  components: {
    DonateCard
  },

  async asyncData({ $http }: any) {
    const _donations = await $http.$get('https://tnbc-analytics.herokuapp.com/api/donates')
    let donations: Array<Donation> = _donations
    return { donations }
  }

})
</script>
