// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'
import { routes } from './router/router'

Vue.config.productionTip = false

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes // 路由配置在router.js文件
})

Vue.use(VueRouter)
Vue.use(VueLazyload, {
    loading: require('./common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})