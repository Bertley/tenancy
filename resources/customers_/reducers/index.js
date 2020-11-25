import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import client from '../client/reducer'
// import signup from '../pages/Signup/reducer'
import login from '../pages/Login/reducer'

const InitialState = {
  loggedin: false, 
  tenant: "january", 
  public: "business.localhost:8000", 
}

const app = (state=InitialState) => {
  return state
}  

const IndexReducer = combineReducers({
//   signup,
  app, 
  client,
  login,
  form,
//   widgets,
})

export default IndexReducer
