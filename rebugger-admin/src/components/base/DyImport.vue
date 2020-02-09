<!--Created by 詹陈龙 on 2018/11/19.-->
<template>
  <div v-loading="loading">
    <el-upload
      ref="upload"
      class="upload"
      :action="uploadUrl"
      :headers="{ token: token }"
      drag
      :on-change="onChange"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-error="onError"
      :auto-upload="false"
      :limit="2"
      :file-list="fileList"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text" flex="cross:center dir:top">
        <span>将文件拖到此处，或<em>点击上传</em></span>
        <span>只能上传xlsx/xls文件</span>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { url } from "../../config";

export default {
  props: {
    url: String
  },
  data() {
    return {
      loading: false,
      fileList: [],
      token: localStorage.getItem("token"),
      uploadUrl: url + this.url
    };
  },
  methods: {
    beforeUpload(file) {
      this.loading = true;
      if (!/^.*(\.xlsx?)$/.test(file.name)) {
        this.$utils.message("文件格式不正确", "error");
        return false;
      }
      this.loading = true;
    },
    onSuccess(response) {
      this.loading = false;
      if (response.status === 200) {
        this.$emit("finish", { data: response.data || {} });
      } else {
        this.$emit("finish", { error: response.desc });
      }
    },
    onError(error) {
      this.loading = false;
      this.$emit("finish", { error: error });
    },
    onImport() {
      if (this.fileList.length === 0) {
        this.$utils.message("没有选择文件", "error");
        return;
      }
      this.$refs.upload.submit();
    },
    onChange(file, fileList) {
      this.fileList = [file];
    },
    clearFiles() {
      this.$refs.upload.clearFiles();
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
