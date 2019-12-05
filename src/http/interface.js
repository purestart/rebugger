import { axios } from 'base'
/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 URL 独立成文件，接口分成不同的模块
 */
/**接口处理示例 */
export const testGet = params => {
  //接口备注
  return axios({
    url: '/ticket/getApi',
    method: 'get',
    params
  })
}

export const testPost = data => {
  return axios({
    url: '/ticket/postApi',
    method: 'post',
    data
  })
}

export default {
  testGet,
  testPost
}
