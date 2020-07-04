import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import users from '@/store/modules/users';
import myLinks from '@/store/modules/redirects';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    users.setUser(user);
    if(users.user)
      myLinks.getMyLinks();
  }
}).$mount("#app");
