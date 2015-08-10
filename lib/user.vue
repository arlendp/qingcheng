<template>
  <div class="header">
    <div class="header-cover cover">
      <div class="header-intro cover-inner">
        <div class="item-container container">
          <user-avatar user="{{ user }}" v-if="user.username"></user-avatar>
          <div class="item-content">
            <h2>{{ name }}</h2>
            <p v-html="user.description|urlize"></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="body">
    <div class="split-view container">
      <div class="main-view">
        <div class="topic-list">
          <ul>
            <topic-item v-repeat="topic: topics" track-by="id"></topic-item>
          </ul>
          <logo-loading class="center" v-if="fetching"></logo-loading>
          <div class="load-more" v-if="cursor" v-on="click: fetchTopics(username, cursor)">
            Load More
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var api = require('./api');

  module.exports = {
    replace: true,
    props: ['params'],
    data: function() {
      return {
        fetching: true,
        cursor: 0,
        topics: [],
        params: {},
        user: {}
      }
    },
    watch: {
      'params.username': 'compile'
    },
    computed: {
      name: function() {
        return this.user.name || this.user.username;
      },
      username: function() {
        return this.params.username;
      }
    },
    compiled: function() {
      this.compile();
    },
    methods: {
      compile: function() {
        if (!this.username) return;
        this.fetchUser(this.username);
        this.fetchTopics(this.username);
      },
      fetchUser: function(username) {
        ga('send', 'pageview', {title: username});
        if (this.$root.currentUser.username === username) {
          return this.user = this.$root.currentUser;
        }
        api.user.profile(username, function(resp) {
          this.user = resp;
        }.bind(this));
      },
      fetchTopics: function(username, cursor) {
        this.fetching = true;
        cursor = cursor || this.params.cursor;
        api.user.topics(username, cursor, function(resp) {
          this.cursor = resp.cursor;
          this.topics = this.topics.concat(resp.data);
          this.fetching = false;
        }.bind(this));
      }
    },
    components: {
      'topic-item': require('./components/topic-item.vue'),
      'user-avatar': require('./components/user-avatar.vue'),
    }
  };
</script>
