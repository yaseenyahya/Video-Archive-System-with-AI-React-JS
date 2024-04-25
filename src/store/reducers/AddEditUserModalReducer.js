import {
    ADD_EDIT_USER_MODAL_TOGGLE,
    ADD_EDIT_USER_MODAL_TYPE,
    ADD_EDIT_USER_MODAL_ROW_DATA,
    ADD_EDIT_USER_MODAL_AVATAR,
    ADD_EDIT_USER_MODAL_NAME,
    ADD_EDIT_USER_MODAL_EMAIL,
    ADD_EDIT_USER_MODAL_DESIGNATION_ID,
    ADD_EDIT_USER_MODAL_ROLE,
    ADD_EDIT_USER_MODAL_STATUS,
    ADD_EDIT_USER_MODAL_BLOCK_COMMENTS,
    ADD_EDIT_USER_MODAL_ALLOW_EDIT,
    ADD_EDIT_USER_MODAL_ALLOW_DOWNLOAD,
    ADD_EDIT_USER_MODAL_USERNAME,
    ADD_EDIT_USER_MODAL_COUNTRY_REGION,
    ADD_EDIT_USER_MODAL_CONTACT_NUMBER,
    ADD_EDIT_USER_MODAL_NEW_PASSWORD,
    ADD_EDIT_USER_MODAL_IS_LOADING,
    ADD_EDIT_USER_MODAL_ALLOW_FOLDERS_ID,
    ADD_EDIT_USER_MODAL_STARTUP_FOLDER,
    ADD_EDIT_USER_MODAL_RESET,
  } from '../actions/AddEditUserModalActions'; // Replace 'YourActionTypes' with the actual path to your action types
  
  const initialState = {
    addEditUserModalToggle: false,
    addEditUserModalType:null,
    addEditUserModalRowData:null,
    addEditUserModalAvatar: null,
    addEditUserModalName: "",
    addEditUserModalEmail: "",
    addEditUserModalDesignationId: undefined,
    addEditUserModalRole: undefined,
    addEditUserModalStatus: undefined,
    addEditUserModalBlockComments:"",
    addEditUserModalAllowEdit: true,
    addEditUserModalAllowDownload: true,
    addEditUserModalUsername: "",
    addEditUserModalCountryRegion: "PK",
    addEditUserModalContactNumber: "",
    addEditUserModalNewPassword: "",
    addEditUserModalAllowFoldersId : [],
    addEditUserModalStartupFolder:null,
    addEditUserModalIsLoading:false
  };
  
  const AddEditUserModalReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_EDIT_USER_MODAL_TOGGLE:
        return {
          ...state,
          addEditUserModalToggle: action.payload.addEditUserModalToggle,
        };
        case ADD_EDIT_USER_MODAL_TYPE:
          return {
            ...state,
            addEditUserModalType: action.payload.addEditUserModalType,
          };
        case ADD_EDIT_USER_MODAL_ROW_DATA:
        return {
          ...state,
          addEditUserModalRowData: action.payload.addEditUserModalRowData,
        };
      case ADD_EDIT_USER_MODAL_AVATAR:
        return {
          ...state,
          addEditUserModalAvatar: action.payload.addEditUserModalAvatar,
        };
      case ADD_EDIT_USER_MODAL_NAME:
        return {
          ...state,
          addEditUserModalName: action.payload.addEditUserModalName,
        };
      case ADD_EDIT_USER_MODAL_EMAIL:
        return {
          ...state,
          addEditUserModalEmail: action.payload.addEditUserModalEmail,
        };
      case ADD_EDIT_USER_MODAL_DESIGNATION_ID:
        return {
          ...state,
          addEditUserModalDesignationId: action.payload.addEditUserModalDesignationId,
        };
      case ADD_EDIT_USER_MODAL_ROLE:
        return {
          ...state,
          addEditUserModalRole: action.payload.addEditUserModalRole,
        };
      case ADD_EDIT_USER_MODAL_STATUS:
        return {
          ...state,
          addEditUserModalStatus: action.payload.addEditUserModalStatus,
        };
        case ADD_EDIT_USER_MODAL_BLOCK_COMMENTS:
          return {
            ...state,
            addEditUserModalBlockComments: action.payload.addEditUserModalBlockComments,
          };
      case ADD_EDIT_USER_MODAL_ALLOW_EDIT:
        return {
          ...state,
          addEditUserModalAllowEdit: action.payload.addEditUserModalAllowEdit,
        };
      case ADD_EDIT_USER_MODAL_ALLOW_DOWNLOAD:
        return {
          ...state,
          addEditUserModalAllowDownload: action.payload.addEditUserModalAllowDownload,
        };
      case ADD_EDIT_USER_MODAL_USERNAME:
        return {
          ...state,
          addEditUserModalUsername: action.payload.addEditUserModalUsername,
        };
      case ADD_EDIT_USER_MODAL_COUNTRY_REGION:
        return {
          ...state,
          addEditUserModalCountryRegion: action.payload.addEditUserModalCountryRegion,
        };
      case ADD_EDIT_USER_MODAL_CONTACT_NUMBER:
        return {
          ...state,
          addEditUserModalContactNumber: action.payload.addEditUserModalContactNumber,
        };
      case ADD_EDIT_USER_MODAL_NEW_PASSWORD:
        return {
          ...state,
          addEditUserModalNewPassword: action.payload.addEditUserModalNewPassword,
        };
        case ADD_EDIT_USER_MODAL_IS_LOADING:
          return {
            ...state,
            addEditUserModalIsLoading: action.payload.addEditUserModalIsLoading,
          };
          case ADD_EDIT_USER_MODAL_ALLOW_FOLDERS_ID:
            return {
              ...state,
              addEditUserModalAllowFoldersId: action.payload.addEditUserModalAllowFoldersId,
            };
            case ADD_EDIT_USER_MODAL_STARTUP_FOLDER:
              return {
                ...state,
                addEditUserModalStartupFolder: action.payload.addEditUserModalStartupFolder,
              };
      case ADD_EDIT_USER_MODAL_RESET:
        return initialState;
      default:
        return state;
    }
  };
  
  export default AddEditUserModalReducer; // Replace 'YourReducerName' with the actual name you want for your reducer
  