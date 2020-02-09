<!--Created by 詹陈龙 on 2018/5/30.-->
<template>
  <el-form
    v-loading="loading"
    ref="form"
    :model="data.model"
    :label-width="data.labelWidth || '100px'"
    v-bind="data.props"
    :class="{ 'full-width': fullWidth }"
    :inline="isSearch"
    v-if="show"
  >
    <template v-for="(item, index) in items">
      <dy-form-item
        :class="{ 'cc-form-item-full': item.full }"
        @blur="$emit('blur', item.prop)"
        @focus="$emit('focus', item.prop)"
        @keyup.native="$emit('keyup', item.prop)"
        @change="value => $emit('change', item.prop, value)"
        @halfChecked="value => $emit('halfChecked', item.prop, value)"
        @selected-obj="value => $emit('selected-obj', item.prop, value)"
        v-if="!item.if || item.if(data.model)"
        :model="data.model"
        :no-verify="isSearch"
        :item="item"
        @value-change="onValueChange"
        :key="item.prop || index"
      ></dy-form-item>
    </template>
    <div class="action" v-if="btns && btns.length">
      <dy-button
        v-bind="btn"
        v-for="(btn, index) in btns"
        :key="index"
        @click="btnClick(btn)"
      />
    </div>
  </el-form>
</template>

<script>
import DyFormItem from "./DyFormItem.vue";
import { mapActions } from "vuex";
import DyButton from "./DyButton";

// 按钮的动作map，在用户简单传入action的时候，设置默认的text等属性
const btnActionMap = {
  save: {
    action: "save",
    text: "保存",
    icon: "save"
  },
  reset: {
    action: "reset",
    text: "重置",
    icon: "reset"
  },
  search: {
    action: "search",
    text: "搜索",
    icon: "search"
  }
};

export default {
  components: { DyFormItem, DyButton },
  props: {
    data: { required: true, type: Object },
    isSearch: Boolean,
    url: String,
    saveUrl: String,
    fullWidth: Boolean
  },
  data() {
    return {
      loading: false,
      show: true,
      items: [],
      defaultModel: JSON.parse(JSON.stringify(this.data.model)) // 保存一份原始数据的拷贝，用于重置表单
    };
  },
  computed: {
    // 处理按钮数组
    btns() {
      if (this.data.btns) {
        return this.data.btns.map(btn => {
          btn.text = btn.text || btnActionMap[btn.action].text;
          return btn;
        });
      } else if (this.data.btn) {
        return null;
      } else {
        return [
          btnActionMap[this.isSearch ? "search" : "save"],
          btnActionMap.reset
        ];
      }
    }
  },
  watch: {
    url: {
      handler: function(val) {
        if (val) {
          this.initModel();
        }
      },
      immediate: true
    },
    data: {
      handler: function(val) {
        if (val.items) {
          this.items = val.items;
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(["requestUrl"]),
    // 按钮点击事件
    async btnClick(btn) {
      console.log(this);
      if (btn.action === "reset") {
        this.$refs.form.resetFields();
        this.data.model = JSON.parse(JSON.stringify(this.defaultModel));
      } else if (btn.action === "back") {
        // this.$router.back()
        btn.cb();
      } else {
        // 点击的不是重置按钮，先校验表单
        this.$refs.form.validate(async valid => {
          if (valid) {
            // 校验通过后，如果按钮有回调，直接执行回调
            if (btn.cb) {
              btn.cb();
            } else {
              // 没有回调的情况
              // 搜索按钮直接发送事件
              if (btn.action === "search") {
                this.$emit(btn.action);
              } else {
                // 非搜索按钮，执行action
                let pass = true;
                // 先执行before-*方法，如果返回true，继续执行否则不执行
                if (this.$attrs["before-" + btn.action]) {
                  pass = this.$attrs["before-" + btn.action]();
                }
                if (pass) {
                  this.loading = true;
                  const url = this.saveUrl || this.data.name;
                  const re = await this.requestUrl({
                    url,
                    params: this.data.model,
                    method: "put"
                  });
                  this.loading = false;
                  this.$emit(btn.action, re);
                }
              }
            }
          }
        });
      }
    },
    // 初始化model。用于更新表单从服务端获取完整数据
    async initModel() {
      this.loading = true;
      const { data } = await this.requestUrl({ url: this.url });
      this.loading = false;
      if (data) {
        this.data.model = data;
      }
    },
    // 在dialog的值变化的时候，触发一次校验
    onValueChange(prop) {
      this.$refs.form.validateField(prop, () => null);
    },
    submit(cb) {
      this.$refs.form.validate(async valid => {
        if (valid && cb) {
          cb();
        }
      });
    },
    validate(func) {
      this.$refs.form.validate(func);
    },
    clearValidate() {
      this.$nextTick(() => this.$refs.form.clearValidate());
    },
    forceUpdate() {
      this.show = false;
      this.$nextTick(() => (this.show = true));
    }
  }
};
</script>

<style lang="scss" scoped>
.cc-form-item-full {
  flex: 0 0 100%;
}
/deep/ {
  .el-select,
  .el-date-editor,
  .el-cascader {
    width: 100%;
    display: block;
  }
}
</style>
