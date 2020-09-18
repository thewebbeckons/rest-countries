<template>
  <div id="nav">
    <div>
      <h1 class="nav-item">Where in the world?</h1>
      <span v-if="theme === 'light'" class="nav-item">
        <button v-show="useKeyboard" @click="showKeyboard()"><font-awesome-icon :icon="['far', 'keyboard']" />Keyboard</button>
        <button class="nav-item" @click="toggle()"><font-awesome-icon :icon="['far', 'moon']" />Dark Mode</button>
      </span>
      <span v-else class="nav-item">
        <button v-show="useKeyboard" @click="showKeyboard()"><font-awesome-icon :icon="['far', 'keyboard']" />Keyboard</button>
        <button class="nav-item" @click="toggle()"><font-awesome-icon :icon="['fas', 'moon']" />Light Mode</button>
      </span>      
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'theme'
  ],
  data () {
    return {
      useKeyboard: true
    }
  },
  created () {
    this.needKeyboard()
  },
  methods: {
    toggle () {
      this.$emit('toggle-theme')
    },
    showKeyboard () {
      this.$emit('show-keyboard')
    },
    needKeyboard () {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        this.useKeyboard = false
      }else if (this.$route.name === 'Country') {
        // false for not mobile device
        this.useKeyboard = false
      } else {
        this.useKeyboard = true
      }
    }
  }
}
</script>

<style lang="scss">
// Navigation
#nav {
  position: fixed;
  width: 100%;
  z-index: 1;
  top:0;
  box-shadow: $box-shadow;
  background-color: $light-elements;
  & .dark {
    background-color: $dark-elements;
  }
  div {
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 15px;
    h1 {
      font-size: 1.4rem;
      font-weight: 800;
    }
    .nav-item {
      align-self: center;
    }
    button {
      font-weight: 600;
      font-size: $home-size;      
      display: inline-block;
      border: none;
      background-color: transparent;
      cursor: pointer;
      svg {
        margin-right:0.5rem;
      }
      &:first-of-type {
        margin-right: 1rem;
      }
    }
  }
}
// Tablet Media Query
@media screen and (max-width: 1440px) {  
  #nav div {
    padding: 1rem 2rem;
    h1 {
      font-size: 1.6rem;
    }
    button {
      font-size: 1rem;
    }
  }
}
// Mobile Media Query
@media screen and (max-width: 1024px) {  
  #nav div {
    padding: 1rem 0.5rem;
    h1 {
      font-size: 1rem;
    }
    button {
      font-size: 0.8rem;
      &:first-of-type {
        margin-right: 0.5rem;
      }
    }
  }
}
</style>