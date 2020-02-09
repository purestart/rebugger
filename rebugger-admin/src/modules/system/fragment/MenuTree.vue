/*
* author:詹陈龙
* description: 角色权限弹出框
* update:2018-08-07
*/
<template>
    <div>
       <el-dialog
        title="菜单授权"
        :visible.sync="visible"
        width="400"
        :before-close="beforeClose"
        top="0"
        >

        <div class="dialog-container">
            <el-tree
            v-loading="loading"
            :data="menusData"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
            </el-tree>
        </div>

        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="beforeClose">取 消</el-button>
            <el-button size="mini" type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    visible: Boolean,
    beforeClose: Function
  },
  data () {
    return {
      loading: false,
      menusData: [{
        id: 1,
        label: '数据采集维护',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '应用实例维护',
        children: [{
          id: 5,
          label: '菜单管理'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '资源分组',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    visible (curVal, oldVal) {
      console.log(curVal)
      if (curVal == false) {
        this.loading = false
      } else {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 2000)
      }
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    // this.loading=true;
    //   setTimeout(()=>{
    //     this.loading=false;
    //   },2000)
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
  .dialog-container{
    position: relative;
    height: 300px;
    overflow: auto;
  }
</style>
