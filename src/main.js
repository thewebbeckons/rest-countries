import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuex from 'vuex'
import VueHotkey from 'v-hotkey'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faChevronUp, faMoon, faHeart, faSearch, faTimes, faArrowLeft, faSpinner, faCircle, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faMoon as farMoon, faKeyboard as farKeyboard } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import './assets/variables.scss';


library.add(faChevronDown, faChevronUp, faMoon, faGithub, faHeart, farMoon, faSearch, faTimes, faArrowLeft, faSpinner, faCircle, farKeyboard, faKeyboard)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

Vue.use(VueHotkey)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    keyboard: false
  },
  mutations: {
    toggle (state) {
      state.keyboard = !state.keyboard
    }
  }
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
