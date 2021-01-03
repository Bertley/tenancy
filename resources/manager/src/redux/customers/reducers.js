import actions from './actions'

const initialState = {
    customer: {}, 
    customers: [], 
}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE: 
            return { ...state, ...action.payload}
        default: 
            return state
    }
}