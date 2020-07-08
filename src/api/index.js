import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:8080'
const UNAUTHORIZED = [401,403]
const API_VERSION = "/api/v1"

const onUnauthorized = () => {
  router.push(`/session/singup?returnPath=${encodeURIComponent(location.pathname)}`)
}

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + API_VERSION + url,
    data
  }).then(result => result.data)
    .catch(result => {
      const {status} = result.response
      if(status === UNAUTHORIZED[0] || status === UNAUTHORIZED[1]) onUnauthorized()
      throw result.response
    })
}

export const setAuthInHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

export const user = {
  create(name, email, password) {
    return request('post', '/user', {name, email, password})
  },
  fetch(uId) {
    return request('get', `/user/${uId}`)
  }
}

export const auth = {
  login(email, password) {
    return request('post', '/authentication', {email, password})
  }
}


