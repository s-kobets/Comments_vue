/* global _ */

const Vue = require('vue');
const marked = require('marked');
require('lodash');

// require('simplemde/')

// import FakeServer from '../spec/mock.js'
import '../css/index.styl'

// для тестов нужно комментировать
// import template from '../index.html'
const moment = require('moment');
moment.locale('ru');

let app = new Vue({
  el: '.editor',
  data: {
    input: '',
    see: false,
    comments: [
    	{ name: 'user 1', href: '1', url: '', time: '12.12.2012 12:00', text: marked('# one comment') },
    	{ name: 'user 2', href: '2', url: '', time: '13.13.2013 13:00', text: marked('# two comment') }, 
    ],
    editTask: null
  },
  filters: {
    editComment: function () {
      return this.comments.filter(function (item) {
        return item.text;
      })
    }
  },
  computed: {
  	now: function () {
	  return Date.now();
	},
    compiledMarkdown: function (text) {
    	if (text) {
    		return marked(text, { sanitize: true })
    	} else {
      		return marked(this.input, { sanitize: true })
    	}
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value;
    }, 300),
    addComment: function (e) {
    	e.preventDefault();
    	this.comments.push({
    		name: 'user 3',
    		href: '3',
    		url: '',
    		time: moment(this.now).format('LLL'),
    		text: marked(this.input)

    	});
    	this.input = '';
  
    },
    toggle: function () {
      if (this.see === true) {
        this.see = false;
      } else {
        this.see = true;
      }
    },
    edit: function () {
      this.toggle();

    }
  },
  watch: {

  },
  // сеттер:
  set: function (newText) {
  	console.log(newText);
  }
});
