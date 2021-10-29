<template>
  <div class="card mb-4 w-full md:w-auto">
    <h3 class="text-intxt text-left font-semibold">{{ title }}</h3>
    <p class="mt-4 text-xl text-gray-500">{{ number }}</p>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DefaultCard extends Vue {
  @Prop({ required: true }) readonly title!: string
  @Prop({ required: true }) readonly number!: number

}
</script>