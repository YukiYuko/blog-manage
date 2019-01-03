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
    <Modal
      v-model="show_create"
      title="新增"
      @on-ok="ok"
    >
      <Form>
        <FormItem v-show="type === 2" label="key" prop="key">
          <Input v-model="key" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="名字" prop="tagText">
          <Input v-model="tagText" placeholder="Enter your name"></Input>
        </FormItem>
      </Form>
    </Modal>
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
      key: '',
      types: [],
      typeText: '',
      type: 1,
      show_create: false
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
    ok () {
      if (this.type === 1) {
        if (!this.tagText) {
          this.$Message.error('请输入名字')
          return false
        }
      } else {
        if (!this.key) {
          this.$Message.error('请输入key')
          return false
        }
        if (!this.tagText) {
          this.$Message.error('请输入名字')
          return false
        }
      }
      create_tag({name: this.tagText, type: this.type, key: this.key}).then((res) => {
        const {data} = res.data
        if (this.type === 1) {
          this.tags.push(data)
        } else {
          this.types.push(data)
        }
        this.$Message.success('创建成功')
      })
    },
    handleAddTags () {
      this.show_create = true
    }
  }
}
</script>

<style lang="less">
.system_setting{
  min-height: 100%;
}
</style>
