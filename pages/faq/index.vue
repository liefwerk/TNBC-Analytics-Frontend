<template>
  <div class="fcprimary mt-12 mb-20 mx-6 md:mx-12">
    <div class="py-4 mx-auto">
      <div class="flex flex-col text-center w-full mt-8 mb-16">
        <h1 class="md:text-titlelg text-titlemd font-medium title-font mb-4 text-gray-900 font-sans font-semibold">Frequently Asked Questions</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-subtitle text-pcsecondery">Looking for answers? Questions & answers can be instantly filtered in FAQ page.</p>
      </div>
      <div class="btnprimary">
        <button 
          class="btnclass border-2 btn-hover border-btnprimary text-inbtn cursor-pointer transition-500"
          @click="resetFilter"
          :class="selectedFilter === '' ? 'selected-button' : ''">
          All
        </button>
        <button 
          v-for="(faq, index) in filteredFaqsTypes" 
          :key="index"
          @click="handleFilter(faq)"
          class="btnclass border-2 btn-hover border-btnprimary text-inbtn cursor-pointer transition-500"
          :class="faq.title === selectedFilter ? 'selected-button' : ''">
            {{faq.title}}
        </button>
      </div>
    </div>
    <div v-show="selectedFilter === ''">
      <div 
        v-for="(item, index) in faqs.results" 
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
import Vue from 'vue'
import FaqCard from '@/components/website/cards/FaqCard.vue'
import Spinner from '@/components/website/spinner/Spinner.vue'
import { FaqItem, FaqItemType } from '@/constants/types/Faq'
  
export default Vue.extend({

  components: {
    FaqCard,
    Spinner
  },
  data() {
    return {
      selectedFilter: '',
      selectedFaq: null,
      faqs: {
        count: null,
        next: null,
        previous: null,
        results: [],
      }
    }
  },
  async asyncData({ $http }: any) {
    const faqs: any = await $http.$get('/api/faq')
    let selectedFaq = faqs.results[0]
    return { faqs, selectedFaq } as any
  },
  methods: {
    handleFilter(item: any): void {
      this.selectedFilter = item.title
    },
    resetFilter(item: any): void {
      this.selectedFilter = ''
    },
    toggleFaq(item: any): void {
      this.selectedFaq = item
    }
  },
  computed:{
    filteredFaqs(): any {
        let _array: any = this.faqs.results as unknown as FaqItem
        let filteredArray: any = _array.filter((faq: FaqItem) => faq.type.title === this.selectedFilter)
        return filteredArray
    },
    filteredFaqsTypes(): any {
      let _faqs: any = this.faqs.results as unknown as FaqItem
      let _array: any = _faqs.map((faq: FaqItem) => faq.type)

      const _filteredArray = _array.filter((type: FaqItem, index: number, self: any) =>
        index === self.findIndex((t: FaqItemType) => (
          t.uuid === type.uuid
        ))
      )
      return _filteredArray
    }
  }
})
</script>
