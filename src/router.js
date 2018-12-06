import Vue from 'vue'
import VueRouter from 'vue-router'

import upload from './components/upload.vue'

Vue.use(VueRouter)


export default new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/upload'
        },
        {
            path: '/upload',
            component: upload
        }
    ]
})