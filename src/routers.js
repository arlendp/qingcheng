
import Home from './views/Home.vue'

export default function(router) {

  router.map({
    '/': {
      name: 'home',
      component: Home,
    },

    '/t/:topicId': {
      name: 'topic',
    },

  });

};
