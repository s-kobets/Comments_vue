/* global _ */

const Vue = require('vue');
const marked = require('marked');
require('lodash');

// require('simplemde/')

// import FakeServer from '../spec/mock.js'
import '../css/index.styl'

// для тестов нужно комментировать
// import template from '../index.html'

new Vue({
  el: '#editor',
  data: {
    input: '# hello'
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true })
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
    }, 300)
  }
});