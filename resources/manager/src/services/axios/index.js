import axios from 'axios'
import store from 'store'
import { notification } from 'antd'

const apiClient = axios.create({
  baseURL: 'http://january.business.localhost:8000',
  timeout: 20000,
  // headers: { 
  //   'Authorization': `JWT ${store.get('accessToken')}`
  // }
})

apiClient.interceptors.request.use(request => {
  const accessToken = store.get('accessToken')
  if (accessToken) {
    request.headers.Authorization = `JWT ${accessToken}`
  }
  return request
})

apiClient.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  console.log(response)
  const { data } = response
  console.log(data)
  if (data) {
    if(data.detail) {
      notification.warning({
        message: data.detail
      })
    } else {
      notification.warning({
        message: data.password[0]
      })
    }
  }
})

export default apiClient
