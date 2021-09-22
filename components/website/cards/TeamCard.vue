<template>
  <div class="flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-around card mx-8 md:mx-16 my-8">
    <img class="w-36 h-36 self-center rounded-full" :src="member.image">
    <div class="my-8 text-center flex-shrink md:text-left md:my-0 md:mx-8">
      <p class="py-1 md:py-0 text-subtitle">{{ member.name }}</p>
      <p class="py-1 md:py-0">{{ member.role }}</p>
      <p class="py-1 md:py-0">Github: {{ member.github_username }}</p>
      <p class="py-1 md:py-0">Discord: {{ member.discord_username }}</p>
      <div
        @click="copyThat(member.account_number)"
        class="py-1 md:py-0 md:my-4">
        <span>TNBC Address: </span>
        <div class="flex flex-row flex-nowrap cursor-pointer hover:text-blue-600">
          <CopyIcon
            class="text-blue-400 hover:text-blue-600 h-5 w-5 self-center mr-1"
          />
          <span ref="accountNumber" class="break-all self-center">
            {{ member.account_number }}
          </span>
        </div> 
      </div>
    </div>
    <QRCode :value="member.account_number" />
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
export default class TeamCard extends Vue {
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