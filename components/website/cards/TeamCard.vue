<template>
  <div class="flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-center card max-w-max">
    <img :src="member.image">
    <div class="my-8 text-center flex-shrink md:text-left md:my-0 md:mx-8">
      <p class="py-1 md:py-0">{{ member.name }}</p>
      <p class="py-1 md:py-0">{{ member.role }}</p>
      <p class="py-1 md:py-0">Github: {{ member.github }}</p>
      <p class="py-1 md:py-0 md:my-4 break-all">TNBC Address: {{ member.TNBCAddress }}</p>
    </div>
    <img class="" :src="member.qrCode">
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TeamCard extends Vue{
  @Prop({ required: true }) readonly member!: object
  
}
</script>