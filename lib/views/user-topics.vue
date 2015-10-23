<template>
  <div class="body">
    <div class="split-view container">
      <div class="main-view">
        <div class="topic-list">
          <ul>
            <template v-for="topic in topics" track-by="id">
              <topic-item :topic="topic"></topic-item>
            </template>
          </ul>
          <logo class="loading center" v-if="$loadingRouteData || loading"></logo>
          <div class="load-more" v-if="cursor" v-on:click="fetchTopics(cursor)">
            Load More
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var api = require('../api');
  module.exports = {
    props: ['user'],
    data: function() {
      return {
        loading: false,
        cursor: 0,
        topics: []
      }
    },
    methods: {
      fetchTopics: function(cursor) {
        this.loading = true;
        api.user.topics(this.$route.params.username, cursor, function(resp) {
          this.cursor = resp.cursor;
          this.topics = this.topics.concat(resp.data);
          this.loading = false;
        }.bind(this));
      },
    },
    route: {
      data: function(transition) {
        var params = transition.to.params;
        api.user.topics(params.username, 0, function(resp) {
          transition.next({
            cursor: resp.cursor,
            topics: resp.data,
          });
        });
      }
    },
    components: {
      'topic-item': require('../components/topic-item.vue'),
      'logo': require('../components/logo.vue'),
    }
  }
</script>
