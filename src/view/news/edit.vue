<template>
  <div class="news-edit">
    <Card>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
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
import {createNews} from '../../api/news'
export default {
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
        content: ''
      },
      ruleValidate: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Please select the city', trigger: 'change' }
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
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let params = {
            title: this.formValidate.title,
            content: this.formValidate.content,
            tags: this.formValidate.tags
          }
          createNews(params).then((res) => {
            const {data} = res
            this.$Message.success(data.message)
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
