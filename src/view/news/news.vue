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
import { listNews, newsDelete } from '@/api/news'
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
            return tags.map((item, index) => {
              if (tags.length - 1 === index) {
                return h('a', item)
              } else {
                return h('a', item + '、')
              }
            })
          }
        },
        {title: '发布时间',
          key: 'createdAt',
          sortable: true,
          render: (h, params) => {
            const createdAt = params.row.createdAt
            return h('span', this.getDate(createdAt))
          }
        },
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
                    this.go({name: 'news_edit', params: {id: params.row._id}})
                  }
                }
              }, '查看')
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
      let id = params.row._id
      newsDelete({id}).then((res) => {
        const {data} = res
        if (data.code === 200) {
          this.tableData = this.tableData.filter((item, index) => index !== params.row.initRowIndex)
        } else {
          this.$Message.error('删除失败')
        }
      })
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    show (index) {
      this.$Modal.info({
        title: '标题',
        content: `${this.tableData[index].title}`
      })
    },
    getNews () {
      const params = {
        page: 1,
        limit: 10
      }
      listNews(params).then(res => {
        const {data} = res
        console.log(data)
        this.tableData = data.data
      })
    }
  },
  mounted () {
    this.getNews()
  }
}
</script>

<style>

</style>
