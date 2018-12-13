<template>
  <div class="news_publish">
    <Card>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="头图" prop="imageUrl">
          <Upload
            :show-upload-list="false"
            :on-success="handleAvatarSuccess"
            :on-format-error="handleFormatError"
            :max-size="10000"
            :on-exceeded-size="handleExceededSize"
            :format="['jpg','jpeg','png']"
            action="http://localhost:3002/upload/single">
            <div v-if="!formValidate.imageUrl" class="before-select" flex items="center" dir="column" justify="center">
              <Icon type="ios-images-outline" />
              <p>上传图片</p>
            </div>
            <div class="after-select" v-if="formValidate.imageUrl">
              <img :src="formValidate.imageUrl" alt="">
            </div>
          </Upload>
        </FormItem>
        <FormItem label="标题" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="标签" prop="tags">
          <CheckboxGroup v-model="formValidate.tags">
            <Checkbox :label="item.name" v-for="(item, index) in tags" :key="index"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="内容" prop="content">
          <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="请输入内容"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import { tags } from '../../const/index'
import {createNews, newsDetail, newsUpdate} from '../../api/news'
export default {
  name: 'news_edit',
  data () {
    return {
      tags: tags,
      formValidate: {
        title: '',
        mail: '',
        city: '',
        gender: '',
        tags: [],
        date: '',
        time: '',
        content: '',
        imageUrl: ''
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
          { required: true, message: '请输入内容', trigger: 'blur' },
          { type: 'string', min: 20, message: '不能少于20字', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    '$route' () {
      this.id = this.$route.params.id
      this.getDetail(this.id)
    }
  },
  mounted () {
    this.id = this.$route.params.id
    if (this.id) {
      this.getDetail(this.id)
    }
  },
  methods: {
    getDetail (id) {
      newsDetail({id}).then((res) => {
        const {data} = res
        if (data.code === 200) {
          this.formValidate.title = data.data.title
          this.formValidate.content = data.data.content
          this.formValidate.tags = data.data.tags
          this.formValidate.imageUrl = data.data.image
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
            image: this.formValidate.imageUrl
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
                this.$Message.success(data.message)
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
    }
  }
}
</script>
<style lang="less">
  .news_publish{
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
</style>
