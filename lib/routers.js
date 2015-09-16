
module.exports = function(router) {

  router.map({
    '/': {
      name: 'home',
      component: require('./home.vue')
    },

    '/t/:topicId': {
      name: 'topic',
      component: require('./topic.vue')
    },

    '/c/:slug': {
      name: 'cafe',
      component: require('./cafe.vue'),
      subRoutes: {
        '/': {
          component: require('./views/cafe-topics.vue')
        },
        '/members': {
          name: 'cafe-members',
          component: require('./views/cafe-members.vue')
        }
      }
    },

    '/u/:username': {
      name: 'user',
      component: require('./user.vue'),
      subRoutes: {
        '/': {
          component: require('./views/user-topics.vue')
        }
      }
    },

  });

};
