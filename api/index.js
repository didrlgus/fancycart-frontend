import axios from 'axios'

const DOMAIN = 'http://localhost:8080'
const UNAUTHORIZED = 401
const API_VERSION = '/api/v1'
const onUnauthorized = () => {
  // router.push(`/login?returnPath=${encodeURIComponent(location.pathname)}`)
  this.$router.push(`/login?returnPath=${encodeURIComponent(location.pathname)}`);
  console.log('1234')
}

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data
  }).then(result => result.data)
    .catch(result => {
      const {status} = result.response
      if(status === UNAUTHORIZED) onUnauthorized()
      throw result.response
    })
}

export const user = {
  create(name, email, password, agreeMessageByEmail, roadAddr, buildingName, detailAddr) {
    return request('post', API_VERSION + '/user', {name, email, password, agreeMessageByEmail, roadAddr, buildingName, detailAddr})
  }
}

export const setAuthInHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

export const auth = {
  login(email, password) {
    return request('post', '/login', {email, password})
  }
}


