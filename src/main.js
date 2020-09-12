import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Skeleton from 'vue-loading-skeleton'
import VueHotkey from 'v-hotkey'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faChevronUp, faMoon, faHeart, faSearch, faTimes, faArrowLeft, faSpinner, faCircle } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faMoon as farMoon } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import './assets/variables.scss';

library.add(faChevronDown, faChevronUp, faMoon, faGithub, faHeart, farMoon, faSearch, faTimes, faArrowLeft, faSpinner, faCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

Vue.use(Skeleton)
Vue.use(VueHotkey)

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
