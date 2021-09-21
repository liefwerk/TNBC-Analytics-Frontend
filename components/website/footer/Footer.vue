<template>
<div>
  <div class="py-6 px-6 bg-footerclr lg:px-32 text-md text-white flex flex-col md:flex-row justify-between shadow-inner font-sans font-normal">
    <div class="md:mx-10 flex-grow w-full md:w-auto md:flex-grow-0">
      <h5 class="my-4 opacity-60">TNBC Analytics</h5>   
      <ul v-for="(setting, index) in settings.results" :key="index" class="mt-3 text-sm">
        <li class="pb-4 hover:text-gray-300">
          <a
            :href="'https://github.com/' + setting.github_username">
            Github
          </a>
        </li>
        <li class="pb-4 hover:text-gray-300">
          <a
            :href="'https://www.reddit.com/u/' + setting.reddit_username">
            Reddit
          </a>
        </li>
        <li class="pb-4 hover:text-gray-300">
          <a
            :href="'https://twitter.com/' + setting.twitter_username">
            Twitter
          </a>
        </li>
        <li class="pb-4 hover:text-gray-300">
          <a
            :href="'https://discord.com/invite/' + setting.discord_invitation_code">
            Discord
          </a>
        </li>
      </ul>
    </div>
      <div class="md:mx-10 flex-grow w-full md:w-auto md:flex-grow-0">
      <h5 class="my-4 opacity-60">Useful Links</h5>
      <ul class="mt-3 text-sm">
        <li class="pb-4 hover:text-gray-300"><a href="#">The New Boston</a></li>
        <li class="pb-4 hover:text-gray-300"><a href="#">TNBC Wallet</a></li>
        <li class="pb-4 hover:text-gray-300"><a href="#">TNBC Explorer</a></li>  
      </ul>
    </div>
      <div class="md:mx-10 flex-grow w-full md:w-auto md:flex-grow-0">
      <h5 class="my-4 opacity-60">Resources</h5>
      <ul class="mt-3 text-sm">
        <li class="pb-4 hover:text-gray-300"><a href="#">Blockchain Api</a></li>
        <li class="pb-4 hover:text-gray-300"><a href="#">Github Api</a></li>
        <li class="pb-4 hover:text-gray-300"><a href="#">The New Boston Guide</a></li>
      </ul>
    </div>
    <div class="md:mx-10 flex-grow w-full md:w-auto md:flex-grow-0">
      <h5 class="my-4 opacity-60">About</h5>
      <ul class="mt-3 text-sm">
        <li class="pb-4 hover:text-gray-300"><nuxt-link to="/team">Team</nuxt-link></li>
        <li class="pb-4 hover:text-gray-300"><nuxt-link to="/donate">Donation</nuxt-link></li>
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
import Vue from 'vue'

export default Vue.extend({
  name: 'Footer',
  data() {
    return {
      settings: {}
    }
  },
  async fetch() {
    this.settings = await fetch('https://tnbanalytics.pythonanywhere.com/setting')
      .then((res) => res.json())
      .catch(err => console.log(err))
  }
})
</script>

<style scoped>
.text-input {
  @apply px-3 py-2 mt-1 h-12 border-2 border-gray-300 focus:border-gray-800 rounded;
}
</style>