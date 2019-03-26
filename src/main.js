import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Element from 'element-ui';

import md5 from './plugins/md5'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.use(md5);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
