import axios from '@/libs/api.request'
const prefix = '/system'
const prefix_sub = '/tag'

// 新建标签
export const create_tag = ({ name }) => {
  const data = {
    name
  }
  return axios.request({
    url: `${prefix}${prefix_sub}/create`,
    data,
    method: 'post'
  })
}
export const list_tag = () => {
  return axios.request({
    url: `${prefix}${prefix_sub}/list`,
    method: 'get'
  })
}
