import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/detail/index.vue'),
    props: true
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile/index'),
    props: true
  },
  {
    path: '/',
    // name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '', // 默认路由，当访问父路由会自动跳转到此路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
