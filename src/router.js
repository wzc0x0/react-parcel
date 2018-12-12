import Vue from 'vue'
import VueRouter from 'vue-router'

import upload from './components/upload.vue'
import fullpage from './components/fullpage.vue'
import chartWrapper from './view/ChartWrapper.vue'
import inputMask from './view/InputMaskWrapper.vue'

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
        },
        {
            path: '/fullpage',
            component: fullpage
        },
        {
            path: '/chart',
            component: chartWrapper
        },
        {
            path: '/inputMask',
            component: inputMask
        }
    ]
})