<template>
  <div class="relative h-full card">
    <highcharts
      v-if="receivedTxs.results"
      :constructor-type="'stockChart'" 
      :options="transactions">
    </highcharts>
    <div v-else><CircleSpinner class="h-16 w-16 mx-auto" /></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CircleSpinner from '@/components/website/spinner/CircleSpinner.vue'
import moment from 'moment'

@Component({
  components: {
    CircleSpinner
  }
})
export default class GovernmentGraph extends Vue {
  public receivedTxs: any = {}
  readonly govPK = '6e5ea8507e38be7250cde9b8ff1f7c8e39a1460de16b38e6f4d5562ae36b5c1a'
  readonly treasuryPK = '23676c35fce177aef2412e3ab12d22bf521ed423c6f55b8922c336500a1a27c5'

  async fetch() {
    this.receivedTxs = await fetch(`http://54.183.16.194/bank_transactions?&block__sender=${this.treasuryPK}&recipient=${this.govPK}`)
      .then(res => res.json()).catch(err => console.log(err))
  }

  get formatedReceivedData(): any {
    let formatedReceivedData: any = []
    
    this.receivedTxs.results.map(function (d: any){
      const formatedDate = moment(d.block.created_date).valueOf()
      formatedReceivedData.push([formatedDate, d.amount])
    })

    return formatedReceivedData
  }

  get transactions(): any {
    let chartOptions: any =
    {
      chart: {
        type: 'areaspline'
      },
      title: {
        text: 'Payments reveived on the TNB Government wallet',
        margin: 30,
        align: 'left'
      },
      subtitle: {
        text: 'From the TNB Treasury Account',
        align: 'left'
      },
      tooltip: {
        shared: true,
        valueSuffix: ' TNBC'
      },
      scrollbar: {
        enabled: false
      },
      navigator: { enabled: false },
      xAxis: {
        categories: []
      },
      series: [
        {
          name: 'Transactions',
          data: this.formatedReceivedData
        }
      ]
    }

    return chartOptions
  }

}
</script>