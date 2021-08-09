<template>
  <div class="card mr-4 mb-4">
    <h3 class="title-h3 text-left">{{ title }}</h3>
    <p class="mt-2">{{ number }}</p>
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