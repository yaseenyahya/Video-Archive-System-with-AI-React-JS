export const PROFILE_PICTURE_MENU_ANCHOR_EL = "PROFILE_PICTURE_MENU_ANCHOR_EL";
export const DRAWER_TOGGLE = "DRAWER_TOGGLE";
export const APP_BAR_HEIGHT = "APP_BAR_HEIGHT";
export const WINDOW_HEIGHT = "WINDOW_HEIGHT";
export const FOLDERS_LIST_MENU = "FOLDERS_LIST_MENU";
export const ALL_FOLDERS_DETAILS = "ALL_FOLDERS_DETAILS";
export const FOLDERS_MENU_BOTTOM_HEIGHT = "FOLDERS_MENU_BOTTOM_HEIGHT";
export const SUBSCRIPTION_CONNECTED = "SUBSCRIPTION_CONNECTED";
export const CONFIG_DATA = "CONFIG_DATA";
// Action Creators
export const setProfilePictureMenuAnchorEl = (profilePictureMenuAnchorEl) => {
  return {
    type: PROFILE_PICTURE_MENU_ANCHOR_EL,
    payload: { profilePictureMenuAnchorEl: profilePictureMenuAnchorEl },
  };
};
export const setAppBarHeight = (appBarHeight) => {
  return {
    type: APP_BAR_HEIGHT,
    payload: { appBarHeight: appBarHeight },
  };
};
export const setDrawerToggle = (drawerToggle) => {
    return {
      type: DRAWER_TOGGLE,
      payload: { drawerToggle: drawerToggle },
    };
  };
  export const setWindowHeight = (windowHeight) => {
    return {
      type: WINDOW_HEIGHT,
      payload: { windowHeight: windowHeight },
    };
  };
  export const setFoldersListMenu = (foldersListMenu) => {
    return {
      type: FOLDERS_LIST_MENU,
      payload: { foldersListMenu: foldersListMenu },
    };
  };
  export const setAllFoldersDetails = (allFoldersDetails) => {
    return {
      type: ALL_FOLDERS_DETAILS,
      payload: { allFoldersDetails: allFoldersDetails },
    };
  };
  export const setFoldersMenuBottomHeight = (foldersMenuBottomHeight) => {
    return {
      type: FOLDERS_MENU_BOTTOM_HEIGHT,
      payload: { foldersMenuBottomHeight: foldersMenuBottomHeight },
    };
  };
  export const setSubscriptionConnected = (subscriptionConnected) => {
    return {
      type: SUBSCRIPTION_CONNECTED,
      payload: { subscriptionConnected: subscriptionConnected },
    };
  };
  export const setConfigData = (configData) => {
    return {
      type: CONFIG_DATA,
      payload: { configData: configData },
    };
  };