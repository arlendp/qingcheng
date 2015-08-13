<template>
  <div class="header">
    <div class="header-cover cover" v-style="style">
      <div class="header-intro cover-inner">
        <div class="container">
          <h2>{{ cafe.name }}</h2>
          <p v-html="cafe.description|urlize"></p>
        </div>
      </div>
    </div>
    <div class="header-nav">
      <div class="container">
        <nav v-if="cafe.slug">
          <a href="/c/{{ cafe.slug }}" v-on="click: changeView('topics')">Topics</a>
          <a href="/c/{{ cafe.slug }}" v-on="click: changeView('users')">Members</a>
          <a v-if="cafe.intro" href="/t/{{ cafe.intro }}">Introduction</a>
        </nav>
        <div class="header-actions" v-if="showFollowing">
          <button class="follow-button" v-class="following-button: isFollowing" v-on="click: toggleFollow">
            <span class="follow-fg">
              <i class="qc-icon-star-empty"></i>
              Follow
            </span>
            <span class="unfollow-fg">
              <i class="qc-icon-star-full"></i>
              Following
            </span>
            <span class="unfollow-bg">Unfollow</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <component is="{{subview}}" v-if="cafe.slug"
    cafe="{{cafe}}" params="{{params}}"
    v-transition
    transition-mode="out-in">
  </component>
</template>

<script>
  var api = require('./api');

  module.exports = {
    replace: true,
    props: ['params'],
    data: function() {
      return {
        cafe: {},
        subview: 'topics',
        loading: false,
        isFollowing: false
      }
    },
    watch: {
      'params': 'compile',
    },
    compiled: function() {
      this.compile();
    },
    computed: {
      showFollowing: function() {
        return this.cafe.id && this.$root.currentUser.id;
      },
      style: function() {
        var style = this.cafe.style;
        if (!style || !style.cover) return {};
        return {'background-image': 'url(' + style.cover + ')'};
      }
    },
    methods: {
      compile: function() {
        if (!this.params.slug) return;
        if (this.cafe.slug !== this.params.slug) {
          this.fetchCafe();
        }
      },
      fetchCafe: function() {
        this.cafe = {slug: this.params.slug};
        api.cafe.view(this.params.slug, function(resp) {
          this.cafe = resp;
          document.title = this.$site.name + ' — ' + resp.name;
          if (resp.membership && resp.membership.label !== 'visitor') {
            this.isFollowing = true;
          }
          ga('send', 'pageview', {title: resp.name});
        }.bind(this));
      },
      changeView: function(name) {
        console.log('change', name);
        this.subview = name;
      },
      follow: function() {
        this.loading = true;
        api.cafe.join(this.cafe.slug, function() {
          this.isFollowing = true;
          this.loading = false;
        }.bind(this));
      },
      unfollow: function() {
        this.loading = true;
        api.cafe.leave(this.cafe.slug, function() {
          this.isFollowing = false;
          this.loading = false;
        }.bind(this));
      },
      toggleFollow: function() {
        if (this.loading) return;

        if (this.isFollowing) {
          this.unfollow();
        } else {
          this.follow();
        }
      }
    },
    components: {
      'topics': require('./components/cafe-topic-list.vue'),
      'users': require('./components/cafe-user-list.vue')
    }
  };
</script>

<style>
.follow-button {
  min-width: 10em;
  transition: background-color .2s ease;
}
.unfollow-bg, .unfollow-fg {
  display: none;
}
.following-button .follow-fg {
  display: none;
}
.following-button .unfollow-fg {
  display: inline;
}
.following-button:hover {
  background-color: #FF4444;
}
.following-button:hover .unfollow-bg {
  display: inline;
}
.following-button:hover .unfollow-fg {
  display: none;
}
</style>
