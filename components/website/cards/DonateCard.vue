<template>
  <div class="relative flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-between card mb-4 mx-8 md:mx-16">
    <div class="flex flex-col text-center flex-shrink md:text-left mb-4 md:my-0 self-center">
      <!-- <img :src="donate.qr_image" class="h-6 mx-auto md:mx-0 max-w-max"> -->
      <p class="break-all py-1">{{ donate.title }}</p>
      <p class="break-all py-1">{{ donate.public_key }}</p>
      <p @click="copyThat(donate.public_key)" class="text-blue-700 hover:underline cursor-pointer">Copy the account number</p>
    </div>
    <div class="w-24 h-24 self-center">
      <qrcode-vue class="w-24 h-24" :value="donate.public_key" level="H" renderAs="svg" />
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
export default class DonateCard extends Vue{
  @Prop({ required: true }) readonly donate!: object

  async copyThat(accountNumber: string): Promise<void> {
    if (accountNumber as string)
      await navigator.clipboard.writeText(accountNumber)
        .then((res) => {
          this.$toast.success('Number copied successfully') 
        })
  }
}
</script>