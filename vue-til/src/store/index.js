import Vue from "vue";
import Vuex from "vuex";

// import {} from "../api/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    news: {},
    user: {}
  },
  mutations: {
    setNews(state, news) {
      state.news = news;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    FETCH_NEWS(context) {
      fetchNews()
        // .then(response => response.data)
        .then(({ data }) => context.commit("setNews", data))
        .catch();
    },
    FETCH_USER(context, userName) {
      return fetchUser(userName)
        .then(({ data }) => {
          console.log("--------------------");
          console.log(data);
          return data;
        })
        .catch();
    }
  }
});
