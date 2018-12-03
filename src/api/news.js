import axios from '@/libs/api.request'
/*
* @params title String: 标题
* @params content String: 内容
* @params tags Array： 标签
* */
export const createNews = (data) => {
  return axios.request({
    url: '/news/createNews',
    data,
    method: 'post'
  })
}
