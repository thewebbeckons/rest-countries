<template>
  <div id="nav">
    <div>
      <h1 class="nav-item">Where in the world?</h1>
      <a v-if="theme === 'light'" class="nav-item" @click="toggle()" tabindex="0"><font-awesome-icon :icon="['far', 'moon']" />Dark Mode</a>
      <a v-else class="nav-item" @click="toggle()" tabindex="0"><font-awesome-icon :icon="['fas', 'moon']" />Light Mode</a>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'theme'
  ],  
  methods: {
    toggle () {
      this.$emit('toggle-theme')
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
    padding: 1rem 20px;
    h1 {
      font-size: 1.4rem;
      font-weight: 800;
    }
    .nav-item {
      align-self: center;
    }
    a {
      font-weight: 600;
      font-size: $home-size;
      cursor: pointer;
      svg {
        margin-right:0.5rem;
      }
    }
  }
}
// Tablet Media Query
@media screen and (max-width: 1440px) {  
  #nav div {
    padding: 2rem 2rem;
    h1 {
      font-size: 1.6rem;
    }
    a {
      font-size: 1rem;
    }
  }
}
// Mobile Media Query
@media screen and (max-width: 1024px) {  
  #nav div {
    padding: 1rem 1rem;
    h1 {
      font-size: 1rem;
    }
    a {
      font-size: 0.8rem;
    }
  }
}
</style>