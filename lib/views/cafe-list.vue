<template>
  <div class="body cafe-list">
    <logo class="loading center" v-if="$loadingRouteData"></logo>

    <div class="section container" v-if="following.length">
      <h2 class="section-title">Following</h2>
      <div class="cafe-cards clearfix">
        <cafe-card v-repeat="cafe: following" subpath="{{ subpath }}" track-by="id"></cafe-card>
      </div>
    </div>

    <div class="section container">
      <h2 class="section-title">Cafes</h2>
      <div class="cafe-cards clearfix">
        <cafe-card v-repeat="cafe: cafes" subpath="{{ subpath }}" track-by="id"></cafe-card>
      </div>
    </div>
  </div>
</template>

<script>
var api = require('../api');

module.exports ={
  data: function() {
    return {
      cursor: 0,
      following: [],
      cafes: []
    }
  },
  computed: {
    subpath: function() {
      if (this.$route.query.show === 'create') {
        return '/create';
      }
      return '';
    }
  },
  route: {
    data: function(transition) {
      api.cafe.list(function(resp) {
        transition.next({
          following: resp.following || [],
          cafes: resp.data,
          cursor: resp.cursor,
        })
      });
    }
  },
  components: {
    'cafe-card': require('../components/cafe-card.vue'),
    'logo': require('../components/logo.vue')
  }
};
</script>

<style>
.cafe-list {
  padding: 40px 0;
}
</style>
