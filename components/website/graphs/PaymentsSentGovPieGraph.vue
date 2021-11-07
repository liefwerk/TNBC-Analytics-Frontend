<template>
  <div class="relative h-full card">
    <highcharts
      v-if="sentTxs.results"
      :constructor-type="'stockChart'" 
      :options="allOptions">
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
export default class PaymentsSentGovPieGraph extends Vue {
  public sentTxs: any = {}
  readonly pk = '6e5ea8507e38be7250cde9b8ff1f7c8e39a1460de16b38e6f4d5562ae36b5c1a'

  async fetch(){
    console.log('fetching...')
    this.sentTxs = await fetch(`http://54.183.16.194/bank_transactions?account_number=${this.pk}&limit=100&fee=NONE`)
      .then(res => res.json()).catch(err => console.log(err))
  }

  get formatedSentData(): any {
    let bank_transactions: Array<any> = this.sentTxs.results
    
    let data: Array<any> = this.filterSentData(bank_transactions)
    let graph = this.reduceSentData(data)
    const formatedData = this.formatSentData(graph)
    
    return formatedData
  }

  filterSentData(array: Array<any>): any {
    let _arr: Array<any> = []
    for (const txs of array){
      let recipient = txs.recipient;
      let txsDate = txs.block.created_date.split("T")
      let amount = 0
      if(recipient != this.pk){
        for (const tx of array){
          let txDate = tx.block.created_date.split("T")
          if(txsDate[0] === txDate[0]){
            amount = amount + tx.amount
          }
        }
        let obj = {
          "date" : txsDate[0],
          "amount" : amount,
        }
        _arr.push(obj)
      }
    }
    return _arr
  }

  reduceSentData(array): any {
    return array.reduce((acc, current) => {
      const x = acc.find(item => item.date === current.date);
      if (!x) {
        return acc.concat([current])
      } else {
        return acc
      }
    }, [])
  }

  formatSentData(array: Array<any>): any {
    let _arr: Array<any> = []
    array.forEach((element: any) => {
      let formatedDate = moment(element.date).fromNow()
      _arr.push([formatedDate, element.amount])
    })
    return _arr
  }
  
  get allOptions(): any {
    let chartOptions: any = {
      chart: {
        type: 'pie',
        alignTicks: true
      },
      colors: ['#336fdf', '#2a297a', '#336faf'],
      title: {
        text: 'Payments sent from the TNB Government wallet',
        margin: 30,
        align: 'left'
      },
      subtitle: {
        text: 'From November 2nd 2020 until yesterday.',
        align: 'left'
      },
      navigator: { enabled: false },
      tooltip: {
        enabled: false,
        pointFormat: '<b>{point.percentage:.1f}%</b>{point.name}',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.percentage:.1f} % - {point.name}'
          },
          showInLegend: true
        }
      },
      legend: {
        enabled: true,
        floating: true,
      },
      series: [
        {
          name: 'Transactions',
          data: this.formatedSentData
        }
      ]
    }

    return chartOptions
  }

}
</script>