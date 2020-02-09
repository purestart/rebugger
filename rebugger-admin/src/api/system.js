import {
  request
} from './set-axios'

export default {
  login: (params) => request('/api/login/sso', 'post', params)
}
