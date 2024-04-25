export const FOLDER_FILES_MODAL_TOGGLE =
  "FOLDER_FILES_MODAL_TOGGLE";
  export const FOLDER_FILES_MODAL_DATA =
  "FOLDER_FILES_MODAL_DATA";
  export const FOLDER_FILES_MODAL_RESET =
  "FOLDER_FILES_MODAL_RESET";

export const setFolderFilesModalToggle = (folderFilesModalToggle) => {
  return {
    type: FOLDER_FILES_MODAL_TOGGLE,
    payload: { folderFilesModalToggle: folderFilesModalToggle },
  };
};
export const setFolderFilesModalData = (folderFilesModalData) => {
  return {
    type: FOLDER_FILES_MODAL_DATA,
    payload: { folderFilesModalData: folderFilesModalData },
  };
};

export const setFolderFilesModalReset = () => ({
  type: FOLDER_FILES_MODAL_RESET,
});

  