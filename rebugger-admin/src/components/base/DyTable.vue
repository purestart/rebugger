<!--关于2019/1/18的改动说明：某些表格中，接口返回的数据是一个对象，而界面需要展示其中的某一个属性，
    加上template之后，可在template中写一个方法对接口返回的数据进行操作之后，再进行渲染-->
<template>
  <el-table
    ref="table"
    :data="rows"
    v-bind="$attrs"
    v-on="$listeners"
    :row-key="rowKey"
    stripe
    :highlight-current-row="!multi"
    @select="select"
    @select-all="select"
    @row-click="rowClick"
    @current-change="currentChange"
  >
    <el-table-column type="selection" width="55" v-if="multi" />
    <template v-for="(column, index) in columns">
      <el-table-column
        v-if="column.type == 'index'"
        width="50"
        align="center"
        type="index"
        :label="column.label || '序号'"
        :key="index"
      ></el-table-column>
      <el-table-column
        v-else
        v-bind="column"
        :showOverflowTooltip="column | isShowTooltip"
        :key="index"
      >
        <template slot-scope="scope">
          <div v-if="column.btns" class="action">
            <span v-for="(btn, index) in column.btns" :key="index">
              <el-button
                plain
                size="mini"
                type="primary"
                :icon="btn.icon"
                v-bind="btn.props"
                @click.stop="
                  btn.cb({
                    value: scope.row[scope.column['property']],
                    row: scope.row,
                    index: scope.$index
                  })
                "
                >{{ btn.text }}</el-button
              >
            </span>
          </div>
          <div v-else-if="column.template">
            {{
              column.template
                ? column.template(scope.row[column.key])
                : scope.row[column.key]
            }}
          </div>
          <dy-render :column="column" :scope="scope" v-else></dy-render>
        </template>
      </el-table-column>
      <!--<el-table-column v-bind="column" v-else/>-->
    </template>
  </el-table>
</template>

<script>
import DyRender from "./DyRender.vue";
// @Component({components: {CcRender}})
export default {
  props: {
    rows: {
      type: Array
    },
    rowKey: {
      type: String,
      default: "id"
    },
    columns: {
      type: Array
    },
    multiSelect: {
      type: Boolean
    },
    selectedRows: {
      type: Array
    },
    currentRow: {
      type: Object
    }
  },
  filters: {
    isShowTooltip(column) {
      if (column.showOverflowTooltip === undefined) {
        if (column.btns || column.renderCell || column.formatter) {
          return false;
        }
        return true;
      }
      return column.showOverflowTooltip;
    }
  },
  components: {
    DyRender
  },
  /* vue-prop */
  // @Prop() rows
  // @Prop({default: 'id'}) rowKey
  // @Prop() columns
  // @Prop(Boolean) multiSelect // 是否多选
  // @Prop() selectedRows // 选中的行的数组
  // @Prop() currentRow // 当前行
  /* vue-data */
  /* vue-computed */

  computed: {
    multi() {
      return this.multiSelect;
    }
  },
  mounted() {},
  watch: {
    selectedRows(val, old) {
      this.$refs.table.clearSelection();
      if (val) {
        this.$nextTick(() =>
          val.forEach(row => {
            this.$refs.table.toggleRowSelection(row, true);
            // console.log(this.$refs.table);
          })
        );
      }
    },
    currentRow(val, old) {
      if (val) {
        this.$nextTick(() =>
          setTimeout(this.$refs.table.setCurrentRow(val), 0)
        );
      } else {
        this.$nextTick(() => setTimeout(this.$refs.table.setCurrentRow(), 0));
      }
    }
  },
  methods: {
    clearSelection() {
      this.$refs.table.clearSelection();
    },
    refreshRowSelection() {
      if (this.multiSelect) {
        let tRows = [];
        this.$refs.table.clearSelection();
        this.selectedRows.forEach(row => {
          let tRow = this.rows.find(
            item => item[this.rowKey] === row[this.rowKey]
          );
          if (tRow && tRow.id) {
            tRows.push(tRow);
            this.$refs.table.toggleRowSelection(tRow, true);
          }
        });
      }
    },
    currentChange(row) {
      if (row) {
        this.$emit("update:currentRow", row);
        this.$emit("updateCurrentRow", row);
      }
    },
    select(rows, row) {
      this.$emit("update:selectedRows", rows);
      this.$emit("updateSelectedRows", rows);
    },
    // 多选的时候，让点击行的时候，也能选中和取消选中行
    rowClick(row) {
      if (this.multi && this.selectedRows) {
        const index = this.selectedRows.findIndex(
          item => item[this.rowKey] === row[this.rowKey]
        );
        if (index >= 0) {
          this.selectedRows.splice(index, 1);
        } else {
          this.selectedRows.push(row);
        }
        console.log(this.selectedRows);
      } else {
        this.$emit("single-click");
      }
    },
    //
    toggleRowSelection(rows) {
      rows.forEach(row => {
        this.$refs.table.toggleRowSelection(row, true);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  flex-wrap: wrap;
  /deep/ {
    padding: 4px;
  }
}
</style>
