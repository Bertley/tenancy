import apiClient from 'services/axios'
import store from 'store'
import { notification } from 'antd'

export async function login(username, password) {
  return apiClient
    .post('/auth/login/', {
      username,
      password,
    })
    .then(response => {
      console.log(response)
      if (response) {
        const { token } = response.data
        if (token) {
          if(response.data.user.is_staff) {
            store.set('accessToken', token)
            return response.data
          }
          notification.warning({
            message: "You don't not have admin access"
          })
        }
        return false
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function register(username, firstName, lastName, email, password) {
  return apiClient
    .post('/auth/register/', {
      "username": username, 
      "first_name": firstName, 
      "last_name": lastName, 
      "email": email,
      "password": password
    })
    .then(response => {
      console.log(response)
      if (response) {
        const { token } = response.data
        if (token) {
          store.set('accessToken', token)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function currentAccount() {
  const accessToken = store.get('accessToken')
  if(accessToken) {
    return apiClient
      .get('/auth')
      .then(response => {
        if (response) {
          response.data.role = (response.data.is_staff) ? "admin": null
          return response.data
        }
        return false
      })
      .catch(err => console.log(err))
  }
  return false
}

export async function logout() {
  return apiClient
    .get('/auth/logout')
    .then(() => {
      store.remove('accessToken')
      return true
    })
    .catch(err => console.log(err))
}


export async function loadAllProducts() {
  return apiClient
    .get('/api/products')
    .then(response => {
      return response.data
    })
    .catch(err => console.log(err))
}

export async function loadProduct(slug) {
  return apiClient
    .get(`/api/products/${slug}`)
    .then(response => {
      return response.data
    })
    .catch(err => console.log(err))
}

export async function createProduct(product) {
  return apiClient
    .post('/api/manage/products/', {
      ...product
    })
    .then(response => {
      return response.data
    })
    .catch(err => console.log(err))
}

export async function updateProduct(slug, product) {
  return apiClient
    .put(`/api/manage/products/${slug}`, {
      ...product
    })
    .then(response => {
      return response.data
    })
    .catch(err => console.log(err))
}

export async function deleteProduct(slug) {
  return apiClient
    .delete(`/api/manage/products/${slug}`)
    .then(response => {
      return response.status
    })
    .catch(err => console.log(err))
}