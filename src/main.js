import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Skeleton from 'vue-loading-skeleton'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faMoon, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faMoon as farMoon } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './assets/variables.scss';

library.add(faChevronDown, faMoon, faGithub, faHeart, farMoon, faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Skeleton)

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
