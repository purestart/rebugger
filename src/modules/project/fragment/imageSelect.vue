<template>
  <div class="image-select b-o">
    <img @click="select" :src="url" alt />
    <edit-model :hideSubmitBtn="false" title="修改个人信息" :modelVisible="modelVisible" @submit="onSubmit"
      @close="modelVisible=false">
      <div flex="dir:top" class="p-10">
        <div flex="dir:left cross:center" class="h-80 b-b">
          <div>
            当前选择：
          </div>
          <img :src="selectedImage" alt />
        </div>
        <div>
        <div flex="dir:left main:center" style="white-space:wrap;flex-flow:row wrap;" class="p-t-10">
          <div style="display:inline-block;" class="p-10" :key="index" v-for="(item,index) in imageList">
            <img @click="selectImage(item)" :src="item.url" alt />
          </div>
        </div>
        </div>
      </div>
      <!-- <dy-form ref="formUser" :data="formData" class="my-form col-2 m-r-16 p-v-16"></dy-form> -->
    </edit-model>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    url: {
      type: String,
      required: false,
      default: ""
    }
  },
  data () {
    return {
      selectedImage: "",
      imageList: [
        {
          name: "",
          url: "/static/assets/javascript.jpg"
        },
        {
          name: "",
          url: "/static/assets/angular.jpg"
        },
        {
          name: "",
          url: "/static/assets/vue.png"
        },
        {
          name: "",
          url: "/static/assets/element.png"
        },
        {
          name: "",
          url: "/static/assets/react.png"
        },
        {
          name: "",
          url: "/static/assets/java.png"
        },
        {
          name: "",
          url: "/static/assets/qq.png"
        },
        {
          name: "",
          url: "/static/assets/wechat.png"
        },
        {
          name: "",
          url: "/static/assets/edas.png"
        },
        {
          name: "",
          url: "/static/assets/ios.png"
        },
        {
          name: "",
          url: "/static/assets/mobile.png"
        },
        {
          name: "",
          url: "/static/assets/sae.png"
        },
        {
          name: "",
          url: "/static/assets/webx.png"
        },
        {
          name: "",
          url: "/static/assets/wwafeb.png"
        },
        {
          name: "",
          url: "/static/assets/yytj.png"
        },
        {
          name: "",
          url: "/static/assets/swas.png"
        },
        {
          name: "",
          url: "/static/assets/yytg.png"
        }
      ],
      modelVisible: false,
      formData: {
        props: {
          size: "small"
          // disabled:
          //   this.$utils.getUserInfo('userType') === this.$c.UserTypeV.欧派
        },
        model: {},
        items: [
          {
            label: "登录名",
            prop: "userName",
            props: { disabled: true },
            verify: {}
          },
          { label: "用户名", prop: "fullName", verify: { maxLength: 20 } },
          {
            label: "昵称",
            prop: "nickName",
            verify: { maxLength: 20, canBeEmpty: "" }
          },
          { label: "岗位", prop: "position", props: { disabled: true } },
          {
            label: "代码",
            prop: "code",
            props: { disabled: true },
            target: ["table", "editForm", "view"],
            verify: { maxLength: 20 }
          },
          {
            label: "性别",
            prop: "sex",
            type: "select",
            target: ["table", "editForm"],
            verify: {},
            options: this.$c.options.sex
          },
          {
            label: "手机号码",
            prop: "phone",
            target: ["table", "editForm", "view"],
            verify: { phone: true }
          },
          {
            label: "邮箱",
            prop: "mail",
            target: ["table", "editForm", "view"],
            verify: { email: true }
          }
        ],
        btns: []
      }
    };
  },
  mounted () { },
  methods: {
    selectImage (item) {
      this.selectedImage = item.url;
    },
    select () {
      this.selectedImage = this.url;
      this.modelVisible = true;
    },
    onSubmit () {
      this.$emit("onSelect", this.selectedImage);
      this.modelVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.image-select {
  width: 60px;
  height: 60px;
  box-sizing: content-box;
  img {
    width: 60px;
    height: 60px;
    display: block;
  }
}
</style>