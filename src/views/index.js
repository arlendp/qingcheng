
import Home from './Home.vue'
import CafeList from './CafeList.vue'
import Cafe from './Cafe.vue'
import CafeTopics from './CafeTopics.vue'
import CafeMembers from './CafeMembers.vue'
import Topic from './Topic.vue'
import User from './User.vue'
import UserTopics from './UserTopics.vue'
import CreateTopic from './CreateTopic.vue'
import EditTopic from './EditTopic.vue'

export default {
  '/': {
    name: 'home',
    component: Home,
  },

  '/t/:topicId': {
    name: 'topic',
    component: Topic,
  },

  '/t/:topicId/edit': {
    name: 'edit-topic',
    component: EditTopic
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
      '/create': {
        name: 'create-topic',
        component: CreateTopic
      }
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
}
