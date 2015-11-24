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
          <button class="button" @click="showLogin=true">Log in</button>
        </div>
        <ul class="nav clearfix" v-if="user.username">
          <li>
            <a v-if="notificationCount" class="tip notification" href="javascript:;"
            @click="showNotifications=true"
            aria-label="You have {{ notificationCount }} unread notifications"></a>
            <overlay v-if="showNotifications" :show.sync="showNotifications">
              <user-notifications></user-notifications>
            </overlay>
          </li>
          <li>
            <user-avatar :user="user" @click="viewUserDropdown"></user-avatar>
            <dropdown v-show="showUserDropdown" :show.sync="showUserDropdown">
              <a class="dropdown__item" href="/u/{{ user.username }}">View Profile</a>
              <div class="dropdown__divider"></div>
              <a class="dropdown__item" href="/account/settings">Settings</a>
              <a class="dropdown__item" @click="logout" href="/session">Logout</a>
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
  <overlay v-if="showLogin" transition="fade" :show.sync="showLogin">
    <login-form></login-form>
  </overlay>
</template>

<script>
  var clock, year = new Date().getFullYear();

  import api from '../lib/api';
  import Overlay from './components/Overlay.vue';
  import UserAvatar from '../lib/components/user-avatar.vue';
  import Dropdown from './components/Dropdown.vue';
  import Logo from './components/Logo.vue';
  import LoginForm from '../lib/components/login-form.vue';
  import UserNotifications from '../lib/components/user-notifications.vue';

  export default {
    replace: false,
    data() {
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
      logout(e) {
        e && e.preventDefault();
        api.user.logout();
      },
      viewUserDropdown(e) {
        e && e.preventDefault();
        this.showUserDropdown = true;
      },
      check() {
        if (!this.user.username) return;
        api.notification.count(function(resp) {
          this.notificationCount = resp.count;
        }.bind(this));
      },
      flush() {
        this.messages = [];
      },
      clear(index) {
        clearTimeout(clock);
        this.messages.splice(index, 1);
        clock = setTimeout(this.flush.bind(this), 4000);
      },
      show(type, text) {
        var msg = {type: type, text: text};
        if (!unique(msg, this.messages)) return;

        this.messages.push(msg);
        var index = this.messages.length - 1;
        setTimeout(function() {
          this.clear(index);
        }.bind(this), 3000);
      }
    },
    ready() {
      setTimeout(this.check.bind(this), 2000);
      // check every 5 minutes
      setInterval(this.check.bind(this), 300000);
    },
    components: {
      Overlay,
      UserAvatar,
      Dropdown,
      Logo,
      LoginForm,
      UserNotifications,
    }
  }

  function unique(item, list) {
    return !list.some(function(data) {
      return JSON.stringify(data) === JSON.stringify(item);
    });
  }
</script>
