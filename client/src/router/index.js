import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import AboutView from '../views/AboutView.vue'
// import AddPostView from '../views/AddPostView.vue'

Vue.use(VueRouter)

const routes = [
   // {
   //    path: '*',
   //    component: NotFound,
   //    name: 'NotFound',
   //    meta: { title: '404 Not Found' },
   // },

   {
      path: '/',
      name: 'Landing',
      // meta: { title: '404 Not Found' },
      component: () => import('../views/LandingView.vue')
   },

   {
      path: '/auth',
      name: 'Auth',
      component: () => import('../views/auth/AuthView.vue'),
      children: [
         {
            path: '/login',
            name: 'Login',
            component: () => import('../views/auth/LoginView.vue')
         },
         {
            path: '/register',
            name: 'Register',
            component: () => import('../views/auth/RegisterView.vue')
         },
      ],
   },

   {
      path: '/posts',
      name: 'Posts',
      component: () => import('../views/PostsView.vue'),
      children: [
         {
            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            path: '/home',
            name: 'Home',
            component: () => import('../views/HomeView.vue')
         },
         {
            // UserPosts will be rendered inside User's <router-view>
            // when /user/:id/posts is matched
            path: '/about',
            name: 'About',
            component: () => import('../views/AboutView.vue')
         },
         {
            path: '/post/:id',
            name: 'ShowPost',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/ShowPostView.vue')
         },
         {
            path: '/add-post',
            name: 'AddPost',
            component: () => import('../views/AddPostView.vue')
         },
         {
            path: '/update-post/:id',
            name: 'UpdatePost',
            component: () => import('../views/UpdatePostView.vue')
         },
      ],
      // before enter guard for these children routes
      beforeEnter: ( to, from, next) => {
         console.log("b4enter hit !");
         const auth_token = window.localStorage.getItem('auth_token')
         console.log(auth_token);
         if(auth_token){
            console.log("b4enter if hit !");
            next()
         }
         else{
            console.log("b4enter else hit !");
            return next({path: '/login',
               query: {
                  message: 'Unauthenticated ! Please login to enter !!',
               }
            })
         }
      }
   },

   
   // {
   //    path: '/home',
   //    name: 'Home',
   //    component: () => import('../views/HomeView.vue')
   // },
   // {
   //    path: '/post/:id',
   //    name: 'ShowPost',
   //    // route level code-splitting
   //    // this generates a separate chunk (about.[hash].js) for this route
   //    // which is lazy-loaded when the route is visited.
   //    component: () => import('../views/ShowPostView.vue')
   // },
   // {
   //    path: '/add-post',
   //    name: 'AddPost',
   //    component: () => import('../views/AddPostView.vue')
   // },
   // {
   //    path: '/update-post/:id',
   //    name: 'UpdatePost',
   //    component: () => import('../views/UpdatePostView.vue')
   // },
   // {
   //    path: '/about',
   //    name: 'About',
   //    // route level code-splitting
   //    // this generates a separate chunk (about.[hash].js) for this route
   //    // which is lazy-loaded when the route is visited.
   //    component: () => import('../views/AboutView.vue')
   // }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router