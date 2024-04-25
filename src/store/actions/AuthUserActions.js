export const AUTH_USER_USERNAME = "AUTH_USER_USERNAME";
export const AUTH_USER_PASSWORD = "AUTH_USER_PASSWORD";
export const AUTH_USER_ID = "AUTH_USER_ID";
export const AUTH_USER_DESIGNATION_NAME = "AUTH_USER_DESIGNATION_NAME";
export const AUTH_USER_DESIGNATION_ID = "AUTH_USER_DESIGNATION_ID";
export const AUTH_USER_ROLE = "AUTH_USER_ROLE";
export const AUTH_USER_NAME = "AUTH_USER_NAME";
export const AUTH_USER_AVATAR = "AUTH_USER_AVATAR";
export const AUTH_USER_SETTINGS_JSON = "AUTH_USER_SETTINGS_JSON";
export const AUTH_USER_SETTINGS_SHOW_MODAL_INSTED_DRAWER = "AUTH_USER_SETTINGS_SHOW_MODAL_INSTED_DRAWER";
export const AUTH_USER_RESET = "AUTH_USER_RESET";

// Action Creators
export const setAuthUserUsername = (authUserUsername) => {
  return {
    type: AUTH_USER_USERNAME,
    payload: { authUserUsername: authUserUsername },
  };
};
export const setAuthUserPassword = (authUserPassword) => {
    return {
      type: AUTH_USER_PASSWORD,
      payload: { authUserPassword: authUserPassword },
    };
  };
  export const setAuthUserId = (authUserId) => {
    return {
      type: AUTH_USER_ID,
      payload: { authUserId: authUserId },
    };
  };
  export const setAuthUserDesignationName = (authUserDesignationName) => {
    return {
      type: AUTH_USER_DESIGNATION_NAME,
      payload: { authUserDesignationName: authUserDesignationName },
    };
  };
  export const setAuthUserDesignationId = (authUserDesignationId) => {
    return {
      type: AUTH_USER_DESIGNATION_ID,
      payload: { authUserDesignationId: authUserDesignationId },
    };
  };
  export const setAuthUserRole = (authUserRole) => {
    return {
      type: AUTH_USER_ROLE,
      payload: { authUserRole: authUserRole },
    };
  };
  export const setAuthUserName = (authUserName) => {
    return {
      type: AUTH_USER_NAME,
      payload: { authUserName: authUserName },
    };
  };
  export const setAuthUserAvatar = (authUserAvatar) => {
    return {
      type: AUTH_USER_AVATAR,
      payload: { authUserAvatar: authUserAvatar },
    };
  };
  export const setAuthUserSettingsJson = (authUserSettingsJson) => {
    return {
      type: AUTH_USER_SETTINGS_JSON,
      payload: { authUserSettingsJson: authUserSettingsJson },
    };
  };
  export const setAuthUserSettingsShowModalInstedDrawer = (authUserSettingsShowModalInstedDrawer) => {
    return {
      type: AUTH_USER_SETTINGS_SHOW_MODAL_INSTED_DRAWER,
      payload: { authUserSettingsShowModalInstedDrawer: authUserSettingsShowModalInstedDrawer },
    };
  };
  
  export const resetAuthUser = () => {
    return {
      type: AUTH_USER_RESET,
    
    };
  };
