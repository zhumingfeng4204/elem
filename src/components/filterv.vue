<template>
  <div>
    <div :class="{'open':issort ||isscreen}" @click.self="hidev">
      <div v-if="filterdata" class="filter_wrap">
        <aside class="filter">
          <div
            class="filter-nav"
            v-for="(item,index) in filterdata.navTab"
            :key="index"
            :class="{'filter-bold':currentfilter==index}"
            @click="filtersort(index)"
          >
            <span>{{item.name}}</span>
            <i v-if="item.icon" :class="'fa fa-'+item.icon"></i>
          </div>
        </aside>
      </div>
      <div>
        <section class="filter-extend" v-if="issort">
          <ul>
            <li
              @click="slectsort(item,index)"
              v-for="(item,index) in filterdata.sortBy"
              :key="index"
            >
              <span :class="{'selectname':currentsort==index}">{{item.name}}</span>
              <i class="fa fa-check" v-show="currentsort==index"></i>
            </li>
          </ul>
        </section>
        <section class="filter-extend" v-if="isscreen">
          <div class="filter-sort">
            <div v-for="(screen,index) in filterdata.screenBy" class="morefilter" :key="index">
              <p class="title">{{screen.title}}</p>
              <ul>
                <li
                  v-for="(item,i) in screen.data"
                  :key="i"
                  :class="{'selected':item.select}"
                  @click="selectScreen(item,screen)"
                >
                  <img :src="item.icon" v-if="item.icon" />
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="morefilter-btn">
            <span class="morefilter-clear" :class="{'edit':edit}" @click="clearfilter">清空</span>
            <span class="morefilter-ok" @click="filterok">确定</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "filterv",
  props: {
    filterdata: Object
  },
  data() {
    return {
      currentfilter: 0,
      issort: false,
      currentsort: 0,
      isscreen: false
    };
  },
  computed: {
    edit() {
      let edit = false;
      this.filterdata.screenBy.forEach(screen => {
        screen.data.forEach(item => {
          if (item.select) {
            edit = true;
          }
        });
      });
      return edit;
    }
  },
  methods: {
    filterok() {
      let screendata={
        MPI:"",
        offer:"",
        per:""
      }
      let mpistr = "";
      this.filterdata.screenBy.forEach(screen => {
        screen.data.forEach((item, index) => {
          if (item.select) {
            if (screen.id !== "MPI") {
              screendata[screen.id]=item.code
            } else {
              mpistr += item.code + ",";
              screendata[screen.id]=mpistr
            }
          }
        });
      });
      this.$emit("updata",screendata);
      this.hidev();
    },
    clearfilter() {
      this.filterdata.screenBy.forEach(screen => {
        screen.data.forEach(item => {
          item.select = false;
        });
      });
    },
    filtersort(index) {
      this.currentfilter = index;
      switch (index) {
        case 0:
          this.issort = true;
          this.$emit("searchfixed", true);
          break;
        case 1:
          this.$emit("updata", this.filterdata.navTab[1].condition);
          this.hidev();
          break;
        case 2:
          this.$emit("updata", this.filterdata.navTab[2].condition);
          this.hidev();
          break;
        case 3:
          this.isscreen = true;
          this.issort = false;
          this.$emit("searchfixed", true);

          break;
        default:
          this.hidev();
          break;
      }
    },
    hidev() {
      this.issort = false;
      this.isscreen = false;
      this.$emit("searchfixed", false);
    },

    slectsort(item, index) {
      this.currentsort = index;
      this.filterdata.navTab[0].name = this.filterdata.sortBy[index].name;
      this.hidev();
      this.$emit("updata", item.code);
    },
    selectScreen(item, screen) {
      if (screen.id !== "MPI") {
        screen.data.forEach(element => {
          element.select = false;
        });
      }
      item.select = !item.select;
    }
  }
};
</script>

<style scoped>
.filter_wrap {
  background: #fff;
  position: sticky;
  top: 54px;
  z-index: 10;
}
.filter {
  position: relative;
  border-bottom: 1px solid #ddd;
  line-height: 10.4vw;
  z-index: 101;
  height: 10.666667vw;
  display: flex;
  justify-content: space-around;
}
.filter-nav {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 0.8333rem;
}
.filter-nav i {
  width: 1.6vw;
  height: 0.8vw;
  margin-left: 1.333333vw;
  margin-bottom: 0.533333vw;
  fill: #333;
  will-change: transform;
}

.filter-bold {
  font-weight: 600;
  color: #333;
}

.open {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease-in-out;
  z-index: 3;
}

.filter-extend {
  background-color: #fff;
  color: #333;
  padding-top: 2.133333vw;
  position: absolute;
  width: 100%;
  z-index: 4;
  left: 0;
  top: 24.533333vw;
}
.filter-extend li {
  position: relative;
  padding-left: 5.333333vw;
  line-height: 10.666667vw;
  overflow: hidden;
}
.fa-check {
  float: right;
  color: #009eef;
  margin-right: 3.733333vw;
  line-height: 10.666667vw;
}

.selectName {
  color: #009eef;
}
/* 筛选 */
.filter-sort {
  background: #fff;
  padding: 0 2.666667vw;
  line-height: normal;
}
.morefilter {
  margin: 2.666667vw 0;
  overflow: hidden;
}
.morefilter .title {
  margin-bottom: 2vw;
  color: #666;
  font-size: 0.5rem;
}
.morefilter ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 0.8rem;
}
.morefilter li {
  box-sizing: border-box;
  width: 30%;
  height: 9.333333vw;
  line-height: 9.333333vw;
  margin: 0.8vw 1%;
  background: #fafafa;
}
.morefilter li img {
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align: middle;
  margin-right: 0.8vw;
}
.morefilter li span {
  margin-left: 2%;
  vertical-align: middle;
}

.morefilter-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fafafa;
  box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
  line-height: 11.466667vw;
  box-sizing: border-box;
}
.morefilter-btn span {
  font-size: 0.826667rem;
  text-align: center;
  text-decoration: none;
  flex: 1;
}
.morefilter-clear {
  color: #ddd;
  background: #fff;
}
.morefilter-ok {
  color: #fff;
  background: #00d762;
  border: 0.133333vw solid #00d762;
}

.selected {
  color: #3190e8 !important;
  background-color: #edf5ff !important;
}

.edit {
  color: #333 !important;
}
</style>
