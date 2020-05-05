<template>
  <div class="search">
    <headder :isleft="true" title="搜索"></headder>
    <div class="search_header">
      <form class="search_wrap">
        <i class="fa fa-search"></i>
        <input type="text" v-model="key_word" placeholder="输入商家，商品信息" />
        <button @click.prevent="searchhandle">搜索</button>
      </form>
    </div>
    <div class="shop" v-if="result&& !showshop">
      <div class="empty_wrap" v-if="empty">
        <img src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" />
        <div class="empty_txt">
          <h4>附近没有搜索结果</h4>
          <span>换个关键词试试吧</span>
        </div>
      </div>
      <div v-else>
        <seindex @click="$router.push('/shop')" :data="result.restaurants"></seindex>
        <seindex @click="shopclick" :data="result.words"></seindex>
      </div>
    </div>
    <div class="container" v-if="showshop">
      <filterv :filterdata="filterdata"></filterv>
      <div class="shoplist" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading">
        <indexshop v-for="(item,index) in restaurants" :key="index" :restaurant="item.restaurant"></indexshop>
      </div>
    </div>
  </div>
</template>

<script>
import { InfiniteScroll } from "mint-ui";
import headder from "../components/headder";
import seindex from "../components/searchhind";
import filterv from "../components/filterv";
import indexshop from "../components/indexshop";
export default {
  components: { headder, seindex, filterv, indexshop },
  name: "",
  data() {
    return {
      key_word: "",
      result: null,
      empty: false,
      showshop: false,
      filterdata: null,
      restaurants: [],
      page: 0,
      size: 7,
      loading: false,
      data: null
    };
  },
  watch: {
    key_word() {
      this.empty = false;
      this.showshop = false;
      this.keywordchang();
    }
  },
  created() {
    this.$axios("api/profile/filter").then(res => {
      this.filterdata = res.data;
    });
  },
  methods: {
    keywordchang() {
      this.$axios(`/api/profile/typeahead/${this.key_word}`)
        .then(res => {
          this.result = res.data;
        })
        .catch(err => (this.result = null));
    },
    searchhandle() {
      if (!this.key_word) return;
      if (
        this.result &&
        (this.result.restaurants.length > 0 || this.result.words.length)
      ) {
        this.shopitemclick();
      } else {
        this.empty = true;
      }
    },
    shopitemclick() {
      this.page = 0;
      this.restaurants = [];
      this.showshop = true;
    },
    shopclick() {
      this.showshop = true;
    },
    loadMore() {
      this.page++;
      this.$axios
        .post(`api/profile/restaurants/${this.page}/${this.size}`)
        .then(res => {
          //   this.restaurants = res.data;
          if (res.data.length > 0) {
            res.data.forEach(element => {
              this.restaurants.push(element);
            });
          } else {
            this.loading = true;
          }
        });
    }
  }
};
</script>

<style scoped>
.search {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.search_header {
  margin-top: 45px;
  background: #fff;
  padding: 0 4.266667vw;
}
.search_header .search_wrap {
  padding: 2.933333vw 2.933333vw 2.933333vw 0;
  display: flex;
  align-items: center;
  position: relative;
}
.search_wrap .fa-search {
  width: 2.933333vw;
  height: 2.933333vw;
  color: #888;
  position: absolute;
  top: 4.6666666vw;
  left: 2.933333vw;
}
.search_wrap input {
  flex-grow: 1;
  border-radius: 0.266667vw;
  background-color: #f8f8f8;
  padding: 1.733333vw 4vw 1.733333vw 8.8vw;
  color: #666;
  outline: none;
  border: none;
}
.search_wrap button {
  outline: none;
  border: none;
  color: #333;
  font-size: 0.426667rem;
  background: #fff;
  font-weight: 700;
  margin-left: 2.933333vw;
  font-size: 14px;
}

.shop {
  width: 100%;
  height: calc(100% - 95px);
  overflow: auto;
}

.empty_wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  display: flex;
  justify-content: center;
}
.empty_wrap img {
  width: 35vw;
  height: 35vw;
}
.empty_txt h4 {
  color: #666;
  font-size: 1rem;
  margin: 12vw 0 2vw 0;
}
.empty_txt span {
  color: #999;
  font-size: 0.8rem;
}
</style>
