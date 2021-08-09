<template>
  <div>
    <vue-particles
      color="#fff"
      particleOpacity="0.5"
      particlesNumber="250"
      shapeType="circle"
      particleSize="2"
      linesColor="#fff"
      linesWidth="1"
      lineLinked="true"
      lineOpacity="0.4"
      linesDistance="100"
      moveSpeed="2"
      hoverEffect="true"
      hoverMode="grab"
      clickEffect="true"
      clickMode="push" 
      class="h-96">
    </vue-particles>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Particles extends Vue {

}
</script>