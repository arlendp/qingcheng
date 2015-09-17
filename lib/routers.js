
module.exports = function(router) {

  router.map({
    '/': {
      name: 'home',
      component: require('./views/home.vue')
    },

    '/t/:topicId': {
      name: 'topic',
      component: require('./views/topic.vue')
    },
    '/t/:topicId/edit': {
      name: 'edit-topic',
      component: require('./views/edit-topic.vue')
    },

    '/c/': {
      component: require('./views/cafe-list.vue'),
    },

    '/c/:slug': {
      name: 'cafe',
      component: require('./views/cafe.vue'),
      subRoutes: {
        '/': {
          component: require('./views/cafe-topics.vue')
        },
        '/members': {
          name: 'cafe-members',
          component: require('./views/cafe-members.vue')
        },
        '/create': {
          name: 'create-topic',
          component: require('./views/create-topic.vue')
        }
      }
    },

    '/u/:username': {
      name: 'user',
      component: require('./views/user.vue'),
      subRoutes: {
        '/': {
          component: require('./views/user-topics.vue')
        }
      }
    },

  });

};
