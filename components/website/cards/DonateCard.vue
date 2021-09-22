<template>
  <div class="relative flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-between card mb-4 mx-8 md:mx-16">
    <div class="flex flex-col text-center flex-shrink md:text-left mb-4 md:my-0 self-center">
      <p class="break-all py-1">{{ donate.title }}</p>
      <div
        @click="copyThat(donate.public_key)"
        class="py-1 md:py-0 md:my-4">
        <span>TNBC Address: </span>
        <div class="flex flex-row flex-nowrap cursor-pointer hover:text-blue-600">
          <CopyIcon
            class="text-blue-400 hover:text-blue-600 h-5 w-5 self-center mr-1"
          />
          <span ref="accountNumber" class="break-all self-center">
            {{ donate.public_key }}
          </span>
        </div> 
      </div>
    </div>
    <QRCode :value="donate.public_key" />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
import QRCode from '@/components/website/QRCode.vue'
import CopyIcon from '@/components/icons/CopyIcon.vue'

@Component({
  components: {
    QRCode,
    CopyIcon
  }
})
export default class DonateCard extends Vue {
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