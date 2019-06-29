import Vue from "vue";
import VueRouter from "vue-router";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Posts from "../views/Posts.vue";
import PostDetail from "../views/PostDetail.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/signup",
      component: SignUp
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/posts",
      component: Posts
    },

    {
      path: "/posts/:id",
      component: PostDetail
    }
  ]
});
