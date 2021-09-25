<template>
  <div class="w-24 h-24 self-center">
    <qrcode-vue class="w-24 h-24" :value="value" level="H" renderAs="svg" />
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
export default class QRCode extends Vue {
  @Prop({ required: true }) readonly value!: Object

}
</script>
