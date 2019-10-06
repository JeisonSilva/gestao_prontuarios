import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Pesquisa from './components/Pesquisa.vue'
import Registro from './components/Registro.vue'
import Favorito from './components/Favorito.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

Vue.config.productionTip = false
Vue.use(VueRouter)



const routes = [
  { path: '/', component: Pesquisa },
  { path: '/pesquisa', component: Pesquisa },
  { path: '/registro', component: Registro },
  { path: '/favorito', component: Favorito }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
