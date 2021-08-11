<template>
<div>
  <div v-for="(faq, index) in faqs" :key="index" class="relative flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-center card max-w-max mx-8 md:mx-auto my-8" >
    <div class="flex flex-col text-left flex-shrink md:text-left my-4 md:my-0 md:mx-8 self-center">
      <p class="break-all py-2 md:py-2 font-medium text-primary">{{ faq.question }}</p>
      <p class="break-all py-2 md:py-2 text-secondary">{{ faq.answer }}</p>
    </div>
    <img src="upicon.svg" class="absolute top-0 right-0 pt-8 pr-8">
  </div>
</div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component
export default class FaqCard extends Vue{
  @Prop({ required: true }) readonly faqs!: object
}
</script>