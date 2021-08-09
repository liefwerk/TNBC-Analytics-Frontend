<template>
  <div class="bg-gray-100">
    <div>
      <transition name="left">
        <MobileMenu v-show="showMobileMenu" @closeMobileMenu="showMobileMenu = false" />
      </transition>
      <transition name="opacity">
        <div v-show="showMobileMenu" @closeMobileMenu="showMobileMenu = false" class="bg-gray-900 w-full h-screen opacity-90 fixed z-30"></div>
      </transition>
    </div>
    <NavBar
      @showMobileMenu="showMobileMenu = true"
    />
    <Nuxt />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import NavBar from '@/components/website/menu/NavBar.vue'
import MobileMenu from '@/components/website/menu/MobileMenu.vue'
import Footer from '@/components/website/footer/Footer.vue'

export default Vue.extend({
  head: {
    titleTemplate: '%s - TNBC Analytics',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'TNBC Analytics is a web app to track TNBC transactions from treasury to government and government to other distributed TNBC accounts for transparency and accountability.' }
    ],
    htmlAttrs: {
      lang: 'en'
    }
  },
  components: {
    NavBar,
    MobileMenu,
    Footer
  },
  data() {
    return {
      showMobileMenu: false,
      showCart: false,
    }
  },
})
</script>

<style>
html {
  font-family:
    'Quicksand',
    'Quando',
    Roboto;
}

</style>
