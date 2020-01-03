<!--Created by 詹陈龙 on 2018/6/11.-->
<script>
// import { Component, Vue, Prop } from 'vue-property-decorator'

export default {
  // @Prop(Function) renderFun
  // @Prop() scope
  // @Prop() column

  props: {
    renderFun: {
      type: Function,
      required: false
    },
    scope: {
      type: Object,
      required: false
    },
    column: {
      type: Object,
      required: false
    }
  },

  render(h) {
    if (this.renderFun) {
      return this.renderFun(h);
    }
    const scope = this.scope;
    if (this.column.renderCell) {
      if (scope) {
        return this.column.renderCell(
          h,
          scope.row[scope.column["property"]],
          scope.row,
          scope.$index,
          scope.column,
          scope.store
        );
      } else {
        return this.column.renderCell(h);
      }
    } else if (this.column.formatter) {
      return h(
        "span",
        this.column.formatter(
          scope.row,
          scope.column,
          scope.row[scope.column["property"]]
        )
      );
    } else {
      let value = scope.row[scope.column["property"]];
      if (this.column.formProps && this.column.formProps.options) {
        let rows = this.column.formProps.options;
        let labelField = "label";
        let valueField = "value";
        if (["table", "tree"].includes(this.column.formProps.type)) {
          labelField = this.column.formProps.props
            ? this.column.formProps.props.labelField || "name"
            : "name";
          valueField = this.column.formProps.props
            ? this.column.formProps.props.valueField || "id"
            : "id";
        }
        value = Array.isArray(value) ? value : [value];
        if (this.column.formProps.type === "table") {
          rows = this.column.formProps.options.rows;
        } else if (this.column.formProps.type === "tree") {
          rows = this.$utils.flatObject(this.column.formProps.options);
        }
        value = rows
          .filter(row => value.includes(row[valueField]))
          .map(row => row[labelField] || row.id)
          .join(",");
      }
      return h("span", value);
    }
  }
};
</script>

<style lang="scss" scoped></style>
