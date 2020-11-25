import actions from './actions'

const initialState = {
    product: {}, 
    products: [], 
    loading: false, 
}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE: 
            return { ...state, ...action.payload}
        default: 
            return state
    }
}