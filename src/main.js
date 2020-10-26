import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import css from "tachyons";

Vue.config.productionTip = false;

var converter = require("number-to-words");

Vue.filter("toWords", function(value) {
  if (!value) return "";
  return converter.toWords(value);
});

new Vue({
  router,
  store,
  css,
  vuetify,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
