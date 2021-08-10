<template>
  <div class="mt-12 mb-20 md:mx-12">
    <h1 class="title-h1 text-center mb-20">Team Members</h1>
    <div
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
    const team = await $http.$get('/api/team')
    
    return { team }
  }

})
</script>
