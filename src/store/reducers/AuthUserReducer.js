// authReducer.js

import {
    AUTH_USER_USERNAME,
    AUTH_USER_PASSWORD,
    AUTH_USER_ID,
    AUTH_USER_DESIGNATION_NAME,
    AUTH_USER_DESIGNATION_ID,
    AUTH_USER_ROLE,
    AUTH_USER_NAME,
    AUTH_USER_AVATAR,
    AUTH_USER_SETTINGS_JSON,
    AUTH_USER_SETTINGS_SHOW_MODAL_INSTED_DRAWER,
    AUTH_USER_RESET
} from '../actions/AuthUserActions';

const initialState = {
    authUserUsername: null,
    authUserPassword: null,
    authUserId: null,
    authUserDesignationName: null,
    authUserDesignationId: null,
    authUserRole: null,
    authUserName: null,
    authUserAvatar: null,
    authUserSettingsJson: null,
    authUserSettingsShowModalInstedDrawer:true
};

const AuthUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER_USERNAME:
            return {
                ...state,
                authUserUsername: action.payload.authUserUsername
            };
        case AUTH_USER_PASSWORD:
            return {
                ...state,
                authUserPassword: action.payload.authUserPassword
            };
        case AUTH_USER_ID:
            return {
                ...state,
                authUserId: action.payload.authUserId
            };
        case AUTH_USER_DESIGNATION_NAME:
            return {
                ...state,
                authUserDesignationName: action.payload.authUserDesignationName
            };
        case AUTH_USER_DESIGNATION_ID:
            return {
                ...state,
                authUserDesignationId: action.payload.authUserDesignationId
            };
        case AUTH_USER_ROLE:
            return {
                ...state,
                authUserRole: action.payload.authUserRole
            };

        case AUTH_USER_NAME:
            return {
                ...state,
                authUserName: action.payload.authUserName
            };
        case AUTH_USER_AVATAR:
            return {
                ...state,
                authUserAvatar: action.payload.authUserAvatar
            };
        case AUTH_USER_SETTINGS_JSON:
            return {
                ...state,
                authUserSettingsJson: action.payload.authUserSettingsJson
            };
            case AUTH_USER_SETTINGS_SHOW_MODAL_INSTED_DRAWER:
                return {
                    ...state,
                    authUserSettingsShowModalInstedDrawer: action.payload.authUserSettingsShowModalInstedDrawer
                };
        case AUTH_USER_RESET:
            return initialState;
        default:
            return state;
    }
};

export default AuthUserReducer;
