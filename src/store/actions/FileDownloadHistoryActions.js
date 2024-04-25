export const FILES_DOWNLOAD_HISTORY_ITEMS = "FILES_DOWNLOAD_HISTORY_ITEMS";
export const FILES_DOWNLOAD_HISTORY_ARCHIVE_DATE_FROM = "FILES_DOWNLOAD_HISTORY_ARCHIVE_DATE_FROM";
export const FILES_DOWNLOAD_HISTORY_ARCHIVE_DATE_TO = "FILES_DOWNLOAD_HISTORY_ARCHIVE_DATE_TO";
export const FILES_DOWNLOAD_HISTORY_ARCHIVE_SEARCH_TEXT = "FILES_DOWNLOAD_HISTORY_ARCHIVE_SEARCH_TEXT";
export const FILES_DOWNLOAD_HISTORY_USER_MODAL_TOGGLE = "FILES_DOWNLOAD_HISTORY_USER_MODAL_TOGGLE";
export const FILES_DOWNLOAD_HISTORY_RESET = "FILES_DOWNLOAD_HISTORY_RESET";

export const setFilesDownloadHistoryItems = (filesDownloadHistoryItems) => ({
  type: FILES_DOWNLOAD_HISTORY_ITEMS,
  payload: { filesDownloadHistoryItems:filesDownloadHistoryItems },
});

export const setFilesDownloadHistoryArchiveDateFrom = (filesDownloadHistoryArchiveDateFrom) => ({
  type: FILES_DOWNLOAD_HISTORY_ARCHIVE_DATE_FROM,
  payload: { filesDownloadHistoryArchiveDateFrom:filesDownloadHistoryArchiveDateFrom },
});

export const setFilesDownloadHistoryArchiveDateTo = (filesDownloadHistoryArchiveDateTo) => ({
  type: FILES_DOWNLOAD_HISTORY_ARCHIVE_DATE_TO,
  payload: { filesDownloadHistoryArchiveDateTo:filesDownloadHistoryArchiveDateTo },
});

export const setFilesDownloadHistoryArchiveSearchText = (filesDownloadHistoryArchiveSearchText) => ({
  type: FILES_DOWNLOAD_HISTORY_ARCHIVE_SEARCH_TEXT,
  payload: { filesDownloadHistoryArchiveSearchText:filesDownloadHistoryArchiveSearchText },
});
export const setFilesDownloadHistoryUserModalToggle = (filesDownloadHistoryUserModalToggle) => ({
  type: FILES_DOWNLOAD_HISTORY_USER_MODAL_TOGGLE,
  payload: { filesDownloadHistoryUserModalToggle:filesDownloadHistoryUserModalToggle },
});
export const setFilesDownloadHistoryReset = () => ({
  type: FILES_DOWNLOAD_HISTORY_RESET,
});



