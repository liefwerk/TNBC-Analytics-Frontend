<template>
  <div @click="$emit('clickedOnCard')">  
    <div
      class="flex flex-col text-left flex-shrink md:text-left my-4 md:my-0 self-center transition-500">
      <p class="break-all py-1 font-medium text-primary text-subtitle">{{ item.question }}</p>
      <p :class="!isToggled ? 'hidden' : ''" class="break-all py-1 text-secondary text-intxt transition-500">{{ item.answer }}</p>
    </div>
    <img v-if="isToggled" src="upicon.svg" class="absolute top-0 right-0 m-2">
    <img v-else src="downicon.svg" class="absolute top-0 right-0 m-2">
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component
export default class FaqCard extends Vue{
  @Prop({ required: true }) readonly item!: object
  @Prop({ required: true, default: false, type: Boolean }) readonly isToggled: boolean

}
</script>