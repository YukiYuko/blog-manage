import axios from '@/libs/api.request'
const prefix = '/system'
const prefix_sub = '/tag'

// 新建标签
export const create_tag = ({ name, type }) => {
  const data = {
    name,
    type
  }
  return axios.request({
    url: `${prefix}${prefix_sub}/create`,
    data,
    method: 'post'
  })
}
export const list_tag = ({ type }) => {
  return axios.request({
    url: `${prefix}${prefix_sub}/list?type=${type}`,
    method: 'get'
  })
}
