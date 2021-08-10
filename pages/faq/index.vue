<template>
 <div class="fcprimary">
  <!----fist freequnty---->
    <div class="px-5 py-4 mx-auto">
        <div class="flex flex-col text-center w-full mb-8">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Frequently Asked Questions</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-pcsecondery">Looking for answers? Questions & answers can be instantly filtered in FAQ page.</p>
        </div>
        <div class="btnprimary">
            <button class="btnclass bg-btnprimary text-btntxtclr" >Treasury</button>
            <button class="btnclass bg-btnprimary text-btntxtclr" >Government</button>
            <button class="btnclass bg-btnprimary text-btntxtclr" >Project</button>
            <button class="btnclass bg-btnprimary text-btntxtclr" >Core team</button>
        </div>
    </div>
    <!----new card line----->
    <FaqCard :faqs="faqs"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import FaqCard from '@/components/website/cards/FaqCard.vue'
  
export default Vue.extend({

    components: {
        FaqCard
    },
      data() {
        return {
        showup: true,
        close: false,
        faqs: [
        {
            id: 1,
            question: 'What is TNBC ?',
            answer: 'TNBC is a crypto currency.',
            type:"treasury"
        },
        {
            id: 2,
            question: 'What is Vue ?',
            answer: 'Vue is a progressive js framework.',
            type:"project"
        },
        {
            id: 3,
            question: 'What is Nuxt ?',
            answer: 'Nuxt is a framework of vue.',
            type:"coreteam"
        },
      ]
    }    
  },
})
</script>
