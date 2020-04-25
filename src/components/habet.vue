<template>
  <div class="area" ref="area_scroll" v-if="cityinfo">
    <div class="scroll_wrap">
      <div class="hot_wrap citylist">
        <div class="title">热门城市</div>
        <ul class="hot_city">
          <li @click="$emit('selectcity',item)" v-for="(item,index) in cityinfo.hotCities" :key="index">{{item.name}}</li>
        </ul>
      </div>
      <div class="city_warp">
        <div class="city_content citylist" v-for="(item,index) in keys" :key="index">
          <div class="title">{{item}}</div>
          <ul>
            <li @click="$emit('selectcity',city)" v-for="(city,index) in cityinfo[item]" :key="index">{{city.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="area_keys">
      <ul>
        <li @click="selectkey(0)">#</li>
        <li @click="selectkey(index+1)" v-for="(itme,index) in keys" :key="index">{{itme}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import bscroll from "better-scroll";
export default {
  name: "habet",
  props: {
    cityinfo: Object,
    keys: Array
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {},
  methods: {
    initscroll() {
      this.scroll = new bscroll(this.$refs.area_scroll, {
        click: true
      });
    },

    selectkey(index) {
      const citylist = this.$refs.area_scroll.getElementsByClassName(
        "citylist"
      );
      let el = citylist[index];
      this.scroll.scrollToElement(el, 250);
    }
  }
};
</script>

<style scoped>
.area {
  margin-top: 10px;
  box-sizing: border-box;
  padding: 0 16px;
  background: #fff;
  height: calc(100% - 65px);
  overflow: hidden;
}
.scroll_wrap {
  background: #fff;
  overflow: auto;
}
.title {
  color: #aaa;
  padding: 15px 0;
}
.hot_city {
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.hot_city li {
  width: 30%;
  background: #f1f1f1;
  margin: 0 10px 10px 0;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
}
.city_content li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.area_keys {
  position: fixed;
  right: 0;
  top: 25%;
  color: #aaa;
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
  padding: 0 5px;
}
</style>
