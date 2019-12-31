<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="部门名称"></el-input>
      </el-form-item>
      <el-form-item label="上级部门" prop="parent_name">
        <el-popover ref="deptListPopover" placement="bottom-start" trigger="click">
          <el-tree :data="deptList" :props="deptListTreeProps" node-key="id" ref="deptListTree" @current-change="deptListTreeCurrentChangeHandle" :highlight-current="true" :expand-on-click-node="false">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.parent_name" v-popover:deptListPopover :readonly="true" placeholder="上级部门"></el-input>
      </el-form-item>
      <el-form-item label="排序号" prop="order_num">
        <el-input-number v-model="dataForm.order_num" controls-position="right" :min="0" label="排序号"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      deptList: [],
      deptListTreeProps: {
        label: 'name',
        children: 'children'
      },
      roleList: [],
      dataForm: {
        id: 0,
        name: '',
        parent_id: 0,
        parent_name: '',
        order_num: 0
      },
      dataRule: {
        name: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        parent_name: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        order_num: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.getDeptList().then(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.getDeptInfo()
          }
        })
      })
    },
    // 获取部门列表
    getDeptList () {
      return this.$axios.get(`${this.$baseUrl}/dept/tb-depts/list`).then(({ data }) => {
        if (data && data.success === 1) {
          this.deptList = [{
            id: 0,
            name: '一级部门',
            parent_id: 0,
            children: data.data
          }]
        }
      })
    },
    // 获取部门信息
    getDeptInfo () {
      this.$axios.get(`${this.$baseUrl}/dept/tb-depts/info/${this.dataForm.id}`).then(({ data }) => {
        if (data && data.success === 1) {
          console.log(data)
          this.dataForm.name = data.data.name
          this.dataForm.parent_id = data.data.parent_id
          this.dataForm.order_num = data.data.order_num
          // 部门树设置当前选中节点
          this.$refs.deptListTree.setCurrentKey(this.dataForm.parent_id)
          this.dataForm.parent_name = this.dataForm.parent_id === this.$refs.deptListTree.getCurrentKey()
            ? this.$refs.deptListTree.getCurrentNode()['name']
            : ''
        }
      })
    },
    // 部门树选中
    deptListTreeCurrentChangeHandle (data, node) {
      this.dataForm.parent_id = data.id
      this.dataForm.parent_name = data.name
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$axios.post(
            `${this.$baseUrl}/dept/tb-depts/${!this.dataForm.id ? 'create' : 'update'}`,
            {
              'id': this.dataForm.id || undefined,
              'name': this.dataForm.name,
              'parent_id': this.dataForm.parent_id,
              'parent_name': this.dataForm.parent_name,
              'order_num': this.dataForm.order_num
            }
          ).then(({ data }) => {
            if (data && data.success === 1) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {

                }
              })
              this.visible = false
              this.$emit('refreshDataList')
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
