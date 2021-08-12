<template>
 <div class="fcprimary m-8">
    <div class="py-4 mx-auto">
        <div class="flex flex-col text-center w-full mt-8 mb-16">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Frequently Asked Questions</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-pcsecondery">Looking for answers? Questions & answers can be instantly filtered in FAQ page.</p>
        </div>
        <div class="btnprimary">
            <button 
                v-for="(faq, index) in filteredFaqsTypes" 
                :key="index"
                @click="handleFilter(faq)"
                class="btnclass border-2 btn-hover border-btnprimary text-btntxtclr"
                :class="faq.title === selectedFilter ? 'selected-button' : ''">
                    {{faq.title}}
            </button>
        </div>
    </div>
    <div 
        v-for="(item, index) in filteredFaqs" 
        :key="index"
        @click="toogleFaq(item)"
        class="relative flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-start card mb-4">
        <FaqCard :item="item" :isToggled="item === selectedFaq ? true : false" />
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import FaqCard from '@/components/website/cards/FaqCard.vue'
import Spinner from '@/components/website/spinner/Spinner.vue'
  
export default Vue.extend({

    components: {
        FaqCard,
        Spinner
    },
    data() {
        return {
            selectedFilter: 'Core Team',
            selectedFaq: null
        }
  },
  async asyncData({ $http }: any) {
    const faqs = await $http.$get('/api/faq')
    
    return { faqs }
  },
  methods: {
    handleFilter(item: object): void {
        this.selectedFilter = item.title
    },
    toogleFaq(item: object): void {
        this.selectedFaq = item
    }
  },
  computed:{
        filteredFaqs(): object[]{
            let filteredArray = this.faqs.filter(faq => faq.type.title === this.selectedFilter)
            return filteredArray
        },
        filteredFaqsTypes(): object[]{
            let _array = this.faqs.map(faq => faq.type)
            const _filteredArray = _array.filter((type, index, self) =>
                index === self.findIndex((t) => (
                    t.uuid === type.uuid
                ))
            )
            return _filteredArray
        }
    }
})
</script>
