export const LOGIN_USERNAME_TEXT = "LOGIN_USERNAME_TEXT";
export const LOGIN_PASSWORD_TEXT = "LOGIN_PASSWORD_TEXT";
export const LOGIN_REMEMBER_ME = "LOGIN_REMEMBER_ME";
export const LOGIN_IS_LOADING = "LOGIN_IS_LOADING";
export const LOGIN_RESET = "LOGIN_RESET";

// Action Creators
export const setLoginUsernameText = (loginUsernameText) => {
  return {
    type: LOGIN_USERNAME_TEXT,
    payload: { loginUsernameText: loginUsernameText },
  };
};
export const setLoginPasswordText = (loginPasswordText) => {
    return {
      type: LOGIN_PASSWORD_TEXT,
      payload: { loginPasswordText: loginPasswordText },
    };
  };
  export const setLoginRememberMe = (loginRememberMe) => {
    return {
      type: LOGIN_REMEMBER_ME,
      payload: { loginRememberMe: loginRememberMe },
    };
  };
  export const setLoginIsLoading = (loginIsLoading) => {
    return {
      type: LOGIN_IS_LOADING,
      payload: { loginIsLoading: loginIsLoading },
    };
  };
  export const resetLogin = () => {
    return {
      type: LOGIN_RESET,
    
    };
  };
