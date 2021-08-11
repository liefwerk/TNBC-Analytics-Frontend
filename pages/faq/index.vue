<template>
 <div class="fcprimary">
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
    <div  v-if="faqs.length">
        <FaqCard :faqs="faqs"/>
    </div>
    <div v-else>
        <Spinner />
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
        showup: true,
        close: false,
        faqs: [
            {
                id: 1,
                type:"treasury",
                question: 'What is the current balance of Treasury ?',
                answer: 'The current balance of Treasury is about 300,000,000 ,',
            },
            {
                id: 2,
                type:"government",
                question: 'How much TNBC government withdrawed in goverment wallet ?',
                answer: 'The total govt withdrawal is 50,000,000 .',
            },
            {
                id: 3,
                type:"project",
                question: 'How much TNBC has been paid to the projects ?',
                answer: 'About 200,000,000 TNBC has been paid to the projects .',
            },
            {
                id: 4,
                type:"coreteam",
                question: 'How many members are there in core team ?',
                answer: 'There are about 20 members in core team',
            },
        ],
    }  
  },
  created(){
  },
  mounted () {
  },
  methods:{
  }
})
</script>
