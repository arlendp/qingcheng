<template>
  <div class="top-nav">
    <div class="container">
      <div class="site-nav clearfix">
        <a class="site-logo" href="/">
          <div class="logo" v-if="!$site.logo">
            <div><span class="left-yellow"></span><span class="right-green"></span></div>
            <div><span class="full-green"></span></div>
            <div><span class="left-green"></span><span class="right-red"></span></div>
          </div>
        </a>
        <nav>
          <a href="{{url}}" v-repeat="$site.links" v-text="name"></a>
        </nav>
      </div>

      <div class="site-account">
        <div class="site-account-inner" v-if="!currentUser.username">
          <button v-on="click: showLogin=true">Log in</button>
        </div>
        <div class="site-account-inner" v-if="currentUser.username">
          <a v-if="notificationCount" class="tip notification" href="javascript:;"
          v-on="click: showNotifications=true"
          aria-label="You have {{ notificationCount }} unread notifications">
          {{ notificationCount }}
          </a>
          <button class="circle" v-on="click: logout">Logout</button>
          <user-avatar user="{{currentUser}}" class="tip"></user-avatar>
        </div>
      </div>
    </div>
  </div>

  <component is="{{view}}"
    params="{{params}}"
    v-transition
    transition-mode="out-in">
  </component>

  <div class="footer">
    <div class="container">
      <div style="float: left">Copyright &copy; {{year}} {{$site.name}}</div>
      <div style="float: right">
        <a href="https://github.com/lepture/zerqu">ZERQU</a> •
        <a href="https://github.com/zerqu/qingcheng">青城</a>
      </div>
    </div>
  </div>

  <div id="message" aria-live="assertive">
    <div class="message message-{{type}}" v-repeat="messages" v-text="text" v-transition="fade"></div>
  </div>
  <overlay v-if="showLogin" v-transition="fade" show="{{@ showLogin }}">
    <login-form></login-form>
  </overlay>
  <overlay v-if="showNotifications" v-transition="fade" show="{{@ showNotifications }}">
    <user-notifications></user-notifications>
  </overlay>
</template>

<script>
  var api = require('./api');
  module.exports = {
    el: '#app',
    data: {
      view: '',
      currentUser: {},
      notificationCount: 0,
      showLogin: false,
      showNotifications: false,
      year: new Date().getFullYear(),
      messages: [],
      params: {}
    },
    methods: {
      logout: function() {
        api.user.logout();
      },
      check: function() {
        if (!this.currentUser.id) return;
        api.notification.count(function(resp) {
          this.notificationCount = resp.count;
        }.bind(this));
      }
    },
    ready: function() {
      setTimeout(this.check.bind(this), 2000);
      // check every 5 minutes
      setInterval(this.check.bind(this), 300000);
    },
    components: {
      'home': require('./home.vue'),
      'cafe': require('./cafe.vue'),
      'topic': require('./topic.vue'),
      'user': require('./user.vue'),
      'cafe-list': require('./cafe-list.vue'),
      'user-list': require('./user-list.vue'),
      'overlay': require('./components/overlay.vue'),
      'user-avatar': require('./components/user-avatar.vue'),
      'login-form': require('./components/login-form.vue'),
      'user-notifications': require('./components/user-notifications.vue'),
    }
  }
</script>
