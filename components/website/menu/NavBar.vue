<template>
  <div class="bg-white py-3 px-4 shadow-xs">
    <nav class="container px-8 w-full flex flex-row flex-nowrap justify-between" aria-label="Desktop navigation">
      <NuxtLink to="/" class="mr-2 font-bold text-3xl order-2 md:order-first">
       <img alt="logo" src="~/assets/img/logo.png" />
      </NuxtLink>
      <ul class="self-center flex flex-nowrap order-1 text-gray-800">
        <li class="ml-4 md:ml-8 self-center text-md uppercase text-gray-700 hidden md:block hover:text-green-700"><NuxtLink to="/">Home</NuxtLink></li>
        <li class="ml-4 md:ml-8 self-center text-md uppercase text-gray-700 hidden md:block hover:text-green-700"><NuxtLink to="/treasury">Treasury</NuxtLink></li>
        <li class="ml-4 md:ml-8 self-center text-md uppercase text-gray-700 hidden md:block hover:text-green-700"><NuxtLink to="/government">Government</NuxtLink></li>
        <li class="ml-4 md:ml-8 self-center text-md uppercase text-gray-700 hidden md:block hover:text-green-700"><NuxtLink to="/faq">FAQ</NuxtLink></li>
        <li class="self-center cursor-pointer">
          <button @click="showMobileMenu" class="inline-block md:hidden p-1" aria-label="Menu icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from 'nuxt-property-decorator'



@Component
export default class NavBar extends Vue {


  @Emit('showMobileMenu')
  showMobileMenu(): void {}

  mounted() {
   
  }

}
</script>
