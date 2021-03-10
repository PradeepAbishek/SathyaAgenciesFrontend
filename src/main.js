import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import css from "tachyons";
import axios from "axios";
import VueCookies from "vue-cookies";
import "@mdi/font/css/materialdesignicons.css";
import style from "@/style.css";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(VueCookies);

var converter = require("number-to-words");

Vue.filter("toWords", function(value) {
  if (!value) return "";
  return converter.toWords(value);
});

axios.defaults.baseURL = "http://127.0.0.1:8000/";
// axios.defaults.baseURL =
//   process.env.NODE_ENV === "development"
//     ? "http://127.0.0.1:8000/"
//     : "http://192.168.43.48:8000/";
if (Vue.$cookies.get("sathyaAgencies")) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + Vue.$cookies.get("sathyaAgencies").access_token,
  };
}

new Vue({
  router,
  store,
  style,
  css,
  vuetify,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
