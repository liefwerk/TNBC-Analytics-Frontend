<template>
  <div class="mt-12 mb-20 mx-6 md:mx-12">
    <h1 class="text-titlelg text-center mb-20 font-sans font-semibold">Contributors of TNBC Analytics</h1>
    <div v-if="!team.length" class="text-xl">
      <p>Loading...</p>
    </div>
    <div
      v-else
      v-for="(member, index) in team"
      :key="index">
      <TeamCard :member="member" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import TeamCard from '@/components/website/cards/TeamCard.vue'

export default Vue.extend({

  components: {
    TeamCard
  },
  data() {
    return {}
  },
  async asyncData({ $http }: any) {
    const team = await $http.$get('https://tnbc-analytics.herokuapp.com/api/contributors/')
    
    return { team }
  }

})
</script>
