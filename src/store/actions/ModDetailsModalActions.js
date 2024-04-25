export const MOD_DETAILS_MODAL_TOGGLE = "MOD_DETAILS_MODAL_TOGGLE";
export const MOD_DETAILS_MODAL_DATA = "MOD_DETAILS_MODAL_DATA";
export const MOD_DETAILS_MODAL_NEXT_PREVIOUS_INDEX = "MOD_DETAILS_MODAL_NEXT_PREVIOUS_INDEX";
export const MOD_DETAILS_MODAL_DETAILS_TEXT = "MOD_DETAILS_MODAL_DETAILS_TEXT";
export const MOD_DETAILS_MODAL_TITLE_TEXT = "MOD_DETAILS_MODAL_TITLE_TEXT";
export const MOD_DETAILS_MODAL_CORRECTION_COUNT = "MOD_DETAILS_MODAL_CORRECTION_COUNT";
export const MOD_DETAILS_MODAL_VIEW_HISTORY_TOGGLE = "MOD_DETAILS_MODAL_VIEW_HISTORY_TOGGLE";
export const MOD_DETAILS_MODAL_RESET= "MOD_DETAILS_MODAL_RESET";

export const setModDetailsModalToggle = (modDetailsModalToggle) => ({
  type: MOD_DETAILS_MODAL_TOGGLE,
  payload: { modDetailsModalToggle:modDetailsModalToggle },
});
export const setModDetailsModalData = (modDetailsModalData ) => ({
  type: MOD_DETAILS_MODAL_DATA,
  payload: { modDetailsModalData:modDetailsModalData },
});

export const setModDetailsModalNextPreviousIndex = (modDetailsModalNextPreviousIndex) => ({
  type: MOD_DETAILS_MODAL_NEXT_PREVIOUS_INDEX,
  payload: { modDetailsModalNextPreviousIndex:modDetailsModalNextPreviousIndex },
});

export const setModDetailsModalDetailsText = (modDetailsModalDetailsText) => ({
  type: MOD_DETAILS_MODAL_DETAILS_TEXT,
  payload: { modDetailsModalDetailsText:modDetailsModalDetailsText },
});

export const setModDetailsModalTitleText = (modDetailsModalTitleText) => ({
  type: MOD_DETAILS_MODAL_TITLE_TEXT,
  payload: { modDetailsModalTitleText:modDetailsModalTitleText },
});
export const setModDetailsModalCorrectionCount = (modDetailsModalCorrectionCount) => ({
  type: MOD_DETAILS_MODAL_CORRECTION_COUNT,
  payload: { modDetailsModalCorrectionCount:modDetailsModalCorrectionCount },
});
export const setModDetailsModalViewHistoryToggle = (modDetailsModalViewHistoryToggle) => ({
  type: MOD_DETAILS_MODAL_VIEW_HISTORY_TOGGLE,
  payload: { modDetailsModalViewHistoryToggle:modDetailsModalViewHistoryToggle },
});
export const setModDetailsModalReset = () => ({
  type: MOD_DETAILS_MODAL_RESET,
});


