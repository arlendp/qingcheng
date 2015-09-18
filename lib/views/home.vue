<template>
<div class="home-view">
  <div class="header">
    <div class="header__cover cover">
      <div class="cover__text">
        <div class="container">
          <h2>{{ $site.name }}</h2>
          <p v-html="$site.description|urlize"></p>
        </div>
      </div>
    </div>
    <div class="header__bottom">
      <div class="container">
        <nav class="header__nav nav">
          <a class="nav__item" v-link="'/'">Following</a>
          <a class="nav__item" v-link="'/?show=all'">Topics</a>
          <a class="nav__item" v-link="'/c/'">Cafes</a>
        </nav>
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
          <div class="load-more" v-if="cursor" v-on="click: fetchTopics(cursor)">
            Load More
          </div>
        </div>
      </div>
      <div class="sidebar-view">
        <div class="widget">
          <a v-link="'/c/?show=create'" class="green button" v-if="$root.user.id">New Topic</a>
        </div>
        <div class="site-sidebar" v-html="sidebar" v-if="sidebar"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  var api = require('../api');
  var zerqu = window.ZERQU || {};

  module.exports = {
    data: function() {
      return {
        fetching: true,
        cursor: 0,
        sidebar: zerqu.sidebar,
        topics: []
      }
    },
    methods: {
      compile: function() {
        this.cursor = 0;
        this.topics = [];
        this.fetchTopics();
      },
      fetchTopics: function(cursor) {
        this.fetching = true;
        var params = this.$route.query || {};
        if (cursor) params.cursor = cursor;
        api.timeline(params, function(resp) {
          this.cursor = resp.cursor;
          this.topics = this.topics.concat(resp.data);
          this.fetching = false;
        }.bind(this));
      }
    },
    compiled: function() {
      document.title = this.$site.name;
    },
    route: {
      data: function(transition) {
        var params = transition.to.query || {};
        api.timeline(params, function(resp) {
          transition.next({
            cursor: resp.cursor,
            topics: resp.data,
            fetching: false,
          });
        });
      }
    },
    components: {
      'topic-item': require('../components/topic-item.vue'),
      'logo': require('../components/logo.vue'),
    }
  };
</script>
