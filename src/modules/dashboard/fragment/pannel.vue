<template>
  <div :style = "[styleObj]" class="pannel-com">
    <div flex="main:justify" class="panel-header b-b">
        <span class="title p-l-10">{{title}}</span>
        <div class="p-r-10">
          <slot name="header-right"></slot>
        </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
export default {
  props: {
    width: {
      type: String,
      required: false
    },
    height: {
      type: String,
      required: false
    },
    maxHeight: {
      type: String,
      required: false
    },
    minHeight: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false,
      default: "标题"
    }
  },
  data() {
    return {
      styleObj: {
        width: "50%",
        height: "200px"
      }
    };
  },
  created() {
    console.log(this.width);

    this.styleObj = {
      width: this.width ? this.width : undefined,
      height: this.height ? this.height : undefined
    };
    console.log(this.styleObj);
  }
};
</script>
<style lang='scss' scoped>
.pannel-com{
  background-color: #ffffff;
  border-radius: 5px;
  .panel-header{
   line-height: 40px;
   .title{
     font-weight: 500;
   }
  }
}
</style>