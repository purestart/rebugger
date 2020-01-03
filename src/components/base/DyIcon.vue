<!--Created by 詹陈龙 on 2018/4/25.-->
<template>
  <svg
    :class="svgClass"
    :style="styleObj"
    aria-hidden="true"
    @click="$emit('click')"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String
    },
    rotate: {
      type: Number,
      default: 0
    },
    size: {
      type: [String, Number],
      default: 24
    }
  },
  computed: {
    svgClass() {
      return ("svg-icon " + (this.className || "")).trim();
    },
    iconName() {
      return `#icon-${this.name}`;
    },
    styleObj() {
      return {
        transform: `rotate(${this.rotate}deg)`,
        fontSize: `${this.size}px`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
