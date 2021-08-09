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
    return {
      team: [
        {
          name: 'Jhon Doe',
          role: 'UI/UX Designer',
          github: 'jhondoe',
          TNBCAddress: 'a5dbcded3501291743e0cb4c6a186afa2c87a54f4a876c620dbd68385cba80d0',
          image: 'TeamMember.svg',
          qrCode: 'QRCode.svg'
        },
        {
          name: 'Jhon Doe',
          role: 'UI/UX Designer',
          github: 'jhondoe',
          TNBCAddress: 'a5dbcded3501291743e0cb4c6a186afa2c87a54f4a876c620dbd68385cba80d0',
          image: 'TeamMember.svg',
          qrCode: 'QRCode.svg'
        },
        {
          name: 'Jhon Doe',
          role: 'UI/UX Designer',
          github: 'jhondoe',
          TNBCAddress: 'a5dbcded3501291743e0cb4c6a186afa2c87a54f4a876c620dbd68385cba80d0',
          image: 'TeamMember.svg',
          qrCode: 'QRCode.svg'
        },
        {
          name: 'Jhon Doe',
          role: 'UI/UX Designer',
          github: 'jhondoe',
          TNBCAddress: 'a5dbcded3501291743e0cb4c6a186afa2c87a54f4a876c620dbd68385cba80d0',
          image: 'TeamMember.svg',
          qrCode: 'QRCode.svg'
        },
      ]
    }
  }

})
</script>
