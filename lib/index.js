require('./css/base.css');
require('./css/ui.css');
require('./css/animate.css');
require('./css/yue.css');
require('./css/pygments.css');

var Vue = require('vue');

// site configuration
var zerqu = window.ZERQU || {};
if (zerqu.production) {
  require('./ga');
} else {
  ga = function() {};
  Vue.config.debug = true;
}

Object.defineProperty(Vue.prototype, '$site', {
  get: function() {
    return zerqu.site || {name: 'ZERQU'};
  }
});

// register filters
var filters = require('./filters');
Object.keys(filters).forEach(function(k) {
  Vue.filter(k, filters[k]);
});

// var app = new Vue(require('./app.vue'));
// require('./api').register(app);

var App = Vue.extend(require('./app.vue'));
var Router = require('vue-router');
Vue.use(Router);

var router = new Router();

router.map({
  '/': {
    component: require('./home.vue')
  },
  '/t/:topicId': {
    component: require('./topic.vue')
  }
});

router.start(App, '#app');
require('./api').register(router.app);
