<template>
  <section class="entry-webpage" v-show="webpage.title">
    <a href="{{ webpage.link }}">
      <h2>{{ webpage.title }}</h2>
      <p>{{ webpage.description }}</p>
    </a>
  </section>
</template>

<script>
  module.exports = {
    props: ['webpage']
  }
</script>

<style>
  .entry-webpage {
    border-radius: 3px;
    padding: 10px 10px 10px 20px;
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
  }
</style>
