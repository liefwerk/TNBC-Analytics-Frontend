<template>
  <div class="mt-12 mb-20 mx-6 md:mx-12">
    <div class="w-full">
      <TestGraph :data="getFormatedData" @handleFilter="changeDateRange"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TestGraph from '@/components/website/graphs/TestGraph.vue';
import { Options } from '@/constants/types/Table'
import { Transaction } from '@/constants/types/Graph'
import { Government } from '@/constants/types/AnalyticsData'
import _ from 'lodash'
import moment from 'moment'

export default Vue.extend({
  components: {
    TestGraph
  },
  data() {
    return {
      tableOptions: {} as Options,
      government: {} as Government,
      transactions: [] as Array<Transaction>,
      graphData: [],
      perPage: 5,
      pageOffset: 0,
      transactionType: 'transaction_type=GOVERNMENT',
      columns: [
        {
          name: 'date',
          attribute: 'date'
        },
        {
          name: 'amount',
          attribute: 'amount'
        },
        {
          name: 'github issue id',
          attribute: 'githubIssueId'
        },
        {
          name: 'recipient public key',
          attribute: 'recipientPublicKey'
        },
      ],
      startArray: [
        {
          "date": "2021-10-07",
          "amount": 21
        },
        {
          "date": "2021-10-07",
          "amount": 477
        },
        {
          "date": "2021-10-06",
          "amount": 3
        },
      ]
    }
  },
  async asyncData({ $http }: any) {

    const _graphData: any = await $http.post('https://tnbanalytics.pythonanywhere.com/government-chart', { days: '31' })
      .then((res: any) => res.json())
    let graphData = _graphData.data

    return { graphData } as any
  },
  methods: {
    async changeDateRange(value: any): Promise<void> {
      const _graphData: any = await fetch('https://tnbanalytics.pythonanywhere.com/government-chart', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({days: value})
      })
      .then((res: any) => res.json())
      .catch(err => console.log(err))
      this.graphData = _graphData.data
    }
  },
  computed: {
    getFormatedData(): any {
      
      //// Algorithm example

      // for (i=0  ){
      //       $date = "2021-10-06";
      //       for(i= ){
      //           if(){
      //               amunt = 687;
      //               amount =amount + amount
      //                      =21+ 477
      //           }
      //       }
      //   }

      let results = this.startArray

      return results
    }
  }

})
</script>
