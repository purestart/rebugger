<!--Created by 詹陈龙 on 2018/6/11.-->
<template>
  <div :style="getStyle" :class="modelVisible ? 'show' : ''" class="edit-model">
    <div class="edit-box">
      <div class="model-header">
        <span>{{ title }}</span>
        <span class="tool-bar">
          <span @click="reflesh" v-if="isReflesh" class="m-r-10 f-12"
            >刷新</span
          >
          <i @click="magnifyModel" class="el-icon-rank m-r-10"></i>
          <i @click="closeModel" class="el-icon-close"></i>
        </span>
      </div>
      <div
        :style="
          'height:' +
            (getHeight - 40) +
            'px;overflow-y: scroll;padding-bottom:15px;'
        "
      >
        <slot></slot>
      </div>
      <div class="btn">
        <el-button
          type="primary"
          size="mini"
          @click="submitForm"
          v-if="!hideSubmitBtn"
          >{{ cimmitButtonText }}</el-button
        >
        <el-button type="primary" size="mini" @click="closeModel"
          >取消</el-button
        >
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'EditModel',
  props: {
    modelVisible: { // 是否可见
      type: Boolean,
      required: false,
      default: false
    },
    cimmitButtonText: { // 确定按钮自定义文字
      type: String,
      required: false,
      default: '确认'
    },
    title: { // 弹出框标题
      type: String,
      required: false,
      default: ""
    },
    width: { // 自定义宽度
      type: Number,
      required: false,
      default: 800
    },
    height: { // 自定义高度
      type: Number,
      required: false,
      default: 600
    },
    zIndex: { // 自定义z-index
      type: Number,
      required: false,
      default: 200
    },
    isReflesh: { // 是否显示刷新按钮，通常iframe内嵌页面时候使用，或者用于刷新表单
      type: Boolean,
      required: false,
      default: false
    },
    hideSubmitBtn: Boolean
  },
  data () {
    return {
      maxVisible: false
    }
  },
  created () { },
  computed: {
    getStyle () {
      if (this.maxVisible === false) {
        return (
          'width:' +
          this.width +
          'px;height:' +
          this.height +
          'px;z-index:' +
          this.zIndex +
          ';'
        )
      } else {
        return 'width:100%' + ';height:100%' + ';z-index:' + this.zIndex + ';';
      }
    },
    getHeight () {
      // console.log(this.maxVisible);
      // console.log(document.body.clientHeight);
      if (this.maxVisible === false) {
        return this.height;
      } else {
        return document.body.clientHeight;
      }
    }
  },
  mounted () { },
  methods: {
    closeModel () {
      this.$emit('close', false);
    },
    submitForm () {
      this.$emit('submit', false);
    },
    reflesh () {
      this.$emit('reflesh', false);
    },
    magnifyModel () {
      this.maxVisible = !this.maxVisible;
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-model {
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
  line-height: 1;
  background-color: #ffffff;

  // transition: transform 0.5s;
  transform: scale(0, 0);

  &.show {
    // transform: scale(1, 1);
    animation: change 0.4s ease both 1;
  }
  //   .edit-box{
  //       background-color: #ffffff;
  //       width: 500px;
  //       height: 500px;
  //   }
  .model-header {
    padding: 10px 12px;
    font-size: 14px;
    border-bottom: 1px solid #e4e4e4;
    display: -ms-flexbox;
    display: -moz-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-pack: space-between;
    -webkit--moz-box-pack: space-between;
    -moz-box-pack: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    background-color: #f8f8f8;
    line-height: 1;
    .tool-bar {
      span {
        cursor: pointer;
      }
      i {
        cursor: pointer;
      }
    }
  }
  .btn {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: right;
    padding: 5px 15px;
    background-color: #f8f8f8;
    z-index: 999;
    border-top: 1px solid #e4e4e4;
    box-sizing: border-box;
  }
}
@keyframes change {
  0% {
    transform: scale(0,0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1,1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1,1);
    opacity: 1;
  }
}
</style>
