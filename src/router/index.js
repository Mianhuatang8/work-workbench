import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '我的客户',
      component:()=>import('../views/MyCustomer.vue')
    },
     {//视频
      path: '/video',
      name: '视频',
      component: () => import('../views/Video.vue'),
    },
    {//关注
      path: '/foucus',
      name: '关注',
      component: () => import('../views/Focus.vue'),
    },
    {//直播e
      path: '/liveing',
      name: '直播',
      component: () => import('../views/Liveing.vue'),
    },
    {//私人漫游
      path: '/privacy',
      name: '私人漫游',
      component: () => import('../views/Privacy.vue'),
    },
  ]
})

export default router
