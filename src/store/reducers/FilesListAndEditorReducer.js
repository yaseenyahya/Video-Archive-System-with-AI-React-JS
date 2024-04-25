import {
  FILES_LIST_AND_EDITOR_DRAWER_TOGGLE,
  FILES_LIST_AND_EDITOR_DRAWER_LAST_DOWN_X,
  FILES_LIST_AND_EDITOR_DRAWER_IS_RESIZING,
  FILES_LIST_AND_EDITOR_DRAWER_WIDTH,
  FILES_LIST_AND_EDITOR_MODAL_TOGGLE,
  FILES_LIST_AND_EDITOR_SELECTED_FOLDER_ID,
  FILES_LIST_AND_EDITOR_SELECTED_FILE_ITEM,
  FILES_LIST_AND_EDITOR_INIT_VALUE_EDITOR,
  FILES_LIST_AND_EDITOR_QUICK_SEARCH_IDS,
  FILES_LIST_AND_EDITOR_QUICK_SEARCH_TEXT,
  FILES_LIST_AND_EDITOR_FILE_LIST_ITEMS,
  FILES_LIST_AND_EDITOR_FILE_LIST_SHOW_DELETED_ITEMS,
  FILES_LIST_AND_EDITOR_ARCHIVE_DATE_FROM,
  FILES_LIST_AND_EDITOR_ARCHIVE_DATE_TO,
  FILES_LIST_AND_EDITOR_ARCHIVE_SEARCH_TEXT,
  FILES_LIST_AND_EDITOR_ARCHIVE_FILE_LIST_ITEMS,

  FILES_LIST_AND_EDITOR_ALL_FOLDER_SEARCH_DATE_FROM,
  FILES_LIST_AND_EDITOR_ALL_FOLDER_DATE_TO,
  FILES_LIST_AND_EDITOR_ALL_FOLDER_SEARCH_TEXT,
  FILES_LIST_AND_EDITOR_ALL_FOLDER_FILE_LIST_ITEMS,

  FILES_LIST_AND_EDITOR_TOTAL_FILES_COUNT,
  FILES_LIST_AND_EDITOR_TOTAL_FILES_DURATION,
  FILES_LIST_AND_EDITOR_MOD_DETAILS,
  FILES_LIST_AND_EDITOR_MENU_ANCHOR_EL,
  FILES_LIST_AND_EDITOR_EXPORT_PDF,
  FILES_LIST_AND_EDITOR_EXPORT_EXCEL,
  FILES_LIST_AND_EDITOR_HTMLEDITOR_SCROLL_APPEARS,
  FILES_LIST_AND_EDITOR_RESET,
} from '../actions/FilesListAndEditorActions'; // Replace 'YourActionTypes' with the actual path to your action types

const initialState = {
  filesListAndEditorDrawerToggle: false,
  filesListAndEditorDrawerLastDownX: 0,
  filesListAndEditorDrawerIsResizing: false,
  filesListAndEditorDrawerWidth: 0,
  filesListAndEditorModalToggle:false,
  filesListAndEditorSelectedFolderId: null,
  filesListAndEditorSelectedFileItem: null,
  filesListAndEditorInitValueEditor:null,
  filesListAndEditorQuickSearchIds: [],
  filesListAndEditorQuickSearchText: '',
  filesListAndEditorFileListItems: [],
  filesListAndEditorFileListShowDeletedItems: false,
  filesListAndEditorArchiveDateFrom: null,
  filesListAndEditorArchiveDateTo: null,
  filesListAndEditorArchiveSearchText:null,
  filesListAndEditorArchiveFileListItems:null,

  filesListAndEditorAllFolderSearchDateFrom: null,
  filesListAndEditorAllFolderSearchDateTo: null,
  filesListAndEditorAllFolderSearchSearchText:null,
  filesListAndEditorAllFolderSearchFileListItems:null,

  filesListAndEditorTotalFilesCount: 0,
  filesListAndEditorMenuAnchorEl:null,
  filesListAndEditorTotalFilesDuration: 0,
  filesListAndEditorExportPdf:false,
  filesListAndEditorExportExcel:false,
  filesListAndEditorHTMLEditorScrollAppears:false
};

const FilesListAndEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILES_LIST_AND_EDITOR_DRAWER_TOGGLE:
      return {
        ...state,
        filesListAndEditorDrawerToggle: action.payload.filesListAndEditorDrawerToggle,
      };
    case FILES_LIST_AND_EDITOR_DRAWER_LAST_DOWN_X: // Corrected this line
      return {
        ...state,
        filesListAndEditorDrawerLastDownX: action.payload.filesListAndEditorDrawerLastDownX, // Corrected this line
      };
    case FILES_LIST_AND_EDITOR_DRAWER_IS_RESIZING: // Corrected this line
      return {
        ...state,
        filesListAndEditorDrawerIsResizing: action.payload.filesListAndEditorDrawerIsResizing, // Corrected this line
      };
    case FILES_LIST_AND_EDITOR_DRAWER_WIDTH: // Corrected this line
      return {
        ...state,
        filesListAndEditorDrawerWidth: action.payload.filesListAndEditorDrawerWidth, // Corrected this line
      };
      case FILES_LIST_AND_EDITOR_MODAL_TOGGLE: // Corrected this line
      return {
        ...state,
        filesListAndEditorModalToggle: action.payload.filesListAndEditorModalToggle, // Corrected this line
      };
    case FILES_LIST_AND_EDITOR_SELECTED_FOLDER_ID: // Corrected this line
      return {
        ...state,
        filesListAndEditorSelectedFolderId: action.payload.filesListAndEditorSelectedFolderId, // Corrected this line
      };
    case FILES_LIST_AND_EDITOR_SELECTED_FILE_ITEM:
      return {
        ...state,
        filesListAndEditorSelectedFileItem: action.payload.filesListAndEditorSelectedFileItem,
      };
      case FILES_LIST_AND_EDITOR_INIT_VALUE_EDITOR:
        return {
          ...state,
          filesListAndEditorInitValueEditor: action.payload.filesListAndEditorInitValueEditor,
        };
    case FILES_LIST_AND_EDITOR_QUICK_SEARCH_IDS:
      return {
        ...state,
        filesListAndEditorQuickSearchIds: action.payload.filesListAndEditorQuickSearchIds,
      };
    case FILES_LIST_AND_EDITOR_QUICK_SEARCH_TEXT:
      return {
        ...state,
        filesListAndEditorQuickSearchText: action.payload.filesListAndEditorQuickSearchText,
      };
    case FILES_LIST_AND_EDITOR_FILE_LIST_ITEMS:
      return {
        ...state,
        filesListAndEditorFileListItems: action.payload.filesListAndEditorFileListItems,
      };
    case FILES_LIST_AND_EDITOR_FILE_LIST_SHOW_DELETED_ITEMS:
      return {
        ...state,
        filesListAndEditorFileListShowDeletedItems: action.payload.filesListAndEditorFileListShowDeletedItems,
      };
    case FILES_LIST_AND_EDITOR_ARCHIVE_DATE_FROM:
      return {
        ...state,
        filesListAndEditorArchiveDateFrom: action.payload.filesListAndEditorArchiveDateFrom,
      };
    case FILES_LIST_AND_EDITOR_ARCHIVE_DATE_TO:
      return {
        ...state,
        filesListAndEditorArchiveDateTo: action.payload.filesListAndEditorArchiveDateTo,
      };
      case FILES_LIST_AND_EDITOR_ARCHIVE_SEARCH_TEXT:
        return {
          ...state,
          filesListAndEditorArchiveSearchText: action.payload.filesListAndEditorArchiveSearchText,
        };
        case FILES_LIST_AND_EDITOR_ARCHIVE_FILE_LIST_ITEMS:
          return {
            ...state,
            filesListAndEditorArchiveFileListItems: action.payload.filesListAndEditorArchiveFileListItems,
          };

          

          case FILES_LIST_AND_EDITOR_ALL_FOLDER_SEARCH_DATE_FROM:
            return {
              ...state,
              filesListAndEditorAllFolderSearchDateFrom: action.payload.filesListAndEditorAllFolderSearchDateFrom,
            };
          case FILES_LIST_AND_EDITOR_ALL_FOLDER_DATE_TO:
            return {
              ...state,
              filesListAndEditorAllFolderSearchDateTo: action.payload.filesListAndEditorAllFolderSearchDateTo,
            };
            case FILES_LIST_AND_EDITOR_ALL_FOLDER_SEARCH_TEXT:
              return {
                ...state,
                filesListAndEditorAllFolderSearchSearchText: action.payload.filesListAndEditorAllFolderSearchSearchText,
              };
              case FILES_LIST_AND_EDITOR_ALL_FOLDER_FILE_LIST_ITEMS:
                return {
                  ...state,
                  filesListAndEditorAllFolderSearchFileListItems: action.payload.filesListAndEditorAllFolderSearchFileListItems,
                };


         
    case FILES_LIST_AND_EDITOR_TOTAL_FILES_COUNT:
      return {
        ...state,
        filesListAndEditorTotalFilesCount: action.payload.filesListAndEditorTotalFilesCount,
      };
    case FILES_LIST_AND_EDITOR_TOTAL_FILES_DURATION:
      return {
        ...state,
        filesListAndEditorTotalFilesDuration: action.payload.filesListAndEditorTotalFilesDuration,
      };
    case FILES_LIST_AND_EDITOR_MOD_DETAILS:
      return {
        ...state,
        filesListAndEditorModDetails: action.payload.filesListAndEditorModDetails,
      };
      case FILES_LIST_AND_EDITOR_MENU_ANCHOR_EL:
      return {
        ...state,
        filesListAndEditorMenuAnchorEl: action.payload.filesListAndEditorMenuAnchorEl,
      };
      case FILES_LIST_AND_EDITOR_EXPORT_PDF:
        return {
          ...state,
          filesListAndEditorExportPdf: action.payload.filesListAndEditorExportPdf,
        };
        case FILES_LIST_AND_EDITOR_EXPORT_EXCEL:
          return {
            ...state,
            filesListAndEditorExportExcel: action.payload.filesListAndEditorExportExcel,
          };
          case FILES_LIST_AND_EDITOR_HTMLEDITOR_SCROLL_APPEARS:
            return {
              ...state,
              filesListAndEditorHTMLEditorScrollAppears: action.payload.filesListAndEditorHTMLEditorScrollAppears,
            };
    case FILES_LIST_AND_EDITOR_RESET:
      return initialState;
    default:
      return state;
  }
};

export default FilesListAndEditorReducer;
