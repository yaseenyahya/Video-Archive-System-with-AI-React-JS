import {
    FOLDER_FILES_MODAL_TOGGLE,
    FOLDER_FILES_MODAL_DATA,
    FOLDER_FILES_MODAL_RESET,
    
} from '../actions/FolderFilesModalActions';

const initialState = {
    folderFilesModalToggle: false,
    folderFilesModalData:null
};

const OtherReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLDER_FILES_MODAL_TOGGLE:
            return {
                ...state,
                folderFilesModalToggle: action.payload.folderFilesModalToggle
            };
            case FOLDER_FILES_MODAL_DATA:
                return {
                    ...state,
                    folderFilesModalData: action.payload.folderFilesModalData
                };
                case FOLDER_FILES_MODAL_RESET:
                    return initialState;          
            default:
                return state;
    }
};

export default OtherReducer;
