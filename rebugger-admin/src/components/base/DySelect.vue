<!--Created by 詹陈龙 on 2018/6/13.-->
<template>
  <el-select
    v-model="model"
    v-bind="$attrs"
    :multiple="multiSelect"
    v-on="$listeners"
  >
    <el-option
      :label="option.label"
      :value="option.value"
      :key="index"
      :disabled="option.disabled"
      v-for="(option, index) in options"
    />
  </el-select>
</template>

<script>
export default {
  props: {
    value: [Array, String, Number],
    options: [Array, String],
    multiSelect: Boolean
  },
  computed: {
    model: {
      get() {
        if (!this.value && this.value !== 0) {
          // 解决value === 0时无效的问题
          return this.multiSelect ? [] : "";
        } else {
          if (this.multiSelect) {
            return Array.isArray(this.value) ? this.value : [this.value];
          } else {
            return Array.isArray(this.value) ? this.value[0] || "" : this.value;
          }
        }
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    isExists() {
      if (typeof this.options !== "string") {
        return !!this.options.find(o => o.value === this.value);
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-select__tags {
  min-height: 30px;
}
</style>
