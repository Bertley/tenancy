import {
    LOGIN_REQUESTING,
} from './constants'; 

// In order to perform an action of type LOGIN_REQUESTING
// we need an username and password
const loginRequest = function loginRequest ({ username, password })  {
    console.log(username)
    return {
        type: LOGIN_REQUESTING, 
        username, 
        password, 
    }
}

// Since it's the only one here
export default loginRequest; 