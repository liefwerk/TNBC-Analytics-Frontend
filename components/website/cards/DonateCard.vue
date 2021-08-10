<template>
  <div class="flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-center card max-w-max mx-8 md:mx-auto my-8">
    <div class="flex flex-col text-center flex-shrink md:text-left my-4 md:my-0 md:mx-8 self-center">
      <img :src="donate.image" class="h-6 mx-auto md:mx-0 max-w-max">
      <p class="break-all py-2 md:py-2">{{ donate.address }}</p>
    </div>
    <img :src="donate.qrCode">
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DonateCard extends Vue{
  @Prop({ required: true }) readonly donate!: object
}
</script>