export const FILES_LIST_AND_EDITOR_DRAWER_TOGGLE = "FILES_LIST_AND_EDITOR_DRAWER_TOGGLE";
export const FILES_LIST_AND_EDITOR_DRAWER_LAST_DOWN_X = "FILES_LIST_AND_EDITOR_DRAWER_LAST_DOWN_X";
export const FILES_LIST_AND_EDITOR_DRAWER_IS_RESIZING = "FILES_LIST_AND_EDITOR_DRAWER_IS_RESIZING";
export const FILES_LIST_AND_EDITOR_DRAWER_WIDTH = "FILES_LIST_AND_EDITOR_DRAWER_WIDTH";

export const FILES_LIST_AND_EDITOR_MODAL_TOGGLE = "FILES_LIST_AND_EDITOR_MODAL_TOGGLE";

export const FILES_LIST_AND_EDITOR_SELECTED_FOLDER_ID = "FILES_LIST_AND_EDITOR_SELECTED_FOLDER_ID";
export const FILES_LIST_AND_EDITOR_SELECTED_FILE_ITEM = "FILES_LIST_AND_EDITOR_SELECTED_FILE_ITEM";
export const FILES_LIST_AND_EDITOR_INIT_VALUE_EDITOR = "FILES_LIST_AND_EDITOR_INIT_VALUE_EDITOR";
export const FILES_LIST_AND_EDITOR_QUICK_SEARCH_IDS = "FILES_LIST_AND_EDITOR_QUICK_SEARCH_IDS";
export const FILES_LIST_AND_EDITOR_QUICK_SEARCH_TEXT = "FILES_LIST_AND_EDITOR_QUICK_SEARCH_TEXT";
export const FILES_LIST_AND_EDITOR_FILE_LIST_ITEMS = "FILES_LIST_AND_EDITOR_FILE_LIST_ITEMS";
export const FILES_LIST_AND_EDITOR_FILE_LIST_SHOW_DELETED_ITEMS = "FILES_LIST_AND_EDITOR_FILE_LIST_SHOW_DELETED_ITEMS";
export const FILES_LIST_AND_EDITOR_ARCHIVE_DATE_FROM = "FILES_LIST_AND_EDITOR_ARCHIVE_DATE_FROM";
export const FILES_LIST_AND_EDITOR_ARCHIVE_DATE_TO = "FILES_LIST_AND_EDITOR_ARCHIVE_DATE_TO";
export const FILES_LIST_AND_EDITOR_ARCHIVE_SEARCH_TEXT = "FILES_LIST_AND_EDITOR_ARCHIVE_SEARCH_TEXT";
export const FILES_LIST_AND_EDITOR_ARCHIVE_FILE_LIST_ITEMS = "FILES_LIST_AND_EDITOR_ARCHIVE_FILE_LIST_ITEMS";

export const FILES_LIST_AND_EDITOR_ALL_FOLDER_SEARCH_DATE_FROM = "FILES_LIST_AND_EDITOR_ALL_FOLDER_SEARCH_DATE_FROM";
export const FILES_LIST_AND_EDITOR_ALL_FOLDER_DATE_TO = "FILES_LIST_AND_EDITOR_ALL_FOLDER_DATE_TO";
export const FILES_LIST_AND_EDITOR_ALL_FOLDER_SEARCH_TEXT = "FILES_LIST_AND_EDITOR_ALL_FOLDER_SEARCH_TEXT";
export const FILES_LIST_AND_EDITOR_ALL_FOLDER_FILE_LIST_ITEMS = "FILES_LIST_AND_EDITOR_ALL_FOLDER_FILE_LIST_ITEMS";

export const FILES_LIST_AND_EDITOR_TOTAL_FILES_COUNT = "FILES_LIST_AND_EDITOR_TOTAL_FILES_COUNT";
export const FILES_LIST_AND_EDITOR_TOTAL_FILES_DURATION = "FILES_LIST_AND_EDITOR_TOTAL_FILES_DURATION";
export const FILES_LIST_AND_EDITOR_MOD_DETAILS = "FILES_LIST_AND_EDITOR_MOD_DETAILS";
export const FILES_LIST_AND_EDITOR_MENU_ANCHOR_EL = "FILES_LIST_AND_EDITOR_MENU_ANCHOR_EL";
export const FILES_LIST_AND_EDITOR_EXPORT_PDF = "FILES_LIST_AND_EDITOR_EXPORT_PDF";
export const FILES_LIST_AND_EDITOR_EXPORT_EXCEL = "FILES_LIST_AND_EDITOR_EXPORT_EXCEL";
export const FILES_LIST_AND_EDITOR_HTMLEDITOR_SCROLL_APPEARS = "FILES_LIST_AND_EDITOR_HTMLEDITOR_SCROLL_APPEARS";
export const FILES_LIST_AND_EDITOR_RESET = "FILES_LIST_AND_EDITOR_RESET";


export const setFilesListAndEditorDrawerToggle = (filesListAndEditorDrawerToggle) => ({
  type: FILES_LIST_AND_EDITOR_DRAWER_TOGGLE,
  payload: { filesListAndEditorDrawerToggle:filesListAndEditorDrawerToggle },
});
export const setFilesListAndEditorDrawerLastDownX = (filesListAndEditorDrawerLastDownX) => ({
  type: FILES_LIST_AND_EDITOR_DRAWER_LAST_DOWN_X,
  payload: { filesListAndEditorDrawerLastDownX:filesListAndEditorDrawerLastDownX },
});
export const setFilesListAndEditorDrawerIsResizing = (filesListAndEditorDrawerIsResizing) => ({
  type: FILES_LIST_AND_EDITOR_DRAWER_IS_RESIZING,
  payload: { filesListAndEditorDrawerIsResizing:filesListAndEditorDrawerIsResizing },
});

export const setFilesListAndEditorDrawerWidth = (filesListAndEditorDrawerWidth) => ({
  type: FILES_LIST_AND_EDITOR_DRAWER_WIDTH,
  payload: { filesListAndEditorDrawerWidth:filesListAndEditorDrawerWidth },
});

export const setFilesListAndEditorModalToggle = (filesListAndEditorModalToggle) => ({
  type: FILES_LIST_AND_EDITOR_MODAL_TOGGLE,
  payload: { filesListAndEditorModalToggle:filesListAndEditorModalToggle },
});
export const setFilesListAndEditorSelectedFolderId = (filesListAndEditorSelectedFolderId) => ({
  type: FILES_LIST_AND_EDITOR_SELECTED_FOLDER_ID,
  payload: { filesListAndEditorSelectedFolderId:filesListAndEditorSelectedFolderId },
});

export const setFilesListAndEditorSelectedFileItem = (filesListAndEditorSelectedFileItem) => ({
  type: FILES_LIST_AND_EDITOR_SELECTED_FILE_ITEM,
  payload: { filesListAndEditorSelectedFileItem:filesListAndEditorSelectedFileItem },
});
export const setFilesListAndEditorInitValueEditor = (filesListAndEditorInitValueEditor) => ({
  type: FILES_LIST_AND_EDITOR_INIT_VALUE_EDITOR,
  payload: { filesListAndEditorInitValueEditor:filesListAndEditorInitValueEditor },
});

export const setFilesListAndEditorQuickSearchIds = (filesListAndEditorQuickSearchIds) => ({
  type: FILES_LIST_AND_EDITOR_QUICK_SEARCH_IDS,
  payload: { filesListAndEditorQuickSearchIds:filesListAndEditorQuickSearchIds },
});
export const setFilesListAndEditorQuickSearchText = (filesListAndEditorQuickSearchText) => ({
  type: FILES_LIST_AND_EDITOR_QUICK_SEARCH_TEXT,
  payload: { filesListAndEditorQuickSearchText:filesListAndEditorQuickSearchText },
});
export const setFilesListAndEditorFileListItems = (filesListAndEditorFileListItems) => ({
  type: FILES_LIST_AND_EDITOR_FILE_LIST_ITEMS,
  payload: { filesListAndEditorFileListItems:filesListAndEditorFileListItems },
});
export const setFilesListAndEditorFileListShowDeletedItems = (filesListAndEditorFileListShowDeletedItems) => ({
  type: FILES_LIST_AND_EDITOR_FILE_LIST_SHOW_DELETED_ITEMS,
  payload: { filesListAndEditorFileListShowDeletedItems:filesListAndEditorFileListShowDeletedItems },
});

export const setFilesListAndEditorArchiveDateFrom = (filesListAndEditorArchiveDateFrom) => ({
  type: FILES_LIST_AND_EDITOR_ARCHIVE_DATE_FROM,
  payload: { filesListAndEditorArchiveDateFrom:filesListAndEditorArchiveDateFrom },
});

export const setFilesListAndEditorArchiveDateTo = (filesListAndEditorArchiveDateTo) => ({
  type: FILES_LIST_AND_EDITOR_ARCHIVE_DATE_TO,
  payload: { filesListAndEditorArchiveDateTo:filesListAndEditorArchiveDateTo },
});
export const setFilesListAndEditorArchiveSearchText = (filesListAndEditorArchiveSearchText) => ({
  type: FILES_LIST_AND_EDITOR_ARCHIVE_SEARCH_TEXT,
  payload: { filesListAndEditorArchiveSearchText:filesListAndEditorArchiveSearchText },
});
export const setFilesListAndEditorArchiveFileListItems = (filesListAndEditorArchiveFileListItems) => ({
  type: FILES_LIST_AND_EDITOR_ARCHIVE_FILE_LIST_ITEMS,
  payload: { filesListAndEditorArchiveFileListItems:filesListAndEditorArchiveFileListItems },
});



export const setFilesListAndEditorAllFolderSearchDateFrom = (filesListAndEditorAllFolderSearchDateFrom ) => ({
  type: FILES_LIST_AND_EDITOR_ALL_FOLDER_SEARCH_DATE_FROM,
  payload: { filesListAndEditorAllFolderSearchDateFrom:filesListAndEditorAllFolderSearchDateFrom },
});

export const setFilesListAndEditorAllFolderSearchDateTo = (filesListAndEditorAllFolderSearchDateTo) => ({
  type: FILES_LIST_AND_EDITOR_ALL_FOLDER_DATE_TO,
  payload: { filesListAndEditorAllFolderSearchDateTo:filesListAndEditorAllFolderSearchDateTo },
});
export const setFilesListAndEditorAllFolderSearchSearchText = (filesListAndEditorAllFolderSearchSearchText) => ({
  type: FILES_LIST_AND_EDITOR_ALL_FOLDER_SEARCH_TEXT,
  payload: { filesListAndEditorAllFolderSearchSearchText:filesListAndEditorAllFolderSearchSearchText },
});
export const setFilesListAndEditorAllFolderSearchFileListItems = (filesListAndEditorAllFolderSearchFileListItems) => ({
  type: FILES_LIST_AND_EDITOR_ALL_FOLDER_FILE_LIST_ITEMS,
  payload: { filesListAndEditorAllFolderSearchFileListItems:filesListAndEditorAllFolderSearchFileListItems },
});



export const setFilesListAndEditorTotalFilesCount = (filesListAndEditorTotalFilesCount) => ({
  type: FILES_LIST_AND_EDITOR_TOTAL_FILES_COUNT,
  payload: { filesListAndEditorTotalFilesCount:filesListAndEditorTotalFilesCount },
});
export const setFilesListAndEditorTotalFilesDuration = (filesListAndEditorTotalFilesDuration) => ({
  type: FILES_LIST_AND_EDITOR_TOTAL_FILES_DURATION,
  payload: { filesListAndEditorTotalFilesDuration:filesListAndEditorTotalFilesDuration },
});
export const setFilesListAndEditorModDetails = (filesListAndEditorModDetails) => ({
  type: FILES_LIST_AND_EDITOR_MOD_DETAILS,
  payload: { filesListAndEditorModDetails:filesListAndEditorModDetails },
});
export const setFilesListAndEditorMenuAnchorEl = (filesListAndEditorMenuAnchorEl) => ({
  type: FILES_LIST_AND_EDITOR_MENU_ANCHOR_EL,
  payload: { filesListAndEditorMenuAnchorEl:filesListAndEditorMenuAnchorEl },
});
export const setFilesListAndEditorExportPdf = (filesListAndEditorExportPdf) => ({
  type: FILES_LIST_AND_EDITOR_EXPORT_PDF,
  payload: { filesListAndEditorExportPdf:filesListAndEditorExportPdf },
});
export const setFilesListAndEditorExportExcel = (filesListAndEditorExportExcel) => ({
  type: FILES_LIST_AND_EDITOR_EXPORT_EXCEL,
  payload: { filesListAndEditorExportExcel:filesListAndEditorExportExcel },
});
export const setFilesListAndEditorHTMLEditorScrollAppears = (filesListAndEditorHTMLEditorScrollAppears) => ({
  type: FILES_LIST_AND_EDITOR_HTMLEDITOR_SCROLL_APPEARS,
  payload: { filesListAndEditorHTMLEditorScrollAppears:filesListAndEditorHTMLEditorScrollAppears },
});

export const setFilesListAndEditorReset = () => ({
  type: FILES_LIST_AND_EDITOR_RESET,
});

