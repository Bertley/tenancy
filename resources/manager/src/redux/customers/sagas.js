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
        loadAllCustomers: jwt.loadAllCustomers, 
        loadCustomer: jwt.loadCustomer, 
        createCustomer: jwt.createCustomer,
        updateCustomer: jwt.updateCustomer, 
        deleteCustomer: jwt.deleteCustomer, 
        logout: jwt.logout,
    },
}
  

export function* LOAD_ALL_CUSTOMERS() {
    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: true
        }
    })

    const {authProvider} = yield select(state => state.settings)
    const response = yield call (mapAuthProviders[authProvider].loadAllCustomers, actions.payload)

    console.log(response)

    if(response) {
        const customers = response
        yield put({
            type: 'customers/SET_STATE', 
            payload: {
                customers
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

export function* LOAD_CUSTOMER({payload}) {
    const {slug} = payload

    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: true
        }
    })


    const {authProvider} = yield select(state => state.settings)
    const customer = yield call (mapAuthProviders[authProvider].loadCustomer, slug)
    if(customer) {
        yield put({
            type: 'customers/SET_STATE', 
            payload: {
                customer
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

export function* CREATE_CUSTOMER({payload}) {
    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: true
        }
    })

    const {authProvider} = yield select(state => state.settings)
    const customer = yield call (mapAuthProviders[authProvider].createCustomer, payload)

    if(product) {
        yield put({
            type: 'products/SET_STATE', 
            payload: {
                customer
            }, 
        })
        
        yield history.push(`/customers/${customer.id}`)
    }
    
    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: false
        }
    })
}

export function* UPDATE_CUSTOMER({payload}) {
    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: true
        }
    })

    const {slug, values} = payload
    const {authProvider} = yield select(state => state.settings)
    const customer = yield call(mapAuthProviders[authProvider].updateCustomer, slug, values)

    if(customer) {
        yield put({
            type: 'customers/SET_STATE', 
            payload: {
                customer
            }
        })

        yield history.push(`/customers/${customer.id}`)
    }

    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: false
        }
    })
}

export function* DELETE_CUSTOMER({payload}) {
    yield put({
        type: 'user/SET_STATE', 
        payload: {
            loading: true
        }
    })

    const {slug} = payload
    const {authProvider} = yield select(state => state.settings)
    const status = yield call(mapAuthProviders[authProvider].deleteCustomer, slug)

    if(status === 204) {
        yield history.push(`/customers`)
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
        takeEvery(actions.LOAD_ALL_CUSTOMERS, LOAD_ALL_CUSTOMERS), 
        takeEvery(actions.LOAD_CUSTOMER, LOAD_CUSTOMER), 
        takeEvery(actions.CREATE_CUSTOMER, CREATE_CUSTOMER), 
        takeEvery(actions.UPDATE_CUSTOMER, UPDATE_CUSTOMER), 
        takeEvery(actions.DELETE_CUSTOMER, DELETE_CUSTOMER), 
    ])
}