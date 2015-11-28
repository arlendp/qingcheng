
import Home from './views/Home.vue'
import CafeList from './views/CafeList.vue'

export default function(router) {

  router.map({
    '/': {
      name: 'home',
      component: Home,
    },

    '/t/:topicId': {
      name: 'topic',
    },

    '/c/': {
      component: CafeList,
    },

  });

};
