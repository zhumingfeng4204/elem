<template>
  <div class="login">
    <div class="logo">
      <img src="../img/logo.jpg" alt />
    </div>
    <inputg
      type="number"
      v-model="phone"
      placeholder="手机号"
      :btntitle="btntitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnclick="getverifycode"
    ></inputg>
    <inputg
      type="number"
      v-model="verifycode"
      placeholder="验证码"
      :disabled="disabled"
      :error="errors.code"
    ></inputg>
    <div class="login_des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <div class="login_btn">
      <button :disabled="isclick" @click="hendlogin">登录</button>
    </div>
  </div>
</template>

<script>
import inputg from "../components/inputg";
export default {
  name: "login",
  components: {
    inputg
  },
  data() {
    return {
      phone: "",
      verifycode: "",
      errors: {},
      btntitle: "获取验证码",
      disabled: false
    };
  },
  computed: {
    isclick() {
      if (!this.phone || !this.verifycode) return true;
      else return false;
    }
  },
  methods: {
    hendlogin() {
      this.errors = {};
      this.$axios
        .post("/api/posts/sms_back", {
          phone: this.phone,
          code: this.verifycode
        })
        .then(res => {
          console.log(res);
          // 检验成功 设置登录状态并且跳转到/
          localStorage.setItem("ele_login", true);
          this.$router.push("/");
        })
        .catch(err => {
          // 返回错误信息
          this.errors = {
            code: err.response.data.msg
          };
        });
    },
    getverifycode() {
      this.validatebtn();
      if (this.validatephone()) {
        this.$axios
          .post("/api/posts/sms_send", {
            sid: "2b20d7d9e8b1000f2c965871249efba4",
            token: "aab840404d2d7b3b978658fdcddd0965",
            appid: "bdfe142028534083b1a736dd115e6897",
            templateid: "540042",
            phone: this.phone
          })
          .then(res => {
            console.log(res);
          });
      }
    },
    validatebtn() {
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.btntitle = "获取验证码";
          this.disabled = false;
        } else {
          this.btntitle = time + "重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
    },
    validatephone() {
      if (!this.phone) {
        this.errors = {
          phone: "手机号码不能为空"
        };
        return false;
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: "填写正确手机号码"
        };
        return false;
      } else {
        this.errors = {};
        return true;
      }
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}

.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>