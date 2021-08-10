<template>
<div>
    <div class="card shadow-3xl mt-5"  v-for="(faq, index) in faqs" :key="index">
        <p class="font-medium text-primary">{{ faq.question }}</p>
        <p class="text-secondary">{{ faq.answer }}</p>
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