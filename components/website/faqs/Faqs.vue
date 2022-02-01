<template>
	<div>
		<div v-if="faqs.length" v-show="selectedFilter === ''">
			<div 
				v-for="(item, index) in faqs" 
				:key="index"
				@click="toggleFaq(item)"
				class="relative flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-start card mb-4 cursor-pointer">
				<FaqCard
					v-if="index === 0"
					:item="item" 
					:isToggled="(item === selectedFaq && index === 0) ? true : false" 
					:isFirst="index === 0 ? true : false" />
				<FaqCard
					v-else
					:item="item" 
					:isToggled="item === selectedFaq ? true : false" 
					:isFirst="index === 0 ? true : false" />
			</div>
		</div>
		<div v-else><CircleSpinner class="h-16 w-16" /></div>
		<!-- When navigating through the categories, the first card should always be opened -->
		<!-- For now, this only works for the 'All' default category -->
			<div 
				v-for="(item, index) in filteredFaqs" 
				:key="index"
				@click="toggleFaq(item)"
				class="relative flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-start card mb-4 cursor-pointer">
				<FaqCard
					v-if="index === 0"
					:item="item" 
					:isToggled="(item === selectedFaq && index === 0) ? true : false" 
					:isFirst="index === 0 ? true : false" />
				<FaqCard
					v-else
					:item="item" 
					:isToggled="item === selectedFaq ? true : false" 
					:isFirst="index === 0 ? true : false" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CircleSpinner from '@/components/website/spinner/CircleSpinner.vue'
import { FaqItem, FaqItemType } from '@/types/Faq'
import FaqCard from '@/components/website/cards/FaqCard.vue'

@Component({
  components: {
    CircleSpinner,
	FaqCard
  }
})
export default class GovernmentGraph extends Vue {
	private faqs: Array<any> = []
	public selectedFaq: FaqItemType | null = null
	@Prop({ required: true }) selectedFilter: String

	async fetch() {
		this.faqs = await fetch(`https://tnbc-analytics.herokuapp.com/api/faqs`)
		.then(res => res.json()).catch(err => console.log(err))
	}

	toggleFaq(item: any): void {
      this.selectedFaq = item
    }

	get filteredFaqs(): any {
        let _array: any = this.faqs as unknown as FaqItem
        let filteredArray: any = _array.filter((faq: FaqItem) => faq.faqType_id.title === this.selectedFilter)
        return filteredArray
	}

}
</script>