export const ADD_EDIT_FOLDERS_PATH_MODAL_TOGGLE = "ADD_EDIT_FOLDERS_PATH_MODAL_TOGGLE";
export const ADD_EDIT_FOLDERS_PATH_MODAL_TYPE = "ADD_EDIT_FOLDERS_PATH_MODAL_TYPE";
export const ADD_EDIT_FOLDERS_PATH_MODAL_ROW_DATA = "ADD_EDIT_FOLDERS_PATH_MODAL_ROW_DATA";
export const ADD_EDIT_FOLDERS_PATH_MODAL_PATH = "ADD_EDIT_FOLDERS_PATH_MODAL_PATH";
export const ADD_EDIT_FOLDERS_PATH_MODAL_FOLDERNAME = "ADD_EDIT_FOLDERS_PATH_MODAL_FOLDERNAME";
export const ADD_EDIT_FOLDERS_PATH_MODAL_IS_LOADING = "ADD_EDIT_FOLDERS_PATH_MODAL_IS_LOADING";
export const ADD_EDIT_FOLDERS_PATH_MODAL_RESET = "ADD_EDIT_FOLDERS_PATH_MODAL_RESET";

export const setAddEditFoldersPathModalToggle = (addEditFoldersPathModalToggle) => ({
  type: ADD_EDIT_FOLDERS_PATH_MODAL_TOGGLE,
  payload: { addEditFoldersPathModalToggle: addEditFoldersPathModalToggle },
});

export const setAddEditFoldersPathModalType = (addEditFoldersPathModalType) => ({
  type: ADD_EDIT_FOLDERS_PATH_MODAL_TYPE,
  payload: { addEditFoldersPathModalType: addEditFoldersPathModalType },
});

export const setAddEditFoldersPathModalRowData = (addEditFoldersPathModalRowData) => ({
  type: ADD_EDIT_FOLDERS_PATH_MODAL_ROW_DATA,
  payload: { addEditFoldersPathModalRowData: addEditFoldersPathModalRowData },
});

export const setAddEditFoldersPathModalPath = (addEditFoldersPathModalPath) => ({
  type: ADD_EDIT_FOLDERS_PATH_MODAL_PATH,
  payload: { addEditFoldersPathModalPath: addEditFoldersPathModalPath },
});
export const setAddEditFoldersPathModalFolderName = (addEditFoldersPathModalFolderName) => ({
  type: ADD_EDIT_FOLDERS_PATH_MODAL_FOLDERNAME,
  payload: { addEditFoldersPathModalFolderName: addEditFoldersPathModalFolderName },
});
export const setAddEditFoldersPathModalIsLoading = (addEditFoldersPathModalIsLoading) => ({
  type: ADD_EDIT_FOLDERS_PATH_MODAL_IS_LOADING,
  payload: { addEditFoldersPathModalIsLoading: addEditFoldersPathModalIsLoading },
});

export const setAddEditFoldersPathModalReset = () => ({
  type: ADD_EDIT_FOLDERS_PATH_MODAL_RESET,
});
