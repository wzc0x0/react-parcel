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
            path: "/progress",
            component: () =>
                import ('./view/Progress.vue')
        },
        {
            path: "/scratch",
            component: () =>
                import ('./view/ScratchCanvas.vue')
        },
        {
            path: "/bootstrap",
            component: () =>
                import ('./view/BootstrapVue.vue')
        },
        {
            path: "/jszip",
            component: () =>
                import ('./view/JSZip.vue')
        },
        {
            path: "/pdfview",
            component: () =>
                import ('./view/PdfView.vue')
        },
        {
            path: "/qrcode",
            component: () =>
                import ('./view/Qrcode.vue')
        },
        {
            path: "/drawCanvas",
            component: () =>
                import ('./view/DrawCanvas.vue')
        },
        {
            path: "/happyNewYear",
            component: () =>
                import ('./view/HappyNewYear.vue')
        },
        {
            path: "/instascan",
            component: () =>
                import ('./view/Instascan.vue')
        },
        {
            path: "/closeRefresh",
            component: () =>
                import ('./view/CloseRefresh.vue')
        },
        {
            path: "/firework",
            redirect: '1',
            component: () =>
                import ('./view/firework/Firework.vue'),
            children: [{
                    path: "1",
                    component: () =>
                        import ('./view/firework/Firework1.vue')
                },
                {
                    path: "2",
                    component: () =>
                        import ('./view/firework/Firework2.vue')
                },
                {
                    path: "3",
                    component: () =>
                        import ('./view/firework/Firework3.vue')
                },
                {
                    path: "4",
                    component: () =>
                        import ('./view/firework/Firework4.vue')
                },
                {
                    path: "particle",
                    component: () =>
                        import ('./view/firework/Particle.vue')
                }
            ]
        }
    ]
})