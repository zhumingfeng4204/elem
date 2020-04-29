<template>
  <div class="Rating-gray">
    <i class="fa " v-for="(item,index) in itemclasses" :key="index"  :class="item"></i>
  </div>
</template>

<script>
const LENGTH = 5;
// 星星对应的class
const CLS_ON = "fa-star";
const CLS_HALF = "fa-star-half-empty";
const CLS_OFF = "fa-star-o";
export default {
  name: "xingxing",
  props: {
    rating: Number
  },
  computed: {
    itemclasses() {
      let result = [];
      let score = Math.floor(this.rating * 2) / 2;
      let hasdecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      
      if (hasdecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  },
  data() {
    return {};
  },
  methods: {
    a(){
      console.log(this.itemclasses)
    }
  }
};
</script>

<style scoped>
.Rating-gray {
  margin-right: 1.066667vw;
  color: #ffbe00;
  display: inline-block;
}
</style>
