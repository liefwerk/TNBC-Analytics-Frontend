<template>
<div>
  <div class="bg-gray-800 h-96 relative">
    <div class="absolute top-1/2 transform -translate-y-1/2 w-full">
      <h1 class="text-5xl text-gray-100 text-center uppercase font-serif">TNBC Analytics</h1>
    </div>
    <div class="">
      <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="200"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="100"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push" 
        class="h-96">
      </vue-particles>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
