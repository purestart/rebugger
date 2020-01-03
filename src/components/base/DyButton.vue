/* eslint-disable quotes */
<!--Created by 詹陈龙 on 2018/5/18.-->
<template>
  <el-button
    v-bind="$attrs"
    :size="size"
    :type="type"
    @click.native="$emit('click')"
  >
    <span flex="cross:center">
      <!--<cc-icon v-if="icon" v-bind="$attrs" :name="icon" :size="iconSize" class="m-r-6"/>-->
      <span v-if="text">{{ text }}</span>
    </span>
  </el-button>
</template>

<script>
export default {
  props: {
    text: String,
    type: { type: String, default: "primary" },
    size: { type: String, default: "small" },
    icon: String
  },

  computed: {
    iconSize() {
      if (this.size === "medium") {
        return 10;
      } else if (this.size === "small") {
        return 12;
      } else if (this.size === "mini") {
        return 14;
      } else {
        return 16;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
