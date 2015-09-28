<template>
  <div class="body">
    <div class="split-view container">
      <div class="main-view">
        <div v-if="canWrite" class="new-topic">
          <user-avatar user="{{ user }}" class="small circle"></user-avatar>
          <a v-link="{name: 'create-topic', params: {slug: cafe.slug}}" role="button">Create a new topic here</a>
        </div>
        <div class="topic-list">
          <ul v-if="!$loadingRouteData">
            <topic-item v-repeat="topic: topics" track-by="id"></topic-item>
          </ul>
          <logo class="loading center" v-if="$loadingRouteData"></logo>
        </div>
      </div>

      <div class="sidebar-view" v-if="cafe.id">
        <div class="sidebar-notice" v-if="!canWrite">
          You have no permission in writing here.
        </div>
        <div class="widget" v-if="isAdmin">
          <h3 class="widget-title">Admin</h3>
          <div class="widget-content">
            <p>You are the admin here.</p>
            <a class="button button--circle">View Settings</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var api = require('../api');
  module.exports = {
    props: ['cafe'],
    data: function() {
      return {
        pagination: null,
        topics: []
      }
    },
    computed: {
      user: function() {
        return this.$root.user;
      },
      canWrite: function() {
        var permission = this.cafe.permission || {};
        return permission.write;
      },
      isAdmin: function() {
        var permission = this.cafe.permission || {};
        return permission.admin;
      }
    },
    route: {
      data: function(transition) {
        var params = transition.to.params;
        api.cafe.topics(params.slug, params.page, function(resp) {
          transition.next({
            pagination: resp.pagination,
            topics: resp.data,
          });
        });
      }
    },
    components: {
      'topic-item': require('../components/topic-item.vue'),
      'topic-form': require('../components/topic-form.vue'),
      'user-avatar': require('../components/user-avatar.vue'),
      'logo': require('../components/logo.vue'),
      'pagination': require('../components/pagination.vue'),
    }
  }
</script>

<style>
  .new-topic {
    height: 6em;
    padding: 5px 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  .new-topic .avatar {
    margin-right: 12px;
  }
  .new-topic a {
    color: #999;
  }
  .pagination {
    padding: 5px 10px;
  }
  .pagination-prev {
    float: left;
  }
  .pagination-next {
    float: right;
  }
  .pagination a, .pagination span {
    display: inline-block;
    padding: 5px 14px;
  }
  .pagination a {
    cursor: pointer;
  }
  .pagination span {
    cursor: not-allowed;
    color: #999;
  }
</style>
