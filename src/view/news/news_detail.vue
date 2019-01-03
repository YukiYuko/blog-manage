<template>
  <div class="news_detail">
    <Card>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="头图" prop="imageUrl">
          <div class="avatar-box">
            <img class="avatar-show" :src="formValidate.imageUrl || require('../../assets/images/talkingdata.png') " alt="上传头像">
            <label class="upload-img-btn" for="upload-img">上传图片</label>
            <input id="upload-img" type="file" @change="upload_img">
          </div>
        </FormItem>
        <FormItem label="类型" prop="newsType">
          <Select v-model="formValidate.newsType" placeholder="选择类型">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="标题" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="标签" prop="tags">
          <CheckboxGroup v-model="formValidate.tags">
            <Checkbox :label="item.name" v-for="(item, index) in tags" :key="index"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="描述" prop="desc">
          <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="请输入描述"></Input>
        </FormItem>
        <FormItem label="描述" prop="content">
          <editor ref="editor" :value="formValidate.content" @on-change="handleChange"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </Card>
    <div class="cropper-img-box" v-if="cropper_box_mark">
      <vueCropper
        ref="cropper"
        :img="cropperData.img"
        :autoCrop="cropperData.autoCrop"
        :fixedBox="false"
        :fixed="false"
        :outputSize="0.5"
      ></vueCropper>
      <div class="cropper-img-tool">
        <button class="cropper-img-tool-btn" @click="rotateRight">顺时针90°</button>
        <button class="cropper-img-tool-btn" @click="finish">确认</button>
        <button class="cropper-img-tool-btn" @click="cropper_box_mark = false">取消</button>
        <button class="cropper-img-tool-btn" @click="rotateLeft">逆时针90°</button>
      </div>
    </div>
  </div>
</template>
<script>
import {createNews, newsDetail, newsUpdate} from '../../api/news'
import {list_tag} from '../../api/system'
import Editor from '_c/editor'
export default {
  name: 'news_detail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    id: String
  },
  data () {
    return {
      cropper_box_mark: false,
      cropperData: {
        img: '',
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200
        // fixedNumber: [16, 9],
        // fixedBox: true
      },
      tags: [],
      formValidate: {
        newsType: '',
        title: '',
        mail: '',
        city: '',
        gender: '',
        tags: [],
        date: '',
        time: '',
        content: '',
        imageUrl: '',
        desc: ''
      },
      ruleValidate: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'change' }
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: '请上传头像', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        tags: [
          { required: true, type: 'array', min: 1, message: '至少选择一个标签', trigger: 'change' },
          { type: 'array', max: 5, message: '最多只能选择五个标签', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { type: 'string', min: 20, message: '不能少于20字', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    Editor
  },
  watch: {
    id (val, newVal) {
      // 对路由变化作出响应...
      if (val !== newVal) {
        this.getDetail(val)
      }
    }
  },
  beforeRouteUpdate () {
    console.log(1111)
  },
  created () {
    this.get_list_tag()
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.getDetail(id)
    }
  },
  methods: {
    get_list_tag () {
      list_tag({type: 1}).then((res) => {
        let {data} = res.data
        this.tags = data
      })
    },
    getDetail (id) {
      newsDetail({id}).then((res) => {
        const {data} = res
        if (data.code === 200) {
          this.formValidate.title = data.data.title
          this.formValidate.content = data.data.content
          this.formValidate.tags = data.data.tags
          this.formValidate.imageUrl = data.data.image
          this.formValidate.desc = data.data.desc
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let params = {
            title: this.formValidate.title,
            content: this.formValidate.content,
            tags: this.formValidate.tags,
            image: this.formValidate.imageUrl,
            desc: this.formValidate.desc
          }
          if (this.id) {
            newsUpdate({id: this.id, data: params}).then((res) => {
              const {data} = res
              if (data.code === 200) {
                this.$Message.success('修改成功')
              }
            })
          } else {
            createNews(params).then((res) => {
              const {data} = res
              if (data.code === 200) {
                this.$Message.success(data.info)
              }
            })
          }
        } else {
          this.$Message.error('Fail!')
        }
      })
      return false
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    // 上传成功
    handleAvatarSuccess (res, file) {
      this.formValidate.imageUrl = res.data.url
    },
    // 上传之前
    beforeAvatarUpload (file) {
      console.log('file', file)
      const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$Message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$Message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG && isLt2M
    },
    // 格式错误
    handleFormatError () {
      this.$Message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!')
    },
    // 大小不合适
    handleExceededSize () {
      this.$Message.error('上传头像图片大小不能超过 10MB!')
    },
    // 富文本
    handleChange (html, text) {
      this.formValidate.content = html
    },
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    finish () {
      this.$refs.cropper.getCropData((data) => {
        this.formValidate.imageUrl = data
        console.log(data)
        this.cropper_box_mark = false
      })
    },
    upload_img (e) {
      let obj = e.target
      let file = obj.files[0]
      let temArr = file.name.split('.')
      let file_suffix = temArr[temArr.length - 1]
      if (file_suffix !== 'jpg' && file_suffix !== 'png' && file_suffix !== 'jpeg') {
        this.$Message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!')
        return
      }
      let reader = new FileReader()
      let _self = this
      reader.onload = (ev) => {
        _self.cropperData.img = ev.target.result
        _self.cropper_box_mark = true
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
<style lang="less">
  .news_detail{
    .before-select{
      width: 150px; height: 150px;
      border: 1px solid #f5f5f5;
      font-size: 40px;
      cursor: pointer;
      p{
        font-size: 16px;
      }
    }
    .after-select{
      img{
        width: 150px; height: 150px;
        display: block;
      }
    }
  }
  .avatar-box {
    flex: 1;
  }
  #upload-img {
    opacity: 0;
    display: none;
  }
  .upload-img-btn {
    width: 100px;
    border: 1px solid #ccc;
    display: block;
    padding: 5px 15px;
    transform: translateY(40%);
    cursor: pointer;
    text-align: center;
  }
  .form-itme-avatar {
    height: auto;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  .avatar-show {
    display: block;
    width: 150px;
    height: 150px;
  }
  .cropper-img-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    .cropper-img-tool {
      position: absolute;
      z-index: 2;
      bottom: 20px;
      left: 0;
      text-align: center;
      width: 100%;
      .cropper-img-tool-btn {
        width: 140px;
        height: 50px;
        font-size: 18px;
        cursor: pointer;
        & + .cropper-img-tool-btn {
          margin-left: 50px;
        }
      }
    }
  }
</style>
