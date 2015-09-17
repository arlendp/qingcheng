<template>
  <div class="fullpage">
    <div class="container" v-show="!$loadingRouteData">
      <topic-form cafe="{{cafe}}" topic="{{topic}}" type="update" v-ref="form"></topic-form>
    </div>
  </div>
</template>

<script>
  var api = require('../api');

  module.exports = {
    data: function() {
      return {
        topic: {content: ''},
        cafe: {}
      };
    },
    route: {
      waitForData: true,
      data: function(transition) {
        var id = transition.to.params.topicId;
        api.topic.viewRaw(id, function(resp) {
          document.title = this.$site.name + ' — Edit: ' + resp.title;
          transition.next({
            topic: resp,
            cafe: resp.cafe,
          });
        }.bind(this));
      }
    },
    ready: function() {
      var vm = this.$.form;
      var router = this.$route.router;
      vm.$on('submit', function(payload) {
        api.topic.update(this.topic.id, payload, function(resp) {
          router.go({name: 'topic', params: {topicId: resp.id}});
        });
      });
    },
    components: {
      'topic-form': require('../components/topic-form.vue')
    }
  };
</script>
