<template>
  <div class="flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-center card max-w-max md:mx-auto my-8">
    <div class="text-center md:text-left md:my-0 md:mx-5">
        <img :src="donate.image" class="h-6 mt-4">
        <p class="py-2 md:py-2">{{ donate.address }}</p>
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