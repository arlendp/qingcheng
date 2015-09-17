<template>
  <section class="entry-webpage" v-show="webpage.title">
    <a href="{{ webpage.link }}" v-el="sec">
      <div class="webpage-image" v-el="image"></div>
      <div class="webpage-info">
        <h2>{{ webpage.title }}</h2>
        <p class="webpage-domain">{{ webpage.domain }}</p>
        <p>{{ webpage.description }}</p>
      </div>
    </a>
  </section>
</template>

<script>
  module.exports = {
    props: ['webpage'],
    ready: function() {
      var src = this.webpage.image;
      if (!src || src.indexOf('https://') !== 0) return;

      var img = new Image();
      img.src = src;

      var wrap = this.$$.image;
      var sec = this.$$.sec;
      img.onload = function() {
        if (img.width > sec.clientWidth) {
          sec.className = 'image-cover';
          wrap.style.backgroundImage = 'url(' + src + ')';
        } else {
          sec.className = 'image-logo';
          wrap.appendChild(img);
        }
      };
    }
  }
</script>

<style>
  .entry-webpage {
    border-radius: 3px;
    margin: 10px 0 20px;
    border: #eee 1px solid;
  }
  .entry-webpage:hover {
    border-color: #ccc;
  }
  .entry-webpage a {
    display: block;
    color: #565656;
  }
  .entry-webpage h2, .entry-webpage p {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
  }
  .entry-webpage .webpage-domain {
    font-size: 14px;
    color: #999;
    margin: 4px 0;
  }
  .entry-webpage .webpage-info {
    padding: 10px 10px 10px 20px;
  }
  .image-logo {
    position: relative;
    padding-left: 85px;
  }
  .image-logo .webpage-image {
    position: absolute;
    left: 0;
    top: 0;
  }
  .image-logo img {
    max-width: 80px;
    padding-top: 14px;
    padding-left: 8px;
    vertical-align: middle;
  }
  .image-cover .webpage-image {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 200px;
  }
</style>
