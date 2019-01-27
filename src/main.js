import Vue from 'vue'
import App from './App'
import router from './router'
import Meta from 'vue-meta'

Vue.use(Meta)

import 'normalize.css'

new Vue({
    el: "#root",
    router,
    render: h => h(App)
})