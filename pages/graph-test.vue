<template>
  <div class="">
    <p class="text-2xl text-center">Graph Test</p>
    <div class="w-3/4 mx-auto">
      <TestGraph :transactions="getFormatedDate" />
    </div>
    {{ getFormatedDate }}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

import TestGraph from '@/components/website/graphs/TestGraph.vue'

export default Vue.extend({
  data(){
    return {
      data: [
        ['07 06, 2021', 1000],
        ['07 08, 2021', 311],
        ['07 10, 2021', 46],
        ['07 12, 2021', 566],
        ['07 21, 2021', 486],
      ]
    }
  },
  components: {
    TestGraph
  },
  computed: {
    getFormatedDate(): any {

      const _data = this.data.map(d => (
        [ Date.parse(d[0]), d[1] ]
      ))
      console.log(_data)
      return _data;
    }
  }

})
</script>