<!--Created by 詹陈龙 on 2018-12-25.-->
<template>
  <el-input-number
    v-model="mValue"
    v-bind="$attrs"
    v-on="$listeners"
  ></el-input-number>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    value: {}
  },
  data() {
    return {
      mValue: this.value
    };
  },
  watch: {
    mValue(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.mValue = val;
    }
  },
  computed: {
    ...mapState([])
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
