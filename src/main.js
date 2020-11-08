import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/index.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCocktail, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCocktail, faArrowLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
