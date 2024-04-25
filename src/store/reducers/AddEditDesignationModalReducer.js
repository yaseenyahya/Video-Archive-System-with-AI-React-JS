import {
  ADD_EDIT_DESIGNATION_MODAL_TOGGLE,
  ADD_EDIT_DESIGNATION_MODAL_TYPE,
  ADD_EDIT_DESIGNATION_MODAL_ROW_DATA,
  ADD_EDIT_DESIGNATION_MODAL_DESIGNATION_NAME,
  ADD_EDIT_DESIGNATION_MODAL_IS_LOADING,
  ADD_EDIT_DESIGNATION_MODAL_RESET,
} from '../actions/AddEditDesignationModalActions';

const initialState = {
  addEditDesignationModalToggle: false,
  addEditDesignationModalType: null,
  addEditDesignationModalRowData: null,
  addEditDesignationModalDesignationName: "",
  addEditDesignationModalIsLoading: false,
};

const AddEditDesignationModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EDIT_DESIGNATION_MODAL_TOGGLE:
      return {
        ...state,
        addEditDesignationModalToggle: action.payload.addEditDesignationModalToggle,
      };
    case ADD_EDIT_DESIGNATION_MODAL_TYPE:
      return {
        ...state,
        addEditDesignationModalType: action.payload.addEditDesignationModalType,
      };
    case ADD_EDIT_DESIGNATION_MODAL_ROW_DATA:
      return {
        ...state,
        addEditDesignationModalRowData: action.payload.addEditDesignationModalRowData,
      };
    case ADD_EDIT_DESIGNATION_MODAL_DESIGNATION_NAME:
      return {
        ...state,
        addEditDesignationModalDesignationName: action.payload.addEditDesignationModalDesignationName,
      };
    case ADD_EDIT_DESIGNATION_MODAL_IS_LOADING:
      return {
        ...state,
        addEditDesignationModalIsLoading: action.payload.addEditDesignationModalIsLoading,
      };
    case ADD_EDIT_DESIGNATION_MODAL_RESET:
      return initialState;
    default:
      return state;
  }
};

export default AddEditDesignationModalReducer;
