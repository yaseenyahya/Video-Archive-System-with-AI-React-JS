export const ADD_EDIT_DESIGNATION_MODAL_TOGGLE = "ADD_EDIT_DESIGNATION_MODAL_TOGGLE";
export const ADD_EDIT_DESIGNATION_MODAL_TYPE = "ADD_EDIT_DESIGNATION_MODAL_TYPE";
export const ADD_EDIT_DESIGNATION_MODAL_ROW_DATA = "ADD_EDIT_DESIGNATION_MODAL_ROW_DATA";
export const ADD_EDIT_DESIGNATION_MODAL_DESIGNATION_NAME =
  "ADD_EDIT_DESIGNATION_MODAL_DESIGNATION_NAME";
  export const ADD_EDIT_DESIGNATION_MODAL_IS_LOADING =
  "ADD_EDIT_DESIGNATION_MODAL_IS_LOADING";
export const ADD_EDIT_DESIGNATION_MODAL_RESET = "ADD_EDIT_DESIGNATION_MODAL_RESET";

export const setAddEditDesignationModalToggle = (addEditDesignationModalToggle ) => ({
  type: ADD_EDIT_DESIGNATION_MODAL_TOGGLE,
  payload: { addEditDesignationModalToggle:addEditDesignationModalToggle },
});
export const setAddEditDesignationModalType = (addEditDesignationModalType) => ({
  type: ADD_EDIT_DESIGNATION_MODAL_TYPE,
  payload: { addEditDesignationModalType: addEditDesignationModalType },
});

export const setAddEditDesignationModalRowData = (addEditDesignationModalRowData) => ({
  type: ADD_EDIT_DESIGNATION_MODAL_ROW_DATA,
  payload: { addEditDesignationModalRowData: addEditDesignationModalRowData },
});

export const setAddEditDesignationModalDesignationName = (addEditDesignationModalDesignationName) => ({
  type: ADD_EDIT_DESIGNATION_MODAL_DESIGNATION_NAME,
  payload: { addEditDesignationModalDesignationName: addEditDesignationModalDesignationName },
});

export const setAddEditDesignationModalIsLoading = (addEditDesignationModalIsLoading) => ({
  type: ADD_EDIT_DESIGNATION_MODAL_IS_LOADING,
  payload: { addEditDesignationModalIsLoading: addEditDesignationModalIsLoading },
});
export const setAddEditDesignationModalReset = () => ({
  type: ADD_EDIT_DESIGNATION_MODAL_RESET,
});


