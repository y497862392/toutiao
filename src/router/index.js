import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginIndex.vue')
 }
]

const router = new VueRouter({
  routes
})

export default router
