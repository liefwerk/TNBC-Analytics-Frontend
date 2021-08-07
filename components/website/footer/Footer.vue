<template>
<div>
  <div class="py-6 px-6 bg-footerclr lg:px-32 text-md text-white flex flex-col md:flex-row justify-between shadow-inner">
    <div class="md:mx-10 flex-grow w-full md:w-auto md:flex-grow-0">
      <h5 class="mt-3 text-xl">TNBC Analytics</h5>
      <ul class="mt-3 text-sm">
        <li><a href="#">Github</a></li>
        <li><a href="#">Discord</a></li>
        <li><a href="#">Instagram</a></li>  
        <li><a href="#">Twitter</a></li>
      </ul>
    </div>
      <div class="md:mx-10 flex-grow w-full md:w-auto md:flex-grow-0">
      <h5 class="mt-3 text-xl">Useful Links</h5>
      <ul class="mt-3 text-sm">
        <li><a href="#">The New Boston</a></li>
        <li><a href="#">TNBC Wallet</a></li>
        <li><a href="#">TNBC Explorer</a></li>  
      </ul>
    </div>
      <div class="md:mx-10 flex-grow w-full md:w-auto md:flex-grow-0">
      <h5 class="mt-3 text-xl">Resources</h5>
      <ul class="mt-3 text-sm">
        <li><a href="#">Blockchain Api</a></li>
        <li><a href="#">Github Api</a></li>
        <li><a href="#">The New Boston Guide</a></li>  
      </ul>
    </div>
    <div class="md:mx-10 flex-grow w-full md:w-auto md:flex-grow-0">
      <h5 class="mt-3 text-xl">About</h5>
      <ul class="mt-3 text-sm">
        <li><nuxt-link to="/team">Team</nuxt-link></li>
        <li><nuxt-link to="/donation">Donation</nuxt-link></li>
      </ul>
    </div>
  </div>
  <div class="px-6 pb-1 bg-footerclr2 lg:px-32 text-md text-white flex flex-col md:flex-row justify-between shadow-inner">
    <div class="md:mx-10 flex-grow w-full md:w-auto md:flex-grow-0">
      <span class="text-xs">Developed By : Techminate</span>
    </div>
    <div class="md:mx-10 flex-grow w-full md:w-auto md:flex-grow-0">
      <span class="text-xs">Powered By : The New Boston</span>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { Prop, Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Footer extends Vue {

}
</script>

<style scoped>
.text-input {
  @apply px-3 py-2 mt-1 h-12 border-2 border-gray-300 focus:border-gray-800 rounded;
}
</style>