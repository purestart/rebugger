export default {
  tabMixin: {
    data () {
      return {
        pageId: ''
      }
    },
    computed: {
      selectedTab () {
        return this.$store.state.default.selectedTab
      },
      flatMenu () {
        return this.$store.getters.flatMenu
      }
    },
    async activated () {
      if (this.tabTitle) {
        this.$store.commit('updateTabTitle', this.tabTitle)
      }
    },
    created () {
      this.pageId = this.selectedTab
      // 注册一个remove事件，处理当tab页关闭的时候缓存的清理
      this.$bus.$off('remove')
      this.$bus.$on('remove', (id) => {
        const menu = this.flatMenu.find(m => m.id === id)
        // 当页面是crud页面的时候，发送removePage事件，移除page页面里面的缓存
        if (menu && menu.menuUrl.indexOf('/baseData/page/') === 0) {
          this.$bus.$emit('removePage', id)
        } else {
          // 其它页面发送removeTab+页面id事件，移除tab页的缓存
          this.$bus.$emit('removeTab' + id)
        }
      })
      // 注册事件，page页面的时候，注册removePage事件，因为所有的crud页面公用page页，
      // 所以这个时候不应该删除page页，交给page组件自己的destroy方法去处理page里面维护的缓存
      // 而其他的页面就可以自己删除缓存病销毁
      if (this.$route.name === 'page') {
        this.$bus.$off('removePage')
        this.$bus.$on('removePage', (id) => {
          this.destroy && this.destroy(id)
        })
      } else {
        console.log('on-', this.pageId)
        this.$bus.$on('removeTab' + this.pageId, () => {
          let delCache = true
          if (this.destroy) {
            delCache = this.destroy()
          }
          if (delCache) {
            this.$utils.destroyAndRemoveCache(this)
          }
        })
      }
    },
    destroyed () {
      // console.log('off_', this.pageId)
      this.$bus.$off('removeTab' + this.pageId)
    },
    deactivated () {
      this.$bus.$off('refresh')
      this.$bus.$on('refresh', (id) => {
        if (id === this.pageId) {
          if (this.refresh) {
            this.refresh()
          } else {
            this.getData && this.getData()
          }
          this.$bus.$off('refresh')
        }
      })
    }
  },
  baseMixin: {
    data () {
      return {
        loading: false,
        modelLoading: false
      }
    }
  },
  pageMixin: {
    data () {
      return {
        pageSizes: [10, 20, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSize: 10,
        pageNum: 1,
        rows: [],
        total: 0,
        selectedRows: [],
        currentRow: null,
        pageNumName: 'pageNum'
      }
    },
    computed: {
      pageParams () {
        return {
          pageSize: this.pageSize,
          [this.pageNumName]: this.pageNum
        }
      }
    },
    created () {
      this.getData()
    },
    methods: {
      // pageNum改变的时候的事件
      pageNumChange (pageNum) {
        this.pageNum = pageNum
        this.getData()
      },
      // pageSize改变的时候的事件
      pageSizeChange (pageSize) {
        this.pageSize = pageSize
        this.getData()
      },
      setPageData (data) {
        if (data) {
          this.total = data.total
          this.rows = data.records
        } else {
          this.total = 0
          this.rows = []
        }
      }
    }
  },
  baseCRUD: {
    data () {
      return {
        modelTitle: '新增', // 弹窗标题
        isView: false, // 是否是查看
        modelVisible: false, // 弹窗是否显示
        selectedRows: [], // 选择的行
        // otherSearch: {}, // 其他搜索参数
        labelWidthSearch: 'auto', // 搜索表单label的宽度
        labelWidthEdit: '100px', // 编辑表单label的宽度
        searchBtns: [ // 搜索表单的按钮
          {
            text: '搜索',
            cb: this.onSearch
          }
        ],
        editBtns: [], // 编辑表单的按钮
        // defaultProps: {}, // 默认要保存属性值，值不显示在表单，但是要保存的属性
        newModel: {}, // 新建的时候，默认设置的属性
        columns: [], // 表格列
        viewColumns: [], // 查看表单的列
        searchForm: {}, // 搜索表单
        editForm: {} // 编辑表单
      }
    },
    created () {
      this.columns = this.fields.filter(f => f.target && f.target.includes('table'))
      this.viewColumns = this.fields.filter(f => f.target && f.target.includes('view'))
      this.searchForm = {
        labelWidth: this.labelWidthSearch,
        props: {
          size: 'small',
          labelSuffix: ':'
        },
        model: {},
        items: this.fields.filter(f => f.target && f.target.includes('searchForm')),
        btns: this.searchBtns
      }
      this.editForm = {
        labelWidth: this.labelWidthEdit,
        props: {
          size: 'small',
          labelSuffix: ':',
          disabled: false
        },
        model: {},
        items: this.fields.filter(f => f.target && f.target.includes('editForm')),
        btns: this.editBtns
      }
    },
    methods: {
      onSearch () {
        this.pageNum = 1
        this.getData()
      },
      showModel () {
        this.modelVisible = true
        if (this.$refs['form']) {
          this.$refs['form'].clearValidate()
          // this.$refs['form'].forceUpdate()
        }
      },
      onAdd () {
        if (this.beforeAdd && !this.beforeAdd()) {
          return
        }
        this.modelTitle = '新增'
        this.editForm.model = JSON.parse(JSON.stringify(this.newModel))
        this.showModel()
      },
      onEdit ({
        row
      }) {
        this.modelTitle = '修改'
        if (this.handlerRow) {
          row = this.handlerRow(row)
        }
        this.editForm.model = JSON.parse(JSON.stringify(row))
        this.showModel()
      },
      onClose () {
        this.modelVisible = false
        this.isView = false
      },
      onView ({
        row
      }) {
        this.modelTitle = '查看'
        if (this.handlerRowView) {
          row = this.handlerRowView(row)
        }
        this.editForm.model = JSON.parse(JSON.stringify(row))
        this.isView = true
        this.modelVisible = true
      },
      async getData () {
        this.loading = true
        // this.$utils.showLoading()
        const {
          data
        } = await this.$store.dispatch(this.modelName + 'Page', {
          ...this.pageParams,
          ...this.searchForm.model,
          ...(this.otherSearch || {})
        })
        // this.$utils.hideLoading()
        this.loading = false
        if (data) {
          this.rows = data.records || data.list || data
          this.total = data.total
        }
      },
      onSave () {
        if (!this.$refs['form']) return this.onClose()
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            // debugger
            let model = JSON.parse(JSON.stringify(this.editForm.model))
            if (this.beforeSave && !this.beforeSave(model)) {
              return
            }
            this.modelLoading = true
            const {
              data
            } = await this.$store.dispatch(this.modelName + 'Save', {
              ...(this.defaultProps || {}),
              ...model
            })
            this.modelLoading = false
            if (data) {
              this.$utils.message('保存成功')
              this.onClose()
              this.getData()
            }
          } else {
            return false
          }
        })
      },
      async onDel () {
        if (this.selectedRows.length === 0) {
          this.$utils.message('请至少选择一项', 'warning')
          return
        }
        const re = await this.$utils.confirm('确定要删除吗？')
        if (re) {
          this.loading = true
          const {
            data
          } = await this.$store.dispatch(this.modelName + 'Del', this.selectedRows.map(row => row.id))
          this.loading = false
          if (data) {
            this.$utils.message('删除成功')
            this.getData()
          }
        }
      }
    }
  }
}
