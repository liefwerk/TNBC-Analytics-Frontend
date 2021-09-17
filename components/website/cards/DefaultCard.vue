<template>
  <div class="card md:mr-4 mb-4 w-full md:w-auto">
    <h3 class="text-intxt text-left">{{ title }}</h3>
    <p class="mt-2 text-xl font-semibold">{{ number }}</p>
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