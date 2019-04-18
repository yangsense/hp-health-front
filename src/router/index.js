import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'
import reportlist from '@/views/report/reportlist'
import reportdetail from '@/views/report/reportdetail'
import registry from '@/views/registry/registry'
import test from '@/views/report/test'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/registry',
      name: 'registry',
      component: registry
    },{
      path: '/reportlist',
      name: 'reportlist',
      component: reportlist
    },{
      path: '/reportdetail',
      name: 'reportdetail',
      component: reportdetail
    },{
      path: '/test',
      name: 'test',
      component: test
    }
  ],
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
/*router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('token');
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});*/
