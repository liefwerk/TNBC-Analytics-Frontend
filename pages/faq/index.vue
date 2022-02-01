<template>
  <div class="fcprimary mt-12 mb-20 mx-6 md:mx-12">
    <div class="py-4 mx-auto">
      <div class="flex flex-col text-center w-full mt-8 mb-16">
        <h1 class="md:text-titlelg text-titlemd title-font mb-4 text-gray-900 font-sans font-semibold">Frequently Asked Questions</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-subtitle text-pcsecondery">Detailed information of related topics are given below.</p>
      </div>
      <div class="bg-white max-w-max rounded-lg shadow-md">
        <button 
          class="filter-btn mt-0 self-center cursor-pointer transition-500"
          :class="selectedFilter === '' ? 'selected-button' : ''"
          @click="resetFilter">
          All
        </button>
        <button 
          v-for="(faq, index) in filteredFaqsTypes" 
          :key="index"
          @click="handleFilter(faq)"
          class="filter-btn cursor-pointer transition-500"
          :class="faq.title === selectedFilter ? 'selected-button' : ''">
            {{faq.title}}
        </button>
      </div>
    </div>
    <Faqs :selectedFilter="selectedFilter" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FaqCard from '@/components/website/cards/FaqCard.vue'
import Spinner from '@/components/website/spinner/Spinner.vue'
import { FaqItem, FaqItemType } from '@/types/Faq'
import Faqs from '@/components/website/faqs/Faqs.vue'
  
export default Vue.extend({

  components: {
    FaqCard,
    Spinner,
    Faqs
  },
  data() {
    return {
      selectedFilter: '',
      faqs: {
        count: null,
        next: null,
        previous: null,
        results: [],
      }
    }
  },
  async asyncData({ $http }: any) {
    const faqs: any = await $http.$get('https://tnbc-analytics.herokuapp.com/api/faqs')
    let selectedFaq = faqs[0]
    return { faqs, selectedFaq } as any
  },
  methods: {
    handleFilter(item: any): void {
      this.selectedFilter = item.title
    },
    resetFilter(): void {
      this.selectedFilter = ''
    }
  },
  computed:{
    filteredFaqsTypes(): any {
      let _faqs: any = this.faqs as unknown as FaqItem
      let _array: any = _faqs.map((faq: FaqItem) => faq.faqType_id)

      const _filteredArray = _array.filter((item: FaqItemType, index: number, self: any) =>
        index === self.findIndex((t: FaqItemType) => (
          t.id === item.id
        ))
      )
      return _filteredArray
    }
  }
})
</script>
