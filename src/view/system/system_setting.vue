<template>
  <div class="system_setting">
    <Card>
      <Tabs value="system-tag" @on-click="switchTab">
        <TabPane label="标签设置" name="system-tag">
          <Tag v-for="(item, index) in tags"
               :key="index"
               :name="item.name"
               closable
               type="dot"
               @on-close="deleteTag(item, 1)"
               color="primary">{{ item.name }}</Tag>
          <Button icon="ios-add" type="dashed" @click="handleAddTags(1)">添加标签</Button>
        </TabPane>
        <TabPane label="类型设置" name="system-type">
          <Tag v-for="(item, index) in types"
               :key="index"
               :name="item.name"
               closable
               type="dot"
               @on-close="deleteTag(item, 2)"
               color="primary">{{ item.name }}</Tag>
          <Button icon="ios-add" type="dashed" @click="handleAddTags(2)">添加类型</Button>
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
      tagText: '',
      types: [],
      typeText: '',
      type: 1
    }
  },
  computed: {
  },
  mounted () {
    this.get_list_tag(1)
    this.get_list_tag(2)
  },
  methods: {
    switchTab (name) {
      if (name === 'system-tag') {
        this.type = 1
      } else if (name === 'system-type') {
        this.type = 2
      }
    },
    get_list_tag (type) {
      list_tag({type}).then((res) => {
        let {data} = res.data
        if (type === 1) {
          this.tags = data
        } else {
          this.types = data
        }
      })
    },
    deleteTag ({_id}) {
      console.log(_id)
    },
    handleAddTags (type) {
      this.type = type
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
                if (type === 1) {
                  this.tagText = val
                } else {
                  this.typeText = val
                }
              }
            }
          })
        },
        onOk: () => {
          if (this.type === 1) {
            if (!this.tagText) {
              this.$Message.error('请输入标签名')
              return false
            }
          } else {
            if (!this.typeText) {
              this.$Message.error('请输入类型名')
              return false
            }
          }
          create_tag({name: this.type === 1 ? this.tagText : this.typeText, type: this.type}).then((res) => {
            const {data} = res.data
            if (this.type === 1) {
              this.tags.push(data)
            } else {
              this.types.push(data)
            }
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
