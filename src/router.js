import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/upload'
        },
        {
            path: '/upload',
            component: () =>
                import ('./components/upload.vue')
        },
        {
            path: '/fullpage',
            component: () =>
                import ('./components/fullpage.vue')
        },
        {
            path: '/chart',
            component: () =>
                import ('./view/ChartWrapper.vue')
        },
        {
            path: '/inputMask',
            component: () =>
                import ('./view/InputMaskWrapper.vue')
        },
        {
            path: "/webWorker",
            component: () =>
                import ('./view/WebWorker.vue')
        },
        {
            path: "/translate",
            component: () =>
                import ('./view/Translate.vue')
        },
        {
            path: "/scratch",
            component: () =>
                import ('./view/ScratchCanvas.vue')
        }
    ]
})