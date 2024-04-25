import {
  ADD_EDIT_FOLDERS_PATH_MODAL_TOGGLE,
  ADD_EDIT_FOLDERS_PATH_MODAL_TYPE,
  ADD_EDIT_FOLDERS_PATH_MODAL_ROW_DATA,
  ADD_EDIT_FOLDERS_PATH_MODAL_PATH,
  ADD_EDIT_FOLDERS_PATH_MODAL_FOLDERNAME,
  ADD_EDIT_FOLDERS_PATH_MODAL_IS_LOADING,
  ADD_EDIT_FOLDERS_PATH_MODAL_RESET,
} from '../actions/AddEditFoldersPathModalActions';

const initialState = {
  addEditFoldersPathModalToggle: false,

  addEditFoldersPathModalType: null,
  addEditFoldersPathModalRowData: null,
  addEditFoldersPathModalPath: "", // Corrected this line
  addEditFoldersPathModalFolderName: "",
  addEditFoldersPathModalIsLoading: false,
};

const AddEditFoldersPathModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EDIT_FOLDERS_PATH_MODAL_TOGGLE: // Corrected this line
      return {
        ...state,
        addEditFoldersPathModalToggle: action.payload.addEditFoldersPathModalToggle, // Corrected this line
      };
 
    case ADD_EDIT_FOLDERS_PATH_MODAL_TYPE: // Corrected this line
      return {
        ...state,
        addEditFoldersPathModalType: action.payload.addEditFoldersPathModalType, // Corrected this line
      };
    case ADD_EDIT_FOLDERS_PATH_MODAL_ROW_DATA: // Corrected this line
      return {
        ...state,
        addEditFoldersPathModalRowData: action.payload.addEditFoldersPathModalRowData, // Corrected this line
      };
    case ADD_EDIT_FOLDERS_PATH_MODAL_PATH: // Corrected this line
      return {
        ...state,
        addEditFoldersPathModalPath: action.payload.addEditFoldersPathModalPath, // Corrected this line
      };
    case ADD_EDIT_FOLDERS_PATH_MODAL_FOLDERNAME: // Corrected this line
      return {
        ...state,
        addEditFoldersPathModalFolderName: action.payload.addEditFoldersPathModalFolderName, // Corrected this line
      };
    case ADD_EDIT_FOLDERS_PATH_MODAL_IS_LOADING: // Corrected this line
      return {
        ...state,
        addEditFoldersPathModalIsLoading: action.payload.addEditFoldersPathModalIsLoading, // Corrected this line
      };
    case ADD_EDIT_FOLDERS_PATH_MODAL_RESET: // Corrected this line
      return initialState;
    default:
      return state;
  }
};

export default AddEditFoldersPathModalReducer;
