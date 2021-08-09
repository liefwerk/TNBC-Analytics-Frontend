<template>
<div class="mt-12 mb-20 md:mx-12">
  <h1 class="title-h1 mb-20">Team Members</h1>
  <div
    v-for="(member, index) in team"
    :key="index"
    class="flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-center card max-w-max">
    <img :src="member.image">
    <div class="my-8 text-center flex-shrink md:text-left md:my-0 md:mx-8">
      <p class="py-1 md:py-0">{{ member.name }}</p>
      <p class="py-1 md:py-0">{{ member.role }}</p>
      <p class="py-1 md:py-0">Github: {{ member.github }}</p>
      <p class="py-1 md:py-0 md:my-4 break-all">TNBC Address: {{ member.TNBCAddress }}</p>
    </div>
    <img class="" :src="member.qrCode">
  </div>
</div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TeamCard extends Vue{
  // @Prop({ required: true }) readonly products!: Product[]
  public team: object[] = [
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
</script>