<template>
  <div class="markdown-area" v-class="active: content.length">
    <textarea placeholder="{{ placeholder }}" aria-label="{{ placeholder }}" v-show="!html" v-model='content' v-on="keydown: keybordSubmit" v-el="el"></textarea>
    <div class="preview-area" v-show="html" v-html="html" v-on="click: focus"></div>
    <div class="markdown-actions" v-show="!html">
      <a href="#" v-on="click: image">Image</a>
      <a href="#" v-on="click: preview">Preview</a>
    </div>
    <input type="file" style="opacity: 0; left: -99999px; position: absolute" v-el="file" accept="image/*">
  </div>
</template>

<script>
  var api = require('../api');
  module.exports = {
    replace: true,
    props: ['placeholder', 'content'],
    data: function() {
      return {
        html: '',
        content: ''
      };
    },
    methods: {
      keybordSubmit: function(e) {
        if (e.keyCode !== 13) return;
        var mac = /mac/i.test(navigator.userAgent);
        if ((mac && !e.metaKey) || (!mac && !e.ctrlKey)) return;
        this.postComment();
      },
      focus: function() {
        this.html = '';
        var el = this.$$.el;
        setTimeout(function() {
          el.focus();
        }, 10);
      },
      preview: function(e) {
        e.preventDefault();
        if (this.html) {
          return this.html = '';
        }
        api.preview(this.content, function(html) {
          this.html = html;
        }.bind(this));
      },
      image: function(e) {
        e.preventDefault();
        this.$$.file.click();
      },
      upload: function() {
        console.log('change');
        var files = this.$$.file.files;
        if (!files.length) return;
        api.upload(files[0], function(resp) {
          this.content += '\n![image](' + resp.value + ')\n';
        }.bind(this));
      }
    },
    attached: function() {
      this.$$.file.addEventListener('change', this.upload);
    },
    dettached: function() {
      this.$$.file.removeEventListener('change', this.upload);
    }
  }
</script>

<style>
  .markdown-area {
    position: relative;
  }
  .markdown-area .markdown-actions {
    position: absolute;
    top: 0;
    right: 0;
  }
  .markdown-area .markdown-actions a {
    color: #666;
    font-size: 12px;
    text-transform: uppercase;
    margin-right: 12px;
  }
</style>
