import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'

Vue.use(VueRouter)

const requireAuth = () => (from, to, next) => {
  const isAuthenticated = false
  if (isAuthenticated) return next()
  next('/auth/login?returnPath=about')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: requireAuth()
  },
  {
    path: '/auth',
    component: Auth,
    children:
      [
        {
          path: 'login',
          component: () => import('../components/Login.vue')
        }
      ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
