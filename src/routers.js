
import Home from './views/Home.vue'
import CafeList from './views/CafeList.vue'
import Cafe from './views/Cafe.vue'
import CafeTopics from './views/CafeTopics.vue'
import CafeMembers from './views/CafeMembers.vue'
import User from './views/User.vue'
import UserTopics from './views/UserTopics.vue'

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

    '/c/:slug': {
      name: 'cafe',
      component: Cafe,
      subRoutes: {
        '/': {
          component: CafeTopics
        },
        '/members': {
          name: 'cafe-members',
          component: CafeMembers
        },
			}
		},

    '/u/:username': {
      name: 'user',
      component: User,
      subRoutes: {
        '/': {
          component: UserTopics
        }
      }
    },

  });

};
