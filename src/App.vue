<template>
  <div id="app" :class="{dark: theme === 'dark'}">
    <Nav :theme="theme" @toggle-theme="toggleTheme" @show-keyboard="toggleKeyboard" />
    <div class="container">
      <router-view/>
      <footer>
        <p>Made with <font-awesome-icon :icon="['fas', 'heart']" style="color: red;" /> in Toronto | 
        Project from <a href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca">Frontend Mentor</a> | Coded by &nbsp;
        <a href="https://github.com/thewebbeckons">thewebbeckons</a></p>
      </footer>
    </div>
    <GoTop :size="40" :right="20" :bottom="20" bg-color="rgba(0,0,0,0.7)" />        
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import GoTop from '@inotom/vue-go-top';

export default {
  components: {
    Nav,
    GoTop
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
    },
    toggleKeyboard () {
      this.$store.commit('toggle')
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
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
  color: $text-light;
  background-color: $background-light;
  min-height: 100vh;
  overflow-x: hidden;
  &.dark {
    color: $text-dark;
    background-color: $background-dark;    
    #nav, button, input, .card, ul {
      background-color: $dark-elements;
      color: $text-dark;
      box-shadow: $dark-box-shadow;
    }
    input:focus {
      border: 2px solid $text-dark;
    }
    input::placeholder, input:focus, footer p svg, .loading {
      color: $text-dark;
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
      border-top: 1px solid $background-light;
      a {
        color: $text-dark;    
      }   
    }
  }
}

footer {
  border-top: 1px solid $background-dark;
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
