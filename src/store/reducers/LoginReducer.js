// authReducer.js

import {
    LOGIN_USERNAME_TEXT,
    LOGIN_PASSWORD_TEXT,
    LOGIN_REMEMBER_ME,
    LOGIN_IS_LOADING,
    LOGIN_RESET
} from '../actions/LoginActions';

const initialState = {
    loginUsernameText: '',
    loginPasswordText: '',
    loginIsLoading: false,
    loginRememberMe:false
};

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USERNAME_TEXT:
            return {
                ...state,
                loginUsernameText: action.payload.loginUsernameText
            };
        case LOGIN_PASSWORD_TEXT:
            return {
                ...state,
                loginPasswordText: action.payload.loginPasswordText
            };
            case LOGIN_REMEMBER_ME:
                return {
                    ...state,
                    loginRememberMe: action.payload.loginRememberMe
                };
        case LOGIN_IS_LOADING:
            return {
                ...state,
                loginIsLoading: action.payload.loginIsLoading
            };
        case LOGIN_RESET:
            return initialState;
        default:
            return state;
    }
};

export default LoginReducer;
