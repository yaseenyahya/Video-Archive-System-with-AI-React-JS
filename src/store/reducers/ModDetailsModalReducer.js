// authReducer.js

import {
    MOD_DETAILS_MODAL_TOGGLE,
    MOD_DETAILS_MODAL_DATA,
    MOD_DETAILS_MODAL_NEXT_PREVIOUS_INDEX,
    MOD_DETAILS_MODAL_DETAILS_TEXT,
    MOD_DETAILS_MODAL_TITLE_TEXT,
    MOD_DETAILS_MODAL_CORRECTION_COUNT,
    MOD_DETAILS_MODAL_VIEW_HISTORY_TOGGLE,
    MOD_DETAILS_MODAL_RESET
} from '../actions/ModDetailsModalActions';

const initialState = {
    modDetailsModalToggle: false,
    modDetailsModalData: [],
    modDetailsModalNextPreviousIndex: 0,
    modDetailsModalDetailsText: "",
    modDetailsModalTitleText: "",
    modDetailsModalCorrectionCount:0,
    modDetailsModalViewHistoryToggle:false
};

const ModDetailsModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOD_DETAILS_MODAL_TOGGLE:
            return {
                ...state,
                modDetailsModalToggle: action.payload.modDetailsModalToggle
            };
        case MOD_DETAILS_MODAL_DATA:
            return {
                ...state,
                modDetailsModalData: action.payload.modDetailsModalData
            };
        case MOD_DETAILS_MODAL_NEXT_PREVIOUS_INDEX:
            return {
                ...state,
                modDetailsModalNextPreviousIndex: action.payload.modDetailsModalNextPreviousIndex
            };
        case MOD_DETAILS_MODAL_DETAILS_TEXT:
            return {
                ...state,
                modDetailsModalDetailsText: action.payload.modDetailsModalDetailsText
            };
        case MOD_DETAILS_MODAL_TITLE_TEXT:
            return {
                ...state,
                modDetailsModalTitleText: action.payload.modDetailsModalTitleText
            };
            case MOD_DETAILS_MODAL_CORRECTION_COUNT:
                return {
                    ...state,
                    modDetailsModalCorrectionCount: action.payload.modDetailsModalCorrectionCount
                };
                case MOD_DETAILS_MODAL_VIEW_HISTORY_TOGGLE:
                    return {
                        ...state,
                        modDetailsModalViewHistoryToggle: action.payload.modDetailsModalViewHistoryToggle
                    };
        case MOD_DETAILS_MODAL_RESET:
            return initialState;
        default:
            return state;
    }
};

export default ModDetailsModalReducer;
