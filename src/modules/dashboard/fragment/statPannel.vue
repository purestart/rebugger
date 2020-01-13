<template>
  <pannel v-bind="$attrs" v-on="$listeners">
    <div flex = "box:mean" class="p-v-40 p-h-10">
      <div style="" class="b-r">
        <div class="f-16 a-c p-t-10 gray-font">
          今日数据
        </div>
        <div class="a-c m-t-10 f-20 p-b-10">
          {{statInfo.dayTotal || 0}}
        </div>
      </div>
      <div style="" class="b-r">
        <div class="f-16 a-c p-t-10 gray-font">
          日志数据
        </div>
        <div class="a-c m-t-10 f-20 p-b-10 c-info">
          {{statInfo.infoTotal || 0}}
        </div>
      </div>
      <div style="" class="b-r">
        <div class="f-16 a-c p-t-10 gray-font">
          异常数据
        </div>
        <div class="a-c m-t-10 f-20 p-b-10 c-warning">
          {{statInfo.errorTotal || 0}}
        </div>
      </div>
      <div style="" class="">
        <div class="f-16 a-c p-t-10 gray-font">
          日志总量
        </div>
        <div class="a-c m-t-10 f-20 p-b-10 c-gray">
          {{statInfo.total}}
        </div>
      </div>
    </div>
  </pannel>
</template>

<script type='text/ecmascript-6'>
import pannel from './pannel';
export default {
  props:{
    statInfo:{
      type: Object,
      required: true
    }
  },
  components: {
    pannel
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.gray-font{
  color: #a0a0a0;
}

</style>