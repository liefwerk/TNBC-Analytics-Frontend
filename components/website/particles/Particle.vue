<template>
  <div class="h-96">
    <!--<particles-bg type="cobweb" :bg="false" color="#ffffff" cross="dead"/>-->
    <div :id="id" class="particles-js m-0 p-0 text-center h-full"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { tsParticles } from 'tsparticles'

@Component({})
export default class Particles extends Vue {

  public id: string = 'particles-instance-' + Math.floor(Math.random() * 5000)

  mounted () {
    const tsParticles = require("tsparticles")
    this.$nextTick(() => {
      this.initParticleJS()
    })
  }
  
  initParticleJS () {
    tsParticles.load(this.id, {
      "particles": {
        "number": {
          "value": 200,
          "density": {
            "enable": true,
            "value_area": 600
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
        },
        "opacity": {
          "value": 0.8,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 12.0,
            "opacity_min": 0.6,
            "sync": false
          }
        },
        "size": {
          "value": 2,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 0.3,
            "size_min": 1.,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 80,
          "color": "#ffffff",
          "opacity": 0.7,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1.5,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 0,
            "rotateY": 0
          }
        }
      },
      "interactivity": {
        "detect_on": "window",
        "events": {
        "onDiv": [
          {
            "enable": true,
            "selectors": ".titlespace",
            "mode": "bounce"
          },], 
          "resize": true,
          "onhover": {
            "enable": true,
            "mode": "repulse",
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          }
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 250,
            "size": 5,
            "duration": 2,
            "opacity": 0.9,
          },
          "repulse": {
            "distance": 50,
            "duration": 0.2,
            "factor": 50,
            "speed": 1
          },
          "push": {
            "particles_nb": 1
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true,
      "pauseOnOutsideViewport":true
    }).then((container) => {})
    .catch((error) => {
      console.error(error);
    });
  }

}
</script>