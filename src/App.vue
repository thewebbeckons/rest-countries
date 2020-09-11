<template>
  <div id="app">
    <div id="nav">
      <div class="nav">
        <h1 class="nav-item">Where in the world?</h1>
        <a class="nav-item"><font-awesome-icon :icon="['far', 'moon']" style="margin-right: 1rem;" />Dark Mode</a>
      </div>
    </div>
    <router-view/>
    <footer>
      <p>Made with <font-awesome-icon :icon="['fas', 'heart']" style="color: red;" /> in Toronto |
      <a href="https://github.com/thewebbeckons"><font-awesome-icon :icon="['fab', 'github']" /></a></p>
    </footer>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  outline: none;
}
#app {
  font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $light-text;
  background-color: $light-background;
  min-height: 100vh;
}
#nav {
  position: fixed;
  width: 100%;
  top:0;
  box-shadow: 0 0 15px darken($light-background, 10%);
  background-color: $light-elements;
  .nav {
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 1rem 0;
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
    }
  }
}
#nav + .container {
  padding: calc(3rem + 6vh) 0;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding-top: 3rem;
}
footer {
  border-top: 1px solid $dark-background;
  max-width: 1440px;
  padding: 1rem 0;
  margin: 0 auto;
  text-align: center;
  p {
    font-family: $font;
  }
}
// Tablet Media Query
@media screen and (max-width: 1440px) {
  .container {
    margin: 0 2rem;
  }
  #nav .nav {
    margin: 0 2rem;
    h1 {
      font-size: 1.6rem;
    }
    a {
      font-size: 1rem;
    }
  }
}
// Mobile Media Query
@media screen and (max-width: 767px) {
  .container {
    margin: 0 2rem;
  }
  #nav .nav {
    margin: 0 2rem;
    h1 {
      font-size: 1rem;
    }
    a {
      font-size: 0.8rem;
    }
  }
}
</style>
