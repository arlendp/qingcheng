<template>
  <div class="header">
    <div class="header-cover cover">
      <div class="header-intro cover-inner">
        <div class="item-container container" v-if="user.username">
          <user-avatar user="{{ user }}"></user-avatar>
          <div class="item-content" v-if="!editable">
            <h2>{{ name }}</h2>
            <p v-html="user.description|urlize"></p>
          </div>
          <div class="item-content" v-if="editable">
            <h2 contenteditable v-on="keydown: saveProfile| key 'enter'" v-el="name">{{ name }}</h2>
            <p v-html="user.description" contenteditable v-on="keydown: saveProfile| key 'enter'" v-el="description"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="header-nav">
      <div class="container">
        <nav>
          <a href="/u/{{ username }}" v-on="click: changeView('topics')">Topics</a>
        </nav>
        <div class="header-actions" v-if="isOwn">
          <button class="circle" v-on="click: editable=true" v-if="!editable">Edit Profile</button>
          <button v-on="click: saveProfile" v-if="editable">Save Profile</button>
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
          <logo class="loading center" v-if="fetching"></logo>
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
        editable: false,
        subview: 'topics',
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
      },
      isOwn: function() {
        return this.$root.user.username == this.username;
      }
    },
    compiled: function() {
      this.compile();
    },
    methods: {
      compile: function() {
        if (!this.username) return;
        this.topics = [];
        this.cursor = 0;
        this.fetchUser(this.username);
        this.fetchTopics(this.username);
      },
      fetchUser: function(username) {
        document.title = this.$site.name + ' — ' + username;
        if (this.$root.user.username === username) {
          return this.user = this.$root.user;
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
      },
      saveProfile: function(e) {
        e && e.preventDefault();
        var data = {
          name: this.$$.name.textContent,
          description: this.$$.description.textContent,
        };
        api.user.save(data, function(resp) {
          this.user = resp;
          this.editable = false;
        }.bind(this));
      },
      changeView: function(name) {
        this.subview = name;
      }
    },
    components: {
      'logo': require('./components/logo.vue'),
      'topic-item': require('./components/topic-item.vue'),
      'user-avatar': require('./components/user-avatar.vue'),
    }
  };
</script>
