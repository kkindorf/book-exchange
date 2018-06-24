import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    UPDATE_PROFILE,
    GET_ADDRESS
} from '../actions/types';
export default function(state = {state: "", address: ""}, action) {
    switch(action.type){
        case AUTH_USER: 
            return {...state, error: '', authenticated: true};
        case UNAUTH_USER:
            return {...state, authenticated: false};
        case AUTH_ERROR:
            console.log(action.payload)
            return {...state, error: action.payload};
        case UPDATE_PROFILE:
            return {...state, state: action.payload.state, address: action.payload.address};
        case GET_ADDRESS:
            return {...state, state: action.payload.state, address: action.payload.address};
    }
    return state;
}