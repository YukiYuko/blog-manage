import axios from '@/libs/api.request'
const prefix = '/news'
/*
* @params title String: 标题
* @params content String: 内容
* @params tags Array： 标签
* */
export const createNews = (data) => {
  return axios.request({
    url: `${prefix}/createNews`,
    data,
    method: 'post'
  })
}
/*
* @params page Number: 页数
* @params limit Number: 每页条数
* */
export const listNews = (data) => {
  return axios.request({
    url: `${prefix}/newsList`,
    data,
    method: 'post'
  })
}
