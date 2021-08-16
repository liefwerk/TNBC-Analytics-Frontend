<template>
  <div class="flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-center card md:w-3/4 max-w-max mx-8 md:mx-auto my-8">
    <img class="w-24 h-24 self-center" :src="member.image">
    <div class="my-8 text-center flex-shrink md:text-left md:my-0 md:mx-8">
      <p class="py-1 md:py-0 text-subtitle">{{ member.name }}</p>
      <p class="py-1 md:py-0">{{ member.role }}</p>
      <p class="py-1 md:py-0">Github: {{ member.github_username }}</p>
      <p class="py-1 md:py-0">Discord: {{ member.discord_username }}</p>
      <div class="py-1 md:py-0 md:my-4">
        <p class="break-all">TNBC Address: <span ref="accountNumber">{{ member.account_number }}</span></p>
        <p @click="copyThat(member.account_number)" class="text-blue-700 hover:underline cursor-pointer">Copy the account number</p>
      </div>
    </div>
    <div class="w-24 h-24 self-center">
      <qrcode-vue class="" :value="member.account_number" level="H" renderAs="svg" />
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

import QrcodeVue from 'qrcode.vue'

@Component({
  components: {
    QrcodeVue
  }
})
export default class TeamCard extends Vue{
  @Prop({ required: true }) readonly member!: object

  async copyThat(accountNumber: string): Promise<void> {
    if (accountNumber as string)
      await navigator.clipboard.writeText(accountNumber)
        .then((res) => {
          this.$toast.success('Number copied successfully') 
        })
  }

}
</script>