import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

export const getTableData = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      title: '@cparagraph',
      content: '@cparagraph',
      createTime: '@date',
      'tags|1-5': [
        {
          'name|+1': [
            'js',
            'css',
            'html',
            'nodejs',
            'vue'
          ]
        }
      ],
      createAuthor: '@name'
    }))
  })
  return tableData
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}
