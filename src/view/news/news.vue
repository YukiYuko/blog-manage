<template>
  <div>
    <Card>
      <tables ref="tables"
              editable
              searchable
              search-place="top"
              v-model="tableData"
              :columns="columns"
              @on-delete="handleDelete"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { listNews } from '@/api/news'
export default {
  name: 'news',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {title: '标题', key: 'title', sortable: false, tooltip: true},
        {title: '内容', key: 'content', editable: false, tooltip: true},
        {title: '标签',
          key: 'tags',
          render: (h, params) => {
            const tags = params.row.tags
            return tags.map(item => h('a', item.name))
          }
        },
        {title: '发布时间', key: 'createTime', sortable: true},
        {title: '发布者', key: 'createAuthor'},
        {
          title: '操作',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginLeft: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, 'View')
            }
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    show (index) {
      this.$Modal.info({
        title: '标题',
        content: `Name：${this.tableData[index].title}`
      })
    }
  },
  mounted () {
    listNews().then(res => {
      console.log(res)
      // this.tableData = res.data
    })
  }
}
</script>

<style>

</style>
