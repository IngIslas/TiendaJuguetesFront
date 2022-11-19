import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axiosCors from "vue-axios-cors";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(axiosCors);
new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
