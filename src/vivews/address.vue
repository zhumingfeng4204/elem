<template>
  <div class="address">
    <moderheader :isleft="true" title="选择收获地址"></moderheader>
    <div class="city_search">
      <div class="search">
        <span class="city" @click="$router.push('/city')">
          {{city}}
          <i class="fa fa-angle-down"></i>
        </span>
        <i class="fa fa-search"></i>
        <input type="text" v-model="search_val" placeholder="详细地址" />
      </div>
      <loc @click="selectadd" :address="address"></loc>
    </div>
    <div class="area">
      <ul class="area_list" v-for="(item,index) in citylist" :key="index">
        <li @click="selectadd(item)">
          <h4>{{item.name}}</h4>
          <p>{{item.district}}{{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moderheader from "../components/headder.vue";
import loc from "../components/location.vue";
export default {
  components: {
    moderheader,
    loc
  },
  watch: {
    search_val() {
      this.searchid();
    }
  },
  name: "addres",
  data() {
    return {
      city: "",
      search_val: "",
      citylist: []
    };
  },
  computed: {
    address() {
      return this.$store.getters.location.formattedAddress;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.city = to.params.city;
    });
  },
  methods: {
    searchid() {
      const self = this;
      AMap.plugin("AMap.Autocomplete", function() {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: self.city
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.search_val, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          self.citylist = result.tips;
        });
      });
    },
    selectadd(item) {
      if (item) {
        this.$store.dispatch(
        "setaddress",
        item.district + item.address + item.name
      );
      } else {
        this.$store.dispatch("setaddress",this.address)
      }
      
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

.city_search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}
.search .city {
  padding: 0 10px;
}
.city i {
  margin-right: 10px;
}
.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}

.area {
  margin-top: 16px;
  background: #fff;
}
.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}
.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
</style>
