<!--Created by 詹陈龙 on 2018/5/31.-->
<template>
  <div>
    <el-popover
      :popperClass="'dialog-popover'"
      ref="popover"
      placement="bottom"
      trigger="click"
      v-model="show"
    >
      <el-tree
        ref="tree"
        :data="options"
        :show-checkbox="multiSelect"
        v-on="$listeners"
        :highlight-current="true"
        :default-expanded-keys="selectedKeys"
        :node-key="valueField"
        check-on-click-node
        :check-strictly="false"
        :props="props"
        v-if="forceUpdate"
        v-bind="$attrs"
        @check-change="checkChange"
      ></el-tree>
    </el-popover>
    <dy-input-tags
      v-popover:popover
      :label="labelField"
      :placeholder="placeholder"
      v-model="getSelectTag"
      @del="delTag"
      icon="tree"
    />
  </div>
</template>

<script>
import DyInputTags from "./DyInputTags.vue";

export default {
  components: { DyInputTags },
  props: {
    value: [String, Number, Array],
    options: { type: Array, default: () => [] },
    childrenField: { type: String, default: "children" },
    valueField: { type: String, default: "id" },
    labelField: { type: String, default: "name" },
    multiSelect: Boolean,
    placeholder: String
  },
  data() {
    return {
      forceUpdate: true,
      show: false,
      selectedKeys: []
    };
  },
  computed: {
    props() {
      return { children: this.childrenField, label: this.labelField };
    },
    multi() {
      return this.multiSelect;
    },
    flatData() {
      return this.$utils.flatObject(this.options);
    },
    getSelectTag() {
      return this.flatData.filter(item =>
        this.selectedKeys.includes(item[this.valueField])
      );
    }
  },

  watch: {
    props() {
      this.forceUpdate = false;
      this.$nextTick(() => (this.forceUpdate = true));
    },
    multi(val) {
      this.forceUpdate = false;
      this.$nextTick(() => (this.forceUpdate = true));
      setTimeout(() => {
        if (val && this.value && !Array.isArray(this.value)) {
          this.$emit("input", [this.value]);
        }
        if (!val && this.value && Array.isArray(this.value)) {
          this.$emit("input", this.value[0]);
        }
      }, 0);
    },
    selectedKeys(val) {
      if (this.multi) {
        this.$emit("input", val);
      } else {
        this.$emit("input", val[0]);
      }
    },
    // 监听value是为了实现重置表单的时候，能更新树
    value() {
      this.init();
    }
  },
  /* vue-lifecycle */
  mounted() {
    this.init();
  },
  updated() {
    this.$emit("halfChecked", this.$refs.tree.getHalfCheckedKeys());
  },
  /* vue-method */
  methods: {
    init() {
      if (this.value) {
        if (this.multi) {
          this.$refs.tree.setCheckedKeys(this.value);
          this.selectedKeys = this.value;
        } else {
          this.$refs.tree.setCurrentKey(this.value);
          this.selectedKeys = [this.value];
        }
      } else {
        this.selectedKeys = [];
      }
    },
    // 树选中节点变化的时候
    checkChange(node) {
      if (this.multi) {
        this.selectedKeys = this.$refs.tree.getCheckedKeys();
      } else {
        this.show = false;
        this.selectedKeys = [this.$refs.tree.getCurrentKey()];
      }
      this.$emit("change", node);
    },
    // 点击标签删除按钮的时候
    delTag(node) {
      if (this.multi) {
        const index = this.selectedKeys.findIndex(
          item => item === node[this.valueField]
        );
        if (index > -1) {
          this.selectedKeys.splice(index, 1);
        } else {
          this.selectedKeys.push(node[this.valueField]);
        }
        this.$refs.tree.setCheckedKeys(this.selectedKeys);
      } else {
        this.$refs.tree.setCurrentKey(null);
        this.selectedKeys = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
