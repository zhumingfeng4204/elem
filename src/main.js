import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import { Indicator } from 'mint-ui';
// import AMap from "AMap";
// Vue.prototype.AMap = AMap;
Vue.use(MintUI)
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
// 拦截
axios.interceptors.request.use(
  config => {
    Indicator.open();
    return config;
  },
  error => {
    return Promise.reject(error);
  });
axios.interceptors.response.use(
  cresponse => {
    Indicator.close();
    return cresponse;
  },
  error => {
    Indicator.close();
    return Promise.reject(error);
  });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
