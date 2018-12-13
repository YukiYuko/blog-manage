import axios from '@/libs/api.request'
const prefix = '/news'
/*
* 创建新闻
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
/*
* 删除新闻
* @params id String: 新闻ID
* */
export const newsDelete = (data) => {
  return axios.request({
    url: `${prefix}/newsDelete`,
    data,
    method: 'post'
  })
}
/*
* 获取单个新闻
* @params id String: 新闻ID
* */
export const newsDetail = (data) => {
  return axios.request({
    url: `${prefix}/newsDetail`,
    data,
    method: 'post'
  })
}
/*
* 更新新闻
* @params id String: 新闻ID
* @params data String: 数据data
* 格式: { id: id, data: data}
* */
export const newsUpdate = (data) => {
  return axios.request({
    url: `${prefix}/newsUpdate`,
    data,
    method: 'post'
  })
}
