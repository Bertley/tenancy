import { all, takeEvery, put, call, select } from 'redux-saga/effects'
// import { notification } from 'antd'
import { history } from 'index'
import * as firebase from 'services/firebase'
import * as jwt from 'services/jwt'
import actions from './actions'

const mapAuthProviders = {
    firebase: {
        login: firebase.login,
        register: firebase.register,
        currentAccount: firebase.currentAccount,
        logout: firebase.logout,
    },
    jwt: {
        login: jwt.login,
        register: jwt.register,
        currentAccount: jwt.currentAccount,
        loadAllProducts: jwt.loadAllProducts, 
        loadProduct: jwt.loadProduct, 
        createProduct: jwt.createProduct,
        updateProduct: jwt.updateProduct, 
        deleteProduct: jwt.deleteProduct, 
        logout: jwt.logout,
    },
}
  

export function* LOAD_ALL_PRODUCTS() {
    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: true
        }
    })

    const {authProvider} = yield select(state => state.settings)
    const response = yield call (mapAuthProviders[authProvider].loadAllProducts, actions.payload)

    console.log(response)

    if(response) {
        const products = response
        yield put({
            type: 'products/SET_STATE', 
            payload: {
                products
            }, 
        })
    }
    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: false
        }
    })
}

export function* LOAD_PRODUCT({payload}) {
    const {slug} = payload

    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: true
        }
    })


    const {authProvider} = yield select(state => state.settings)
    const product = yield call (mapAuthProviders[authProvider].loadProduct, slug)
    if(product) {
        yield put({
            type: 'products/SET_STATE', 
            payload: {
                product
            }, 
        })
    }
    
    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: false
        }
    })
}

export function* CREATE_PRODUCT({payload}) {
    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: true
        }
    })

    const {authProvider} = yield select(state => state.settings)
    const product = yield call (mapAuthProviders[authProvider].createProduct, payload)

    if(product) {
        yield put({
            type: 'products/SET_STATE', 
            payload: {
                product
            }, 
        })
        
        yield history.push(`/products/${product.id}`)
    }
    
    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: false
        }
    })
}

export function* UPDATE_PRODUCT({payload}) {
    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: true
        }
    })

    const {slug, values} = payload
    const {authProvider} = yield select(state => state.settings)
    const product = yield call(mapAuthProviders[authProvider].updateProduct, slug, values)

    if(product) {
        yield put({
            type: 'products/SET_STATE', 
            payload: {
                product
            }
        })

        yield history.push(`/products/${product.id}`)
    }

    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: false
        }
    })
}

export function* DELETE_PRODUCT({payload}) {
    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: true
        }
    })

    const {slug} = payload
    const {authProvider} = yield select(state => state.settings)
    const status = yield call(mapAuthProviders[authProvider].deleteProduct, slug)

    if(status === 204) {
        yield history.push(`/products`)
    }

    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: false
        }
    })
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.LOAD_ALL_PRODUCTS, LOAD_ALL_PRODUCTS), 
        takeEvery(actions.LOAD_PRODUCT, LOAD_PRODUCT), 
        takeEvery(actions.CREATE_PRODUCT, CREATE_PRODUCT), 
        takeEvery(actions.UPDATE_PRODUCT, UPDATE_PRODUCT), 
        takeEvery(actions.DELETE_PRODUCT, DELETE_PRODUCT), 
    ])
}