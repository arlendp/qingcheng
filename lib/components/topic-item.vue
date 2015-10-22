<template>
  <li id="t-{{ topic.id }}" class="topic-item clearfix" v-show="topic.id" transition="fade">
    <span class="user-avatar">
      <user-avatar user="{{topic.user}}" class="small circle tip"></user-avatar>
    </span>
    <div class="topic-meta">
      <span class="topic-cafe" v-repeat="topic.cafes">
        <span class="cafe-logo" v-style="style|logo"></span>
        <a v-link="{name: 'cafe', params: {slug: slug}}" aria-label="Published in {{ name }}" v-text="name"></a>
      </span>
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
    props: ['topic'],
    filters: {
      logo: function(style) {
        var rv = {'background-color': style.color || '#222221'};
        if (style.logo) {
          rv['background-image'] = 'url(' + style.logo + ')';
        }
        return rv;
      }
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
  .topic-meta .topic-cafe {
    margin-right: 14px;
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
