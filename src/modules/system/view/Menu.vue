
<template>
  <div class="bg-white p-10" v-loading="loading">
    <div flex="box:first">
      <div class="left" ref="left">
        <div class="actions m-b-10">
          <el-button size="small" type="primary" v-for="(action, index) in actions" :key="index" @click="action.cb">{{action.text}}</el-button>
        </div>
        <el-input placeholder="输入关键字进行过滤" size="small" v-model="filterText"></el-input>
        <div class="p-v-20">
          <el-tree ref="tree" :data="data" :props="{children: 'children', label: 'name'}" :filter-node-method="filterNode" highlight-current node-key="id" :expand-on-click-node="false" @current-change="changeSelected" :default-expanded-keys="expandedKeys"></el-tree>
        </div>
      </div>
      <div v-if="selected">
        <dy-form ref="form" :data="formData"></dy-form>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '../../../utils/mixins'
import { mapState } from 'vuex'
export default {
  mixins: [mixins.baseMixin],
  data () {
    return {
      filterText: '',
      selected: null,
      expandedKeys: [],
      modelName: 'menu',
      pageNumName: 'page',
      actions: [{ text: '新增', cb: this.onAdd }, { text: '删除', cb: this.onDel }],
      newModel: { sortNo: 1, menuType: 0 }
    }
  },
  computed: {
    ...mapState({
      app: state => state.default.app
    }),
    data () {
      return this.$store.state.default.menus
    },
    formData () {
      return {
        model: this.selected,
        props: { size: 'small' },
        items: [
          { label: '菜单类型',
            prop: 'menuType',
            type: 'radio',
            verify: { required: true },
            options: [
              { label: '菜单', value: 0 },
              { label: '目录', value: 1 },
              { label: '按钮', value: 2 }
            ]
          },
          { label: '菜单名称', prop: 'name', type: 'text', verify: { required: true, maxLength: 100 } },
          { label: '菜单URL', prop: 'menuUrl' },
          { label: '上级菜单', prop: 'parentId', type: 'tree', options: this.data },
          { label: '顺序', prop: 'sortNo', type: 'number' },
          { label: '图标', prop: 'icon' }
        ],
        btns: [
          { action: 'save', text: this.selected.id ? '更新' : '保存', cb: this.onSave }
        ]
      }
    },
    defaultProps () {
      return { applicationId: this.app.id }
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) {
        return true
      }
      return data.name.indexOf(value) !== -1
    },
    changeSelected (menu) {
      this.selected = JSON.parse(JSON.stringify(menu))
      // this.formData.model = {...this.selected}
    },
    onAdd () {
      this.selected = JSON.parse(JSON.stringify(this.newModel))
      // this.formData.model = {...this.selected}
      this.$refs.form && this.$refs.form.forceUpdate()
      this.$refs.tree.setCurrentKey(null)
    },
    async onDel () {
      if (!this.selected.id) {
        this.$utils.message('请选择一行', 'warning')
        return
      }
      const re = await this.$utils.confirm('确定要删除吗？')
      if (re) {
        this.loading = true
        const { error } = await this.$store.dispatch('menuDel', [this.selected.id])
        this.loading = false
        if (!error) {
          this.$refs.tree.remove(this.selected)
          this.selected = {}
          this.$refs.form.forceUpdate()
          this.$utils.message('删除成功')
          // this.initData()
        }
      }
    },
    onSave () {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          this.loading = true
          const { data } = await this.$store.dispatch('menuSave', { ...(this.defaultProps || {}), ...this.formData.model })
          this.loading = false
          if (data) {
            this.$utils.message('保存成功')
            this.$store.dispatch('getUserMenu')
            if (this.formData.model.id) {
              this.expandedKeys = [this.formData.model.id]
            } else {
              this.expandedKeys = [data]
            }
            this.selected = null
            this.$refs.form.forceUpdate()
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
