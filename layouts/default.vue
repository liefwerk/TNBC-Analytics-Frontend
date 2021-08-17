<template>
  <div class="bg-gray-100">
    <div>
      <transition name="left">
        <MobileMenu v-show="showMobileMenu" @closeMobileMenu="showMobileMenu = false" />
      </transition>
      <transition name="opacity">
        <div v-show="showMobileMenu" @closeMobileMenu="showMobileMenu = false" @click="showMobileMenu = false" class="cursor-pointer bg-gray-900 w-full h-screen opacity-90 fixed z-30"></div>
      </transition>
    </div>
    <NavBar
      @showMobileMenu="showMobileMenu = true"
    />
    <Nuxt />
    <Footer :settings="settings" />
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
      settings: [],
    }
  },
  async fetch() {
    this.settings = await fetch(
      process.env.apiUrl + 'setting'
    ).then(res => res.json()).catch(err => console.log(err))
  }
})
</script>

<style>
html {
  font-family:
    'Quicksand',
    'Quando',
    Roboto;
}

/* Animation left */
.left-enter-active {
  transition: all .3s ease;
}
.left-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  transition-delay: .2s;
}
.left-enter, .left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
  z-index: 999;
}

/* Animation right */
.right-enter-active {
  transition: all .3s ease;
}
.right-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  transition-delay: .2s;
}
.right-enter, .right-leave-to {
  transform: translateX(100%);
  opacity: 0;
  z-index: 999;
}

/* Animation opacity */
.opacity-enter-active {
  transition: all .3s ease;
  transition-delay: .15s;
}
.opacity-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.opacity-enter, .opacity-leave-to {
  opacity: 0;
}
</style>
