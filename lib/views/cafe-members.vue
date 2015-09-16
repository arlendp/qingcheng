<template>
  <div class="body members">
    <div class="section container" v-if="admins.length">
      <h2 class="section-title">Moderators</h2>
      <ul>
        <li v-repeat="user: admins">
          <user-avatar user="{{user}}"></user-avatar>
          <div class="member-info">
            <a href="/u/{{ user.username }}">{{ user.username }}</a>
            <p v-html="user.description|urlize"></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="section container" v-if="members.length">
      <h2 class="section-title">Members</h2>
      <ul>
        <li v-repeat="members">
          <user-avatar user="{{user}}"></user-avatar>
          <div class="member-info">
            <a href="/u/{{ user.username }}">{{ user.username }}</a>
            <div>{{ label }} at <time datetime="{{ created_at }}">{{ created_at|timeago }}</time></div>
          </div>
        </li>
      </ul>
    </div>
    <logo class="loading center" v-if="!admins.length"></logo>
  </div>
</template>

<script>
  var api = require('../api');
  module.exports = {
    props: ['cafe'],
    data: function() {
      return {
        pagination: {},
        admins: [],
        members: []
      }
    },
    route: {
      data: function(transition) {
        var params = transition.to.params;
        api.cafe.users(params.slug, params.page, function(resp) {
          transition.next({
              pagination: resp.pagination,
              admins: resp.admins,
              members: resp.data,
          });
        });
      }
    },
    components: {
      'user-avatar': require('../components/user-avatar.vue'),
      'logo': require("../components/logo.vue")
    }
  }
</script>

<style>
  .members .section {
    padding-top: 10px;
    padding-bottom: 40px;
    color: #565656;
  }
  .members .avatar {
    float: left;
    margin-right: 14px;
  }
  .members .member-info {
    position: relative;
    overflow: hidden;
  }
</style>
