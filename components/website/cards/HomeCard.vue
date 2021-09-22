<template>
  <div class="flex-grow py-4 md:px-4 md:my-2 w-full md:w-auto">
    <p class="text-center text-2xl font-bold">{{ number }}</p>
    <h3 class="text-intxt text-center">{{ title }}</h3>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component
export default class HomeCard extends Vue {
  @Prop({ required: true }) readonly title!: string
  @Prop({ required: true }) readonly number!: number

}
</script>