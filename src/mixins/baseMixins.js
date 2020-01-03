export default {
  baseMixin: {
    data() {
      return {
        loading: false,
        modelLoading: false
      };
    }
  },
  pageMixin: {
    data() {
      return {
        pageSizes: [1, 10, 20, 50, 100],
        layout: "total, prev, pager, next, jumper",
        pageSize: 10,
        pageNum: 1,
        rows: [],
        total: 0,
        selectedRows: [],
        currentRow: null,
        pageNumName: "pageNum"
      };
    },
    computed: {
      pageParams() {
        return {
          pageSize: this.pageSize,
          [this.pageNumName]: this.pageNum
        };
      }
    },
    created() {},
    mounted() {
      // console.log("mounted");
      this.getData();
    },
    methods: {
      // pageNum改变的时候的事件
      pageNumChange(pageNum) {
        this.pageNum = pageNum;
        this.getData();
      },
      // pageSize改变的时候的事件
      pageSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.getData();
      },
      setPageData(data) {
        if (data) {
          this.total = data.total;
          this.rows = data.records;
        } else {
          this.total = 0;
          this.rows = [];
        }
      }
    }
  }
};
