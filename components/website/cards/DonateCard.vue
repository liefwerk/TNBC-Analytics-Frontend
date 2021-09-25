<template>
  <div class="relative flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-between card mb-4 mx-8 md:mx-16">
    <div class="flex flex-col text-center flex-shrink md:text-left mb-4 md:my-0 self-center">
      <img 
        class="w-auto h-6 self-center md:self-start"
        :src="donation.qr_image"
        :alt="donation.title">
      <div
        @click="copyThat(donation.public_key)"
        class="py-1 md:py-0 md:my-4">
        <span>You can donate with this address: </span>
        <div class="flex flex-col md:flex-row flex-nowrap cursor-pointer hover:text-blue-600">
          <CopyIcon
            class="text-blue-400 hover:text-blue-600 h-5 w-5 self-center order-2 lg:order-1 lg:self-start mr-1"
          />
          <span ref="accountNumber" class="break-all self-center order-1">
            {{ donation.public_key }}
          </span>
        </div> 
      </div>
    </div>
    <QRCode v-if="donation.title === 'thenewboston'" :value="stringifiedPublicKey" />
    <QRCode v-else :value="donation.public_key" />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
import QRCode from '@/components/website/QRCode.vue'
import CopyIcon from '@/components/icons/CopyIcon.vue'
import { Donation } from '@/constants/types/Donate'

@Component({
  components: {
    QRCode,
    CopyIcon
  }
})
export default class DonateCard extends Vue {
  @Prop({ required: true }) readonly donation!: Donation

  async copyThat(accountNumber: string): Promise<void> {
    if (accountNumber as string)
      await navigator.clipboard.writeText(accountNumber)
        .then((res) => {
          this.$toast.success('Number copied successfully') 
        })
  }

  get stringifiedPublicKey(): Object {
    let publicKey ={ "address": this.donation.public_key }
    return JSON.stringify(publicKey)
  }
}
</script>