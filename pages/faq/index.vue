<template>
 <div class="fcprimary">
  <!----fist freequnty---->
    <div class="px-5 py-4 mx-auto">
        <div class="flex flex-col text-center w-full mb-8">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Frequently Asked Questions</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-pcsecondery">Looking for answers? Questions & answers can be instantly filtered in FAQ page.</p>
        </div>
        <div class="btnprimary">
            <button class="btnclass bg-btnprimary text-btntxtclr" v-for="(button, index) in buttons" :key="index">{{button.text}}</button>
        </div>
    </div>
    <!----new card line----->
    <div class="mt-10">
        <div class="m-5">
            <div @click="showup = !showup" class="cardbox shadow-3xl">
                <div  class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label" for="chck1">
                    <span class="text-grey-darkest font-thin subtitle">
                        Massa vitae tortor condimentum lacinia quis vel eros donec
                    </span>
                    <div class="w-7 h-7 flex items-center justify-center">
                    <!-- icon by feathericons.com 1st icon -->
                    <div v-if="icon = !icon" class="w-7 h-7 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 20 20" fill="#606F7B">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg>
                    </div>
                    <!-- icon by feathericons.com 2nd icon -->
                    <div v-else class="w-7 h-7 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 20 20" fill="#606F7B">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    </div>
                </div>
                </div>
                <div v-if="showup" class="tab-content">
                    <div class="pl-4 pr-4 pb-5 text-grey-darkest">
                        <ul class="pl-4">
                            <li v-for="(todo, index) in todos" :key="index" class="text-pcsecondery subtitle">
                                {{todo.text}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!----new card line----->
        <div class="m-5">
            <div @click="close = !close" class="cardbox shadow-3xl">
                <div class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label" for="chck1">
                    <span class="text-grey-darkest font-thin subtitle">
                        Massa vitae tortor condimentum lacinia quis vel eros donec
                    </span>
                    <!-- icon by feathericons.com 1st icon -->
                    <div v-if="iconspart = !iconspart" class="w-7 h-7 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 20 20" fill="#606F7B">
                        <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <!-- icon by feathericons.com 2nd icon -->
                    <div v-else class="w-7 h-7 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 20 20" fill="#606F7B">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    </div>
                </div>
                <div v-if="close" class="tab-content">
                    <div class="pl-4 pr-4 pb-5 text-grey-darkest">
                        <ul class="pl-4">
                            <li v-for="(todo, index) in todos" :key="index" class="text-pcsecondery subtitle">
                                {{todo.text2}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!----new card line----->
        <div class="m-5">
            <div @click="open = !open" class="cardbox shadow-3xl">
                <div class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label" for="chck1">
                    <span class="text-grey-darkest font-thin subtitle">
                        Massa vitae tortor condimentum lacinia quis vel eros donec
                    </span>
                    <!-- icon by feathericons.com 1st icon -->
                    <div v-if="showicon = !showicon" class="w-7 h-7 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 20 20" fill="#606F7B">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg>
                    </div>
                    <!-- icon by feathericons.com 2nd icon -->
                    <div v-else class="w-7 h-7 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 20 20" fill="#606F7B">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    </div>
                </div>
                <div v-if="show" class="tab-content">
                    <div class="pl-4 pr-4 pb-5 text-grey-darkest">
                        <ul class="pl-4">
                            <li v-for="(todo, index) in todos" :key="index" class="text-pcsecondery subtitle">
                                {{todo.text3}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!----new card line----->
        <div class="m-5">
            <div @click="show = !show" class="cardbox shadow-3xl">
                <div class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label" for="chck1">
                    <span class="text-grey-darkest font-thin subtitle">
                        Massa vitae tortor condimentum lacinia quis vel eros donec
                    </span>
                    <!-- icon by feathericons.com 1st icon -->
                    <div v-if="opnicon = !opnicon" class="w-7 h-7 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 20 20" fill="#606F7B">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    </div>
                    <!-- icon by feathericons.com 2nd icon -->
                    <div v-else class="w-7 h-7 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 20 20" fill="#606F7B">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg>
                    </div>
                </div>
                <div v-if="open" class="tab-content">
                    <div class="pl-4 pr-4 pb-5 text-grey-darkest">
                        <ul class="pl-4">
                            <li v-for="(todo, index) in todos" :key="index" class=" text-pcsecondery subtitle">
                                {{todo.text4}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>          
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
  
export default Vue.extend({
      data() {
        return {
        showup: true,
        close: false,
        buttons: [
            { text: 'Treasury' },
            { text: 'Government' },
            { text: 'Project' },
            { text: 'Core Team' },
        
            ] ,
        todos: [
            { text: 'Learn JavaScript' },
            { text2: 'Learn JavaScript 2' },
            { text3: 'Learn JavaScript 3' },
            { text4: 'Learn JavaScript 4' },
        
            ] 
    }
 
     
  },
})
</script>
