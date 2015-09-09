<template>
  <form class="topic-form" v-on="submit: formSubmit" v-el="form">
    <div class="form-description">
      Topic in <a href="/c/{{ cafe.slug }}">{{ cafe.name }}</a>
    </div>
    <div class="form-field form-title">
      <input placeholder="Your topic title" v-model="topic.title" v-el="title">
    </div>
    <div class="form-field form-link">
      <input placeholder="Source link?" type="url" v-model="topic.link">
    </div>
    <markdown-area class="form-field form-content yue" content="{{@ topic.content }}" placeholder="What is in your mind"></markdown-area>
    <div class="form-submit" v-if="isLogin">
      <button class="green" v-if="!isUpdate">Create</button>
      <button class="green" v-if="isUpdate">Update</button>
    </div>
  </form>
</template>

<script>
  var api = require('../api');
  var shake = require('../utils').shake;
  module.exports = {
    replace: true,
    props: ['cafe', 'type', 'topic'],
    data: function() {
      return {
        html: '',
        topic: {
          title: '',
          link: '',
          content: ''
        }
      };
    },
    computed: {
      isLogin: function() {
        return this.$root.user.id;
      },
      isUpdate: function() {
        return this.type === 'update';
      },
      cacheKey: function() {
        return this.cafe.slug + ':topic:';
      },
      hasContent: function() {
        return this.topic.title || this.topic.content;
      }
    },
    methods: {
      emptyTopic: function() {
        return {'title': '', 'content': ''};
      },
      dismiss: function() {
        this.$parent.showTopicForm = false;
      },
      esc: function(e) {
        if (e.keyCode === 27) {
          this.dismiss();
        }
      },
      create: function(slug, payload) {
        api.topic.create(slug, payload, function(resp) {
          this.topic = this.emptyTopic();
          resp.read_count = 0;
          resp.comment_count = 0;
          this.$parent.topics = [resp].concat(this.$parent.topics);
          this.dismiss();
        }.bind(this));
      },
      update: function(payload) {
        api.topic.update(this.topic.id, payload, function(resp) {
          var topic = this.$parent.topic
          Object.keys(resp).forEach(function(key) {
            topic[key] = resp[key];
          });
          this.dismiss();
        }.bind(this));
      },
      preview: function(e) {
        e.preventDefault();
        if (this.html) {
          return this.html = '';
        }
        api.preview(this.topic.content, function(html) {
          this.html = html;
        }.bind(this));
      },
      formSubmit: function(e) {
        e.preventDefault();
        var payload = this.topic;

        payload.title = payload.title.trim();
        payload.content = payload.content.trim();

        if (!payload.title || !payload.content) {
          return shake(this.$$.form);
        }

        if (this.isUpdate) {
          this.update(payload);
        } else {
          this.create(this.cafe.slug, payload);
        }
      }
    },
    compiled: function() {
      if (this.isUpdate) return;
      var cache = localStorage[this.cacheKey];
      if (cache) {
        this.topic = JSON.parse(cache);
      }
    },
    detached: function() {
      if (!this.isUpdate) {
        localStorage[this.cacheKey] = JSON.stringify(this.topic);
      }
      this.$$.form.removeEventListener('keyup', this.esc);
    },
    attached: function() {
      this.$$.form.addEventListener('keyup', this.esc);
    },
    ready: function() {
      var el = this.$$.title;
      setTimeout(function() {
        el.focus();
      }, 20);
    },
    components: {
      'markdown-area': require('./markdown-area.vue')
    }
  }
</script>

<style>
.topic-form {
  padding: 40px 110px 20px;
}
.topic-form .form-title input {
  border: none;
  font-size: 36px;
  font-weight: 600;
  color: #343433;
}
.topic-form .form-link input {
  font-size: 12px;
  border: none;
  padding-right: 140px;
}
.topic-form .form-content {
  padding-top: 0.2em;
}
.topic-form .form-content .markdown-actions {
  top: -36px;
}
.topic-form .form-content textarea {
  border: none;
  height: 24em;
}
.topic-form .form-field input, .topic-form .form-field textarea {
  font-family: "Helvetica Neue", "Xin Gothic", "Hiragino Sans GB", "Droid Sans Fallback", "Microsoft YaHei", "SimSun", sans-serif;
}
</style>
