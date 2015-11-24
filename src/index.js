require('../lib/css/base.css');
require('../lib/css/ui.css');

import Vue from 'vue';
import VueRouter from 'vue-router';
import registerRouters from './routers';
import App from './app.vue';
import * as filters from './filters';

// site configuration
var zerqu = window.ZERQU || {};
if (process.env.NODE_ENV === 'production') {
  require('./ga');
} else {
  window.ga = function() {};
  Vue.config.debug = true;
}

Object.defineProperty(Vue.prototype, '$site', {
  get: function() {
    return zerqu.site || {name: 'ZERQU'};
  }
});

// register filters
Object.keys(filters).forEach(function(k) {
  Vue.filter(k, filters[k]);
});

Vue.use(VueRouter);

var router = new VueRouter({
  hashbang: false,
  history: true,
  saveScrollPosition: true
});

registerRouters(router);

router.start(App, '#app');
require('../lib/api').register(router.app);
