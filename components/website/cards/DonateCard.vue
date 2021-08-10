<template>
  <div class="flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-center card max-w-max mx-8 md:mx-auto my-8">
    <div class="my-8 text-center flex-shrink md:text-left md:my-0 md:mx-8">
      <img :src="donate.image" class="h-6 mt-4 mb-2">
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