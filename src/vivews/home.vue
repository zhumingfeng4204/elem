<template>
  <div class="home">
    <div class="header">
      <div class="address_map" @click="$router.push({name:'address',params:{city:city}})">
        <i class="fa fa-map-marker"></i>
        <span>{{address}}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
      <div class="search_wrap" :class="{'fixedview':showfilter}" @click="$router.push('/search')">
        <div class="shop_search">
          <i class="fa fa-search"></i>
          搜索商家 商家名称
        </div>
      </div>
    </div>
    <div id="container">
      <mt-swipe :auto="4000" class="swiper">
        <mt-swipe-item v-for="(img,index) in sweipeimg" :key="index">
          <img :src="img" />
        </mt-swipe-item>
      </mt-swipe>
      <mt-swipe :auto="0" class="entries">
        <mt-swipe-item v-for="(entri,i) in entries" :key="i" class="entri_warp">
          <div class="foodentry" v-for="(item,index) in entri" :key="index">
            <div class="img_wrap">
              <img :src="item.image" />
            </div>
            <span>{{item.name}}</span>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="shoplist-title">推荐商家</div>
    <filterv :filterdata="filterdata" @searchfixed="showfilterv" @updata="updata"></filterv>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "mint-ui";
import filterv from "../components/filterv";
export default {
  name: "home",
  components: {
    filterv
  },
  computed: {
    address() {
      return this.$store.getters.address;
    },
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    }
  },
  data() {
    return {
      sweipeimg: [],
      entries: [],
      filterdata: null,
      showfilter: false
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios("api/profile/shopping").then(res => {
        // console.log(res);
        this.sweipeimg = res.data.swipeImgs;
        this.entries = res.data.entries;
      });
      this.$axios("api/profile/filter").then(res => {
        this.filterdata = res.data;
      });
    },
    showfilterv(isshow) {
      this.showfilter = isshow;
    },
    updata(condation) {
      console.log(condation);
    }
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header,
.search_wrap {
  background-color: #009eef;
  padding: 10px 16px;
}
.header .address_map {
  color: #fff;
  font-weight: bold;
}
.address_map i {
  margin: 0 3px;
  font-size: 18px;
}
.address_map span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search_wrap .shop_search {
  /* margin-top: 10px; */
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}

.search_wrap {
  position: sticky;
  top: 0px;
  z-index: 999;
  box-sizing: border-box;
}
.swiper {
  height: 100px;
}
.swiper img {
  width: 100%;
  height: 100px;
}

.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img_wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}
/* 推荐商家 */
.shoplist-title {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.shoplist-title:after,
.shoplist-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.shoplist-title:before {
  margin-right: 3.466667vw;
}
.shoplist-title:after {
  margin-left: 3.466667vw;
}

.fixedview {
  width: 100vw;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
}

.mint-loadmore {
  height: calc(100% - 95px);
  overflow: auto;
}
</style>
