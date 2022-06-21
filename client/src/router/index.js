import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import AboutView from '../views/AboutView.vue'
// import AddPostView from '../views/AddPostView.vue'

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
   },
   {
      path: '/post/:id',
      name: 'ShowPost',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/ShowPostView.vue')
   },
   {
      path: '/add-post',
      name: 'AddPost',
      component: () => import(/* webpackChunkName: "about" */ '../views/AddPostView.vue')
   },
   {
      path: '/update-post/:id',
      name: 'UpdatePost',
      component: () => import(/* webpackChunkName: "about" */ '../views/UpdatePostView.vue')
   },
   {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router
