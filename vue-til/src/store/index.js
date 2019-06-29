import Vue from "vue";
import Vuex from "vuex";

import request from "../api/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    post: {},
    user: {}
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setPost(state, post) {
      state.post = post;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    SIGN_UP(context, username, password, nickname) {
      request.post('/signup', {
        username: username,
        password: password,
        nickname: nickname
      }).then((data) => {

      })
    },
    LOGIN(context, username, password) {
      request.post('/login', {
        username: username,
        password: password
      }).then((data) => {

      })
    },
    POSTS(context) {
      request.get('/posts').then((data) => {

      })
    },
    WRITE_POST(context, title, contents) {
      request.post('/posts').then((data) => {

      })
    },
    GET_POST(context, id) {
      request.get('/post/' + id).then((data) => {
        
      })
    }
});
