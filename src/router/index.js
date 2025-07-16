import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '@/views/MainView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView,
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: MainView,
  },
  {
    path: '/call-logs',
    name: 'callLogs',
    component: () => import(/* webpackChunkName: "call-logs" */ '@/views/CallLogsView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
