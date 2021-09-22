<template>
  <div class="card md:mr-4 mb-4 w-full md:w-auto">
    <h3 class="text-intxt text-gray-800 text-left font-semibold">{{ title }}</h3>
    <p class="text-2xl mt-4">{{ number }}</p>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component
export default class NumberCard extends Vue {
  @Prop({ required: true }) readonly title!: string
  @Prop({ required: true }) readonly number!: number

}
</script>