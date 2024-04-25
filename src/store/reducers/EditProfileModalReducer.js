// authReducer.js

import {
    EDIT_PROFILE_MODAL_TOGGLE,
    EDIT_PROFILE_MODAL_AVATAR,
    EDIT_PROFILE_MODAL_NAME,
    EDIT_PROFILE_MODAL_EMAIL,
    EDIT_PROFILE_MODAL_USERNAME,
    EDIT_PROFILE_MODAL_COUNTRY_REGION,
    EDIT_PROFILE_MODAL_CONTACT_NUMBER,
    EDIT_PROFILE_MODAL_CURRENT_PASSWORD,
    EDIT_PROFILE_MODAL_NEW_PASSWORD,
    EDIT_PROFILE_MODAL_IS_LOADING,
    EDIT_PROFILE_MODAL_RESET
} from '../actions/EditProfileModalActions';

const initialState = {
    editProfileModalToggle: false,
    editProfileModalAvatar: null,
    editProfileModalName: "",
    editProfileModalEmail: "",
    editProfileModalUsername: "",
    editProfileModalCountryRegion:"PK",
    editProfileModalContactNumber: "",
    editProfileModalCurrentPassword: "",
    editProfileModalNewPassword: "",
    editProfileModalIsLoading: false,
};

const EditProfileModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROFILE_MODAL_TOGGLE:
            return {
                ...state,
                editProfileModalToggle: action.payload.editProfileModalToggle
            };
        case EDIT_PROFILE_MODAL_AVATAR:
            return {
                ...state,
                editProfileModalAvatar: action.payload.editProfileModalAvatar
            };
        case EDIT_PROFILE_MODAL_NAME:
            return {
                ...state,
                editProfileModalName: action.payload.editProfileModalName
            };
        case EDIT_PROFILE_MODAL_EMAIL:
            return {
                ...state,
                editProfileModalEmail: action.payload.editProfileModalEmail
            };
        case EDIT_PROFILE_MODAL_USERNAME:
            return {
                ...state,
                editProfileModalUsername: action.payload.editProfileModalUsername
            };
        case EDIT_PROFILE_MODAL_COUNTRY_REGION:
            return {
                ...state,
                editProfileModalCountryRegion: action.payload.editProfileModalCountryRegion
            };

        case EDIT_PROFILE_MODAL_CONTACT_NUMBER:
            return {
                ...state,
                editProfileModalContactNumber: action.payload.editProfileModalContactNumber
            };
        case EDIT_PROFILE_MODAL_CURRENT_PASSWORD:
            return {
                ...state,
                editProfileModalCurrentPassword: action.payload.editProfileModalCurrentPassword
            };
        case EDIT_PROFILE_MODAL_NEW_PASSWORD:
            return {
                ...state,
                editProfileModalNewPassword: action.payload.editProfileModalNewPassword
            };
            case EDIT_PROFILE_MODAL_IS_LOADING:
                return {
                    ...state,
                    editProfileModalIsLoading: action.payload.editProfileModalIsLoading
                };
        case EDIT_PROFILE_MODAL_RESET:
            return initialState;
        default:
            return state;
    }
};

export default EditProfileModalReducer;
