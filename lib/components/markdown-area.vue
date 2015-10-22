<template>
  <div class="markdown-area" v-class="active: content.length">
    <textarea placeholder="{{ placeholder }}" aria-label="{{ placeholder }}" v-show="!html" v-model='content' v-el="el" v-on="keydown: keyboardSubmit"></textarea>
    <div class="markdown-preview" v-show="html" v-html="html" v-on:click="focus"></div>
    <div class="markdown-actions" v-show="!html">
      <a href="#" v-on:click="image" v-show="!uploading">Image</a>
      <a href="#" v-on:click="preview">Preview</a>
    </div>
    <div class="markdown-actions" v-show="html">
      <a href="#" v-on:click="focus">Edit</a>
    </div>
    <input type="file" style="opacity: 0; left: -99999px; position: absolute" v-el="file" accept="image/*" v-on="change: upload">
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
        uploading: false,
        content: ''
      };
    },
    methods: {
      keyboardSubmit: function(e) {
        if (e.keyCode !== 13) return;
        var mac = /mac/i.test(navigator.userAgent);
        if ((mac && !e.metaKey) || (!mac && !e.ctrlKey)) return;
        this.$emit('submit');
      },
      focus: function(e) {
        e && e.preventDefault();
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
        var files = this.$$.file.files;
        if (!files.length) return;

        var stamp = Date.now().toString(36);
        var mark = '[uploading image ' + stamp + ' ...]';
        this.uploading = true;
        this.content += '\n' + mark + '\n';
        api.upload(files[0], null, function(resp) {
          this.content = this.content.replace(mark, '![image](' + resp.value + ')');
          this.focus();
          this.uploading = false;
        }.bind(this));
      }
    }
  }
</script>

<style>
  .markdown-area {
    position: relative;
    padding-top: 1em;
  }
  .markdown-area .markdown-actions {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 1;
  }
  .markdown-area .markdown-actions a {
    color: #666;
    font-size: 12px;
    text-transform: uppercase;
    margin-right: 12px;
  }
</style>
