<template>
  <div class="addAddress">
    <headder :letf="true" :title="title"></headder>
    <div class="viewbody">
      <div class="content">
        <fromfengzhuang
          v-model="addressinfo.name"
          label="联系人"
          placeholder="姓名"
          :tag="sex"
          :selectTag="addressinfo.sex"
          @checksex="checksex"
        ></fromfengzhuang>
        <fromfengzhuang v-model="addressinfo.phone" label="电话" placeholder="手机号码"></fromfengzhuang>
        <fromfengzhuang
          v-model="addressinfo.address"
          label="地址"
          @click.native="showsearch=true"
          placeholder="小区/写字楼/学校等"
          icon="angle-right"
        ></fromfengzhuang>
        <fromfengzhuang
          v-model="addressinfo.bottom"
          label="门牌号"
          placeholder="10号楼5单元"
          textarea="textarea"
          icon="edit"
        ></fromfengzhuang>
        <div class="formblock">
          <div class="label-wrap">标签</div>
          <tabtag :tag="tag" :selectTag="addressinfo.tag" @checkTag="checkTag"></tabtag>
        </div>
      </div>
      <div class="form-button-wrap">
        <button class="form-button" @click="saveinfo">确定</button>
      </div>
    </div>

    <addresssarch
      :addressinfo="addressinfo"
      :showsearch="showsearch"
      @close="showsearch=!showsearch"
    ></addresssarch>
  </div>
</template>

<script>
import headder from "../../components/headder";
import tabtag from "../../components/order/tab";
import fromfengzhuang from "../../components/order/fromfengzhuang";
import addresssarch from "../../components/order/addresssarch";
import { Toast } from "mint-ui";
export default {
  components: {
    headder,
    fromfengzhuang,
    tabtag,
    addresssarch
  },
  name: "",
  data() {
    return {
      title: "",
      sex: ["先生", "女士"],
      tag: ["家", "学校", "公司"],
      addressinfo: {},
      showsearch: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.addressinfo = to.params.addressinfo;
      vm.title = to.params.title;
    });
  },
  methods: {
    checkTag(item) {
      this.addressinfo.tag = item;
    },
    checksex(item) {
      this.addressinfo.sex = item;
    },
    saveinfo() {
      if (!this.addressinfo.name) {
        this.showMsg("请输入联系人");
        return;
      }

      if (!this.addressinfo.phone) {
        this.showMsg("请输入手机号");
        return;
      }

      if (!this.addressinfo.address) {
        this.showMsg("请输入收货地址");
        return;
      }

      // 存储数据
      if (this.title == "添加地址") {
        this.addAddress();
      } else {
        this.editAddress();
      }
    },
    showMsg(msg) {
      Toast({
        message: msg,
        position: "bottom",
        duration: 2000
      });
    },
    addAddress() {
      this.$axios
        .post(
          `/api/user/add_address/${localStorage.ele_login}`,
          this.addressinfo
        )
        .then(res => {
          if (!this.$store.getters.userInfo) {
            this.$store.dispatch("setUserInfo", this.addressinfo);
          }
          this.$router.push("myadress");
        })
        .catch(err => console.log(err));
    },
    editAddress(){
      this.$axios
        .post(
          `/api/user/edit_address/${localStorage.ele_login}/${
            this.addressinfo._id
          }`,
          this.addressinfo
        )
        .then(res => {
          this.$router.push("/myadress");
        });
    }
  }
};
</script>

<style scoped>
.addAddress {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}
.viewbody {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

.content {
  padding-left: 4vw;
  background: #fff;
  font-size: 0.94rem;
}

.formblock {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
}
.formblock .label-wrap {
  flex-basis: 17.333333vw;
  padding: 3.733333vw 0;
  line-height: 4.8vw;
  color: #333;
  font-weight: 700;
}

/* 确定按钮 */
.form-button-wrap {
  padding: 5.333333vw 4vw;
  display: flex;
}
.form-button-wrap .form-button {
  background: #00d762;
  text-align: center;
  border-radius: 0.533333vw;
  flex: 1;
  font-size: 1.1rem;
  line-height: 5.066667vw;
  color: #fff;
  padding: 3.333333vw 0;
  border: none;
  font-weight: 500;
}
</style>
