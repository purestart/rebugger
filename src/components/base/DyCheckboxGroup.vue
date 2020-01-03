<!--Created by 詹陈龙 on 2018/6/7.-->
<template>
  <el-checkbox-group
    v-model="model"
    v-bind="$attrs"
    v-if="Array.isArray(options)"
  >
    <template v-if="type === 'checkbox'">
      <el-checkbox
        v-bind="option"
        :label="option.value"
        name="name"
        :key="option.value"
        v-for="option in options"
        >{{ option.label }}</el-checkbox
      >
    </template>
    <template v-else>
      <el-checkbox-button
        v-bind="option"
        :label="option.value"
        name="name"
        :key="option.value"
        v-for="option in options"
        >{{ option.label }}</el-checkbox-button
      >
    </template>
  </el-checkbox-group>
</template>

<script>
export default {
  props: {
    value: Array,
    options: [Array, String],
    type: String
  },
  data() {
    return {
      model: this.value || []
    };
  },
  watch: {
    value(val) {
      this.model = val || [];
    },
    model(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="scss" scoped></style>
