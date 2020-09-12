<template>
  <transition name="slide">
    <div v-if="isActive" class="gototop">
      <font-awesome-layers class="fa-3x" @click="scrollToTop()">
        <font-awesome-icon :icon="['fas', 'circle']" :style="{opacity: 0.7}" />
        <font-awesome-icon :icon="['fas', 'chevron-up']" transform="shrink-6" :style="{ color: 'white' }" />
      </font-awesome-layers>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      isActive: false
    }
  }, 
  created () {
    window.addEventListener('scroll', this.throttleScroll(200, this.handleScroll))
  },
  methods: {
    scrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    },
    handleScroll () {
      this.isActive = window.pageYOffset > 450
    },
    throttleScroll (delay, fn) {
      let lastCall = 0;
      return function (...args) {
        const now = (new Date).getTime();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return fn(...args);
      }
    }
  }
}
</script>

<style lang="scss">
.gototop {
  position: fixed;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}
// Transition Animation
.slide-enter-active {
  transition: all .3s ease;
}
.slide-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>