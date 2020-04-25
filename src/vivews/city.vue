<template>
  <div class="city">
    <div class="search_wrap">
      <div class="search">
        <i class="fa fa-search"></i>
        <input v-model="city_val" type="text" placeholder="输入城市名" />
      </div>
      <span id="but" @click="$router.push({name:'address',params:{city:city}})">取消</span>
    </div>
    <div style="height:100vh" v-if="searchlist.length==0">
      <div class="location">
        <location @click="selectcity({name:city})" :address="city"></location>
      </div>
      <habet @selectcity="selectcity" :cityinfo="cityinfo" :keys="keys" ref="scrolled"></habet>
    </div>
    <div class="search_list" v-else>
      <ul>
        <li @click="selectcity(itme)" v-for="(itme,index) in searchlist" :key="index">{{itme.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import location from "../components/location";
import habet from "../components/habet";
export default {
  name: "",
  components: {
    location,
    habet
  },
  created() {
    this.getcity();
  },
  computed: {
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    }
  },
  data() {
    return {
      city_val: "",
      cityinfo: null,
      keys: [],
      allCitys: [],
      searchlist: []
    };
  },
  watch: {
    city_val() {
      this.searchcity();
    }
  },
  methods: {
    getcity() {
      this.$axios("/api/posts/cities")
        .then(res => {
          this.cityinfo = res.data;
          this.keys = Object.keys(res.data);
          this.keys.pop();
          this.keys.sort();
          this.$nextTick(() => {
            this.$refs.scrolled.initscroll();
          });
          this.keys.forEach(key => {
            this.cityinfo[key].forEach(city => {
              this.allCitys.push(city);
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectcity(city) {
      this.$router.push({ name: "address", params: { city: city.name } });
    },
    searchcity() {
      if (!this.city_val) {
        this.searchlist = [];
      } else {
        this.searchlist = this.allCitys.filter(item => {
          return item.name.indexOf(this.city_val) != -1;
        });
      }
    }
  }
};
</script>

<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 7px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap span {
  outline: none;
  color: #009eef;
  line-height: 40px;
}

.location {
  background: #fff;
  padding: 8px 16px;
  height: 65px;
  box-sizing: border-box;
}

.search_list {
  background: #fff;
  padding: 5px 16px;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
