<template>
  <div class="h-96">
    <div :id="id" class="particles-js m-0 p-0 text-center h-full"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { tsParticles } from 'tsparticles'

@Component({})
export default class Particles extends Vue {

  public id: string = 'particles-instance-' + Math.floor(Math.random() * 5000)

  public particlesOptions: any = {
    "particles": {
        "number": {
          "value": 150
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
          "random": false,
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 100,
          "color": "#ffffff",
          "opacity": 0.6,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1.3,
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
            "enable": false,
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
            "distance": 200,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 100,
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
      "pauseOnOutsideViewport": true
  }

  mounted () {
    const tsParticles = require("tsparticles")
    this.initParticleJS()
    this.$nextTick(() => {
      this.onResize()
      window.addEventListener('resize', this.onResize)
    })
  }

  onResize() {
    if (process.client) {
      let width = window.innerWidth
      if (width < 768){
        this.particlesOptions.particles.number.value = 50;
        this.initParticleJS()
      } else {
        this.particlesOptions.particles.number.value = 150;
        this.initParticleJS()
      }
    }
  }
  
  initParticleJS () {
    tsParticles.load(this.id, this.particlesOptions).then((container) => {})
    .catch((error) => {
      console.error(error);
    });
  }

}
</script>