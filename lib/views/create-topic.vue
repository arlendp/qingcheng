<template>
  <div class="fullpage">
    <div class="container">
      <topic-form cafe="{{cafe}}" type="create" v-ref:form></topic-form>
    </div>
  </div>
</template>

<script>
  var api = require('../api');

  module.exports = {
    props: ['cafe'],
    ready: function() {
      var vm = this.$refs.form;
      var router = this.$route.router;
      var slug = this.cafe.slug;
      vm.$on('submit', function(payload) {
        api.topic.create(slug, payload, function(resp) {
          router.go({name: 'topic', params: {topicId: resp.id}});
        });
      });
    },
    components: {
      'topic-form': require('../components/topic-form.vue')
    }
  };
</script>
