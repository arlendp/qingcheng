<template>
  <li id="t-{{ topic.id }}" class="topic-item clearfix" v-show="topic.id" v-transition="fade">
    <span class="user-avatar">
      <user-avatar user="{{user}}" class="small circle tip"></user-avatar>
    </span>
    <div class="topic-meta" v-if="cafe">
      <span class="cafe-logo" v-style="cafeStyle"></span>
      <a v-link="{name: 'cafe', params: {slug: cafe.slug}}" aria-label="Published in {{ cafe.name }}" v-text="cafe.name"></a>
    </div>
    <a class="topic-title" v-link="{name: 'topic', params: {topicId: topic.id}}">{{topic.title}}</a>
    <div class="topic-info">
      <time datetime="{{ topic.created_at }}">{{ topic.created_at | timeago }}</time>
      <span v-if="topic.view_count">{{ topic.view_count }} views</span>
      <span v-if="topic.like_count">{{ topic.like_count }} likes</span>
      <span v-if="topic.comment_count">{{ topic.comment_count }} replies</span>
    </div>
  </li>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['topic'],
    computed: {
      cafe: function() {
        return this.topic.cafe;
      },
      user: function() {
        return this.topic.user;
      },
      cafeStyle: function() {
        var style = this.cafe.style;
        var rv = {'background-color': style.color || '#222221'};
        if (style.logo) {
          rv['background-image'] = 'url(' + style.logo + ')';
        }
        return rv;
      },
    },
    components: {
      'user-avatar': require('./user-avatar.vue')
    }
  }
</script>

<style>
  .topic-item {
    list-style-type: none;
    padding: 10px;
    position: relative;
    border: 1px solid #f0f0f0;
    border-radius: 3px;
    margin-bottom: 8px;
  }
  .topic-item:hover {
    border-color: #dadada;
  }
  .topic-item .user-avatar {
    position: absolute;
    right: 10px;
    top: 6px;
  }
  .topic-meta {
    padding-bottom: 10px;
    line-height: 1;
    font-size: 14px;
  }
  .topic-meta .cafe-logo {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-right: 0.2em;
    vertical-align: text-top;
  }
  .topic-item .topic-title {
    display: inline-block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-decoration: none;
    color: #565655;
    line-height: 1.4;
    font-size: 20px;
    padding-right: 40px;
    box-sizing: border-box;
  }
  .topic-item .topic-title:hover {
    color: #010100;
  }
  .topic-item .topic-info {
    color: #999;
    font-size: 13px;
  }
  .topic-item .topic-info span {
    margin-left: 8px;
  }
</style>
