<template>
  <div id="app" :class="{dark: theme === 'dark'}">
    <Nav :theme="theme" @toggle-theme="toggleTheme" />
    <div class="container">
      <router-view/>
      <footer>
        <p>Made with <font-awesome-icon :icon="['fas', 'heart']" style="color: red;" /> in Toronto | Coded by &nbsp;
        <a href="https://github.com/thewebbeckons">thewebbeckons</a></p>
      </footer>
    </div>
    <GoToTop />    
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import GoToTop from '@/components/GoToTop.vue'

export default {
  components: {
    Nav,
    GoToTop
  },
  data () {
    return {
      theme: 'light'
    }
  },
  mounted () {
    if (localStorage.theme) {
      this.theme = localStorage.theme
    } else {
      localStorage.theme = this.theme
    }
  },
  methods: {
    toggleTheme () {
      if (this.theme === 'light') {
        this.theme = 'dark'
        localStorage.theme = this.theme
      } else {
        this.theme = 'light'
        localStorage.theme = this.theme
      }
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  outline: none;
  -webkit-box-sizing: border-box; 
  -moz-box-sizing: border-box; 
  box-sizing: border-box;
}
// container css
.container {
  max-width: 1400px;
  margin-right: auto;
  margin-left:  auto;
  padding-right: 20px;
  padding-left:  20px;
}
#nav + .container {
  padding-top: calc(3rem + 6vh);
}
// App Style
#app {
  font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $light-text;
  background-color: $light-background;
  min-height: 100vh;
  &.dark {
    color: $dark-text;
    background-color: $dark-background;    
    #nav, button, input, .card, ul {
      background-color: $dark-elements;
      color: $dark-text;
      box-shadow: $dark-box-shadow;
    }
    input:focus {
      border: 2px solid $dark-text;
    }
    input::placeholder, input:focus, footer p svg, .loading {
      color: $dark-text;
    }
    .card ul, .country-info-meta ul {
      border-radius: none;
      box-shadow: none;
      background: transparent;
    } 
    li > span {
      background-color: transparent;
    }
    span {
      background-color: $dark-elements;
      box-shadow: $dark-box-shadow;
    }
    & footer {
      border-top: 1px solid $light-background;      
    }
  }
}

footer {
  border-top: 1px solid $dark-background;
  padding: 3rem 0;
  text-align: center;  
  p {
    font-family: $font;
  }
}
// Mobile Media Query
@media screen and (max-width: 1024px) {
  #nav + .container {
    padding-top: calc(3rem + 6vh);
  }
  .container {
    width: 100%;
  }
}
</style>
