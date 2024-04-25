import {
  FILES_DOWNLOAD_HISTORY_ITEMS,
  FILES_DOWNLOAD_HISTORY_ARCHIVE_DATE_FROM,
  FILES_DOWNLOAD_HISTORY_ARCHIVE_DATE_TO,
  FILES_DOWNLOAD_HISTORY_ARCHIVE_SEARCH_TEXT,
  FILES_DOWNLOAD_HISTORY_USER_MODAL_TOGGLE,
  FILES_DOWNLOAD_HISTORY_RESET,
} from '../actions/FileDownloadHistoryActions'; // Import your action types

const initialState = {
  filesDownloadHistoryItems: null,
  filesDownloadHistoryArchiveDateFrom: null,
  filesDownloadHistoryArchiveDateTo: null,
  filesDownloadHistoryArchiveSearchText: "",
  filesDownloadHistoryUserModalToggle:false
};

const FilesDownloadHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILES_DOWNLOAD_HISTORY_ITEMS:
      return {
        ...state,
        filesDownloadHistoryItems: action.payload.filesDownloadHistoryItems,
      };
    case FILES_DOWNLOAD_HISTORY_ARCHIVE_DATE_FROM:
      return {
        ...state,
        filesDownloadHistoryArchiveDateFrom: action.payload.filesDownloadHistoryArchiveDateFrom,
      };
    case FILES_DOWNLOAD_HISTORY_ARCHIVE_DATE_TO:
      return {
        ...state,
        filesDownloadHistoryArchiveDateTo: action.payload.filesDownloadHistoryArchiveDateTo,
      };
    case FILES_DOWNLOAD_HISTORY_ARCHIVE_SEARCH_TEXT:
      return {
        ...state,
        filesDownloadHistoryArchiveSearchText: action.payload.filesDownloadHistoryArchiveSearchText,
      };
      case FILES_DOWNLOAD_HISTORY_USER_MODAL_TOGGLE:
        return {
          ...state,
          filesDownloadHistoryUserModalToggle: action.payload.filesDownloadHistoryUserModalToggle,
        };
    case FILES_DOWNLOAD_HISTORY_RESET:
      return initialState;
    default:
      return state;
  }
};

export default FilesDownloadHistoryReducer;
