export const EDIT_PROFILE_MODAL_TOGGLE =
  "EDIT_PROFILE_MODAL_TOGGLE";
  export const EDIT_PROFILE_MODAL_AVATAR =
  "EDIT_PROFILE_MODAL_AVATAR";
export const EDIT_PROFILE_MODAL_NAME =
  "EDIT_PROFILE_MODAL_NAME";
export const EDIT_PROFILE_MODAL_EMAIL =
  "EDIT_PROFILE_MODAL_EMAIL";
export const EDIT_PROFILE_MODAL_USERNAME =
  "EDIT_PROFILE_MODAL_USERNAME";
  export const EDIT_PROFILE_MODAL_COUNTRY_REGION =
  "EDIT_PROFILE_MODAL_COUNTRY_REGION";
export const EDIT_PROFILE_MODAL_CONTACT_NUMBER =
  "EDIT_PROFILE_MODAL_CONTACT_NUMBER";
export const EDIT_PROFILE_MODAL_CURRENT_PASSWORD =
  "EDIT_PROFILE_MODAL_CURRENT_PASSWORD";
export const EDIT_PROFILE_MODAL_NEW_PASSWORD =
  "EDIT_PROFILE_MODAL_NEW_PASSWORD";
  export const EDIT_PROFILE_MODAL_IS_LOADING =
  "EDIT_PROFILE_MODAL_IS_LOADING";
export const EDIT_PROFILE_MODAL_RESET =
  "EDIT_PROFILE_MODAL_RESET";

export const setEditProfileModalToggle = (
  editProfileModalToggle
) => {
  return {
    type: EDIT_PROFILE_MODAL_TOGGLE,
    payload: {
      editProfileModalToggle: editProfileModalToggle,
    },
  };
};
export const setEditProfileModalAvatar = (
  editProfileModalAvatar
) => {
  return {
    type: EDIT_PROFILE_MODAL_AVATAR,
    payload: {
      editProfileModalAvatar: editProfileModalAvatar,
    },
  };
};
export const setEditProfileModalName = (
  editProfileModalName
) => {
  return {
    type: EDIT_PROFILE_MODAL_NAME,
    payload: {
      editProfileModalName: editProfileModalName,
    },
  };
};
export const setEditProfileModalEmail = (
  editProfileModalEmail
) => {
  return {
    type: EDIT_PROFILE_MODAL_EMAIL,
    payload: {
      editProfileModalEmail: editProfileModalEmail,
    },
  };
};
export const setEditProfileModalUsername = (editProfileModalUsername) => {
  return {
    type: EDIT_PROFILE_MODAL_USERNAME,
    payload: {
      editProfileModalUsername: editProfileModalUsername,
    },
  };
};
export const setEditProfileModalCountryRegion = (
  editProfileModalCountryRegion
) => {
  return {
    type: EDIT_PROFILE_MODAL_COUNTRY_REGION,
    payload: {
      editProfileModalCountryRegion: editProfileModalCountryRegion,
    },
  };
};
export const setEditProfileModalContactNumber = (
  editProfileModalContactNumber
) => {
  return {
    type: EDIT_PROFILE_MODAL_CONTACT_NUMBER,
    payload: {
      editProfileModalContactNumber: editProfileModalContactNumber,
    },
  };
};
export const setEditProfileModalCurrentPassword = (
  editProfileModalCurrentPassword
) => {
  return {
    type: EDIT_PROFILE_MODAL_CURRENT_PASSWORD,
    payload: {
      editProfileModalCurrentPassword: editProfileModalCurrentPassword,
    },
  };
};

export const setEditProfileModalNewPassword = (
  editProfileModalNewPassword
) => {
  return {
    type: EDIT_PROFILE_MODAL_NEW_PASSWORD,
    payload: {
      editProfileModalNewPassword: editProfileModalNewPassword,
    },
  };
};
export const setEditProfileModalIsLoading = (
  editProfileModalIsLoading
) => {
  return {
    type: EDIT_PROFILE_MODAL_IS_LOADING,
    payload: {
      editProfileModalIsLoading: editProfileModalIsLoading,
    },
  };
};

export const setEditProfileModalReset = () => {
  return {
    type: EDIT_PROFILE_MODAL_RESET,
  };
};
