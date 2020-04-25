<template>
  <div>
    <div class="index">
      <router-view></router-view>
    </div>
    <tabbar :data="tabbarData"></tabbar>
  </div>
</template>

<script>
import tabbar from "../components/tabbar.vue";
export default {
  components: {
    tabbar
  },
  name: "index",
  data() {
    return {
      tabbarData: [
        { title: "首页", icon: "home", path: "/home" },
        { title: "订单", icon: "file-text-o", path: "/order" },
        { title: "我的", icon: "user", path: "/me" }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped>
.index {
  width: 100%;
  height: calc(100%-45px);
}
</style>
