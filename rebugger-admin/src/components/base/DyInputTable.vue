<!--Created by 詹陈龙 on 2018/5/31.-->
<template>
  <div>
    <el-popover ref="popover" placement="bottom" trigger="click" v-model="show">
      <dy-table
        :rows="options.rows"
        :columns="options.columns"
        v-if="forceUpdate"
        :row-key="valueField"
        v-bind="$attrs"
        :multiSelect="multiSelect"
        :selected-rows.sync="selectedRows"
        :height="height"
        :current-row.sync="currentRow"
      >
      </dy-table>
    </el-popover>
    <dy-input-tags
      v-popover:popover
      :placeholder="placeholder"
      v-model="getSelectTag"
      :label="labelField"
      @del="delTag"
      icon="table"
    />
  </div>
</template>

<script>
import DyInputTags from "./DyInputTags.vue";

export default {
  components: { DyInputTags },
  props: {
    value: { type: [String, Number, Array] },
    options: {},
    valueField: { type: String, default: "id" },
    labelField: { type: String, default: "name" },
    multiSelect: Boolean,
    placeholder: {}
  },
  data() {
    return {
      show: false,
      selectedRows: [],
      currentRow: null,
      forceUpdate: true
    };
  },
  computed: {
    multi() {
      return this.multiSelect;
    },
    getSelectTag() {
      return (this.multi ? this.selectedRows : [this.currentRow]).filter(
        item => item
      );
    },
    height() {
      return this.options && this.options.rows && this.options.rows.length > 10
        ? 400
        : "auto";
    }
  },
  watch: {
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
    currentRow(val) {
      if (!this.multi && val) {
        this.show = false;
        this.$emit("input", val[this.valueField]);
      }
    },
    options() {
      this.init();
    },
    selectedRows(val) {
      if (this.multi) {
        this.$emit(
          "input",
          val.map(row => row[this.valueField])
        );
      }
    },
    value(val, old) {
      if (this.multi) {
        if (typeof val !== typeof old || val.join(",") !== old.join(",")) {
          this.init();
        }
      } else {
        if (val !== old) {
          this.init();
        }
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.value && this.options && this.options.rows) {
        if (this.multi) {
          this.selectedRows = this.options.rows.filter(row =>
            this.value.includes(row[this.valueField])
          );
        } else {
          this.currentRow = this.options.rows.find(
            row => row[this.valueField] === this.value
          );
        }
      }
    },
    delTag(tag) {
      if (this.multi) {
        const index = this.selectedRows.findIndex(
          row => row[this.valueField] === tag[this.valueField]
        );
        this.selectedRows.splice(index, 1);
      } else {
        this.currentRow = null;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
