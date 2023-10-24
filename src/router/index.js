import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '我的客户',
      component: () => import('../views/Home.vue')
    },

    {
      path: '/systemManage',
      name: '系统管理',
      children: [
        {
          path: '/systemManage/user',
          name: '系统用户',
          component: () => import('../views/SystemManage/SystemUser.vue'),
        },
        {
          path: '/systemManage/role',
          name: '角色配置',
          component: () => import('../views/SystemManage/SetRole.vue'),
        },
      ],
    },

    {
      path: '/userManage',
      name: '用户管理',
      children: [
        {
          path: '/userManage/userRank',
          name: '用户等级',
          component: () => import('../views/UserManage/UserRank.vue'),
        },
        {
          path: '/userManage/userList',
          name: '用户列表',
          component: () => import('../views/UserManage/UserList.vue'),
        },
      ],
    },
    {
      path: '/vipManage',
      name: '会员管理',
      children: [
        {
          path: '/vipManage/vipList',
          name: '会员列表',
          component: () => import('../views/VipManage/VipList.vue'),
        },
      ],
    },
    {
      path: '/effectManage',
      name: '功能管理',
      children: [
        {
          path: '/effectManage/sortList',
          name: '类表列表',
          component: () => import('../views/EffectManage/SortList.vue'),
        },
        {
          path: '/effectManage/picture',
          name: '精选图片',
          component: () => import('../views/EffectManage/Picture.vue'),
        },
        {
          path: '/effectManage/keyword',
          name: '精选描述词',
          component: () => import('../views/EffectManage/Keyword.vue'),
        },
      ],
    },
    {
      path: '/pictureManage',
      name: '图片管理',
      children: [
        {
          path: '/pictureManage/posterList',
          name: '海报列表',
          component: () => import('../views/PictureManage/PosterList.vue'),
        },
      ],
    },
    {
      path: '/communityManage',
      name: '社区管理',
      children: [
        {
          path: '/communityManage/articleList',
          name: '文章列表',
          component: () => import('../views//CommunityManage/ArticleList.vue'),
        },
        // {
        //   path: '/communityManage/compilationList.vue',
        //   name: '合辑列表',
        //   component: () => import('../views//CommunityManage/CompilationList.vue'),
        // },
        {
          path: '/communityManage/reportList.vue',
          name: '举报列表',
          component: () => import('../views//CommunityManage/ReportList.vue'),
        },
      ],
    },
    {
      path: '/orderManage',
      name: '订单管理',
      children: [
        {
          path: '/orderManage/orderList',
          name: '订单列表',
          component: () => import('../views/OrderManage/OrderList.vue'),
        },
      ],
    },
    {
      path: '/feedBackManage',
      name: '反馈管理',
      children: [
        {
          path: '/feedBackManage/feedBackList',
          name: '反馈列表',
          component: () => import('../views/FeedBackManage/FeedBackList.vue'),
        },
      ],
    },
    {
      path: '/campaignManage',
      name: '竞选管理',
      children: [
        {
          path: '/campaignManage/campaignList',
          name: '设计竞选列表',
          component: () => import('../views/CampaignManage/CampaignList.vue'),
        },
      ],
    },
    {
      path: '/articleListInfo',
      name: '新建文章',
      component: () => import('../views/ArticleListInfo.vue'),
    },  
     {
      path: '/reportDetail',
      name: '举报详情',
      component: () => import('../views/ReportDetail.vue'),
    },

  ]
})

export default router
