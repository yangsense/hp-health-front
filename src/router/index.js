import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'
import reportlist from '@/views/report/reportlist'
import reportdetail from '@/views/report/reportdetail'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/reportlist',
      name: 'reportlist',
      component: reportlist
    },{
      path: '/reportdetail',
      name: 'reportdetail',
      component: reportdetail
    }
  ]
})
