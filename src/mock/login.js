import { getParams } from '@/libs/util'
const USER_MAP = {
  Yuki: {
    name: 'Yuki',
    user_id: '1',
    access: ['Yuki', 'admin'],
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDQwNjcwOTcsImV4cCI6MTU0NDA2NzE1N30.stRphMM5GmQWu3sAkgfDwPlW1CPwTSvskpewgj62zIM',
    avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
  },
  admin: {
    name: 'admin',
    user_id: '2',
    access: ['admin'],
    token: 'admin',
    avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
  }
}

export const login = req => {
  req = JSON.parse(req.body)
  return {token: USER_MAP[req.userName].token}
}

export const getUserInfo = req => {
  const params = getParams(req.url)
  return USER_MAP[params.token]
}

export const logout = req => {
  return null
}
