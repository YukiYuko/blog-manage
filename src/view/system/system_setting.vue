<template>
  <div class="system_setting">
    <Card>
      <Tabs value="system-tag">
        <TabPane label="标签设置" name="system-tag">
          <Tag v-for="(item, index) in tags"
               :key="index"
               :name="item.name"
               closable
               type="dot"
               @on-close="deleteTag(item)"
               color="primary">{{ item.name }}</Tag>
          <Button icon="ios-add" type="dashed" @click="handleAddTags">添加标签</Button>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import {create_tag, list_tag} from '../../api/system'
export default {
  name: 'system_setting',
  data () {
    return {
      tags: [],
      tagText: ''
    }
  },
  computed: {
  },
  mounted () {
    this.get_list_tag()
  },
  methods: {
    get_list_tag () {
      list_tag().then((res) => {
        let {data} = res.data
        this.tags = data
      })
    },
    deleteTag ({_id}) {
      console.log(_id)
    },
    handleAddTags () {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.tagText,
              autofocus: true,
              placeholder: 'Please enter your name...'
            },
            on: {
              input: (val) => {
                this.tagText = val
                console.log(this.tagText)
              }
            }
          })
        },
        onOk: () => {
          if (!this.tagText) {
            this.$Message.error('请输入标签名')
            return false
          }
          create_tag({name: this.tagText}).then((res) => {
            console.log(res)
            const {data} = res.data
            this.tags.push(data)
            this.$Message.success('创建成功')
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.system_setting{
  min-height: 100%;
}
</style>
