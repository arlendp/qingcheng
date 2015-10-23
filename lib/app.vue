<template>
  <div class="top-nav">
    <div class="container">
      <div class="site-nav clearfix">
        <a class="site-logo" v-link="{name: 'home'}">
          <logo></logo>
        </a>
        <nav>
          <a v-link="link.url" v-for="link in $site.links" v-text="link.name"></a>
        </nav>
      </div>

      <div class="site-account">
        <div class="nav" v-if="!user.username">
          <button class="button" v-on:click="showLogin=true">Log in</button>
        </div>
        <ul class="nav clearfix" v-if="user.username">
          <li>
            <a v-if="notificationCount" class="tip notification" href="javascript:;"
            v-on:click="showNotifications=true"
            aria-label="You have {{ notificationCount }} unread notifications"></a>
            <overlay v-if="showNotifications" show="{{@ showNotifications }}">
              <user-notifications></user-notifications>
            </overlay>
          </li>
          <li>
            <user-avatar user="{{user}}" v-on:click="viewUserDropdown"></user-avatar>
            <dropdown v-show="showUserDropdown" show="{{@ showUserDropdown }}">
              <a class="dropdown-item" href="/u/{{ user.username }}">View Profile</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="/account/settings">Settings</a>
              <a class="dropdown-item" v-on:click="logout" href="/session">Logout</a>
            </dropdown>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <router-view></router-view>

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
    <div class="message message-{{msg.type}}" v-for="msg in messages" v-text="msg.text" transition="fade"></div>
  </div>
  <overlay v-if="showLogin" transition="fade" v-bind:show.sync="showLogin">
    <login-form></login-form>
  </overlay>
</template>

<script>
  var api = require('./api');
  var clock;
  var clock, year = new Date().getFullYear();
  module.exports = {
    data: function() {
      return {
        user: {},
        notificationCount: 0,
        showLogin: false,
        showNotifications: false,
        showUserDropdown: false,
        year: year,
        messages: [],
      }
    },
    methods: {
      logout: function(e) {
        e && e.preventDefault();
        api.user.logout();
      },
      viewUserDropdown: function(e) {
        e && e.preventDefault();
        this.showUserDropdown = true;
      },
      check: function() {
        if (!this.user.username) return;
        api.notification.count(function(resp) {
          this.notificationCount = resp.count;
        }.bind(this));
      },
      flush: function() {
        this.messages = [];
      },
      clear: function(index) {
        clearTimeout(clock);
        this.messages.splice(index, 1);
        clock = setTimeout(this.flush.bind(this), 4000);
      },
      show: function(type, text) {
        var msg = {type: type, text: text};
        if (!unique(msg, this.messages)) return;

        this.messages.push(msg);
        var index = this.messages.length - 1;
        setTimeout(function() {
          this.clear(index);
        }.bind(this), 3000);
      }
    },
    ready: function() {
      setTimeout(this.check.bind(this), 2000);
      // check every 5 minutes
      setInterval(this.check.bind(this), 300000);
    },
    components: {
      'overlay': require('./components/overlay.vue'),
      'dropdown': require('./components/dropdown.vue'),
      'logo': require('./components/logo.vue'),
      'user-avatar': require('./components/user-avatar.vue'),
      'login-form': require('./components/login-form.vue'),
      'user-notifications': require('./components/user-notifications.vue'),
    }
  }

  function unique(item, list) {
    return !list.some(function(data) {
      return JSON.stringify(data) === JSON.stringify(item);
    });
  }
</script>
