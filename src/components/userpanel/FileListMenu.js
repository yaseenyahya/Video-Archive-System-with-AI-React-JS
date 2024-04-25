import React, { memo, useEffect } from "react";

import {
  IconButton,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Paper,
  Popover,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material/";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@mui/styles";
import clsx from "clsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  setFilesListAndEditorMenuAnchorEl,
  setFilesListAndEditorExportExcel,
  setFilesListAndEditorExportPdf,
} from "../../store/actions/FilesListAndEditorActions";
import { setFilesListAndEditorFileListShowDeletedItems,setFilesListAndEditorFileListItems } from "../../store/actions/FilesListAndEditorActions";
import jspdf from "jspdf";
import "jspdf-autotable";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import * as XLSX from "xlsx";
import { gql, useLazyQuery } from "@apollo/client";
import _ from "lodash";
import { useSnackbar } from "notistack";
import resolveExtensions from "./FilesList/resolveExtensions";
import momenttz from "moment-timezone";
import UnreadFileManager from '../../auth/UnreadFileManager';
import html2pdf from "html2pdf.js";
// Load font files

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
  menuPaper: {
    background: "rgb(26 39 51 / 73%)",
    borderRadius: 0,
  },
  editProfileMenuItem: {
    color: "white",
    cursor: "pointer",
    pointerEvents: "auto",
  },
  editProfileMenu: {
    padding: "0px!important",
  },
  popover: {
    pointerEvents: "none",
  },
  avatarTooltip: {},
  menuButton: {
    padding: 0,
    marginRight: 10,
  },
  avatar: {
    width: "45px!important",
    height: "45px!important",
  },
  excelExport: {
    marginRight: 22,

    color: "gray!important",
  },
  pdfExport: {
    marginRight: 22,

    color: "gray!important",
  },
  markRead:{
    marginRight: 26,
    marginLeft:6,
    fontWeight:800,
    color: "gray!important",
  },
  excelExportMenuItem: {
    paddingTop: "13px!important",
    paddingBottom: "13px!important",
    cursor: "pointer",
    pointerEvents: "auto",
  },
  pdfExportMenuItem: {
    paddingTop: "13px!important",
    paddingBottom: "13px!important",
    cursor: "pointer",
    pointerEvents: "auto",
  },
  markReadMenuItem: {
    paddingTop: "13px!important",
    paddingBottom: "13px!important",
    cursor: "pointer",
    pointerEvents: "auto",
  },
  progressExport: {
    width: "20px!important",
    height: "20px!important",
    marginRight: "26px!important",
  },
  menuButtonIcon: {
    color: "white",
  },
}));

const FileListMenu = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const getFilesFullDetailsByIdForExportQuery = gql`
    query getFilesFullDetailsByIdForExport($filesIds: [String]) {
      get_files_full_details_by_id_for_export(filesIds: $filesIds) {
        id
        preview
        filename
        createdAt
        extension
        transcription
        transcriptionText
        folder {
          id
          path
          folder_name
        }
        moreInfo
        deleted
        lastModBy
      }
    }
  `;
  let [
    getFilesFullDetailsByIdForExport,
    {
      loading: getFilesFullDetailsByIdForExportQueryLoading,
      error: getFilesFullDetailsByIdForExportQueryError,
      data: getFilesFullDetailsByIdForExportQueryResult,
    },
  ] = useLazyQuery(getFilesFullDetailsByIdForExportQuery, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (
      getFilesFullDetailsByIdForExportQueryResult &&
      getFilesFullDetailsByIdForExportQueryResult.get_files_full_details_by_id_for_export
    ) {
      var columnsForExport = [
        { header: "Date", accessorKey: "createdAt" },
        { header: "Time", accessorKey: "createdAt" },
        { header: "Filename", accessorKey: "filename" },
        { header: "Transcription", accessorKey: "transcription" },
        { header: "Transcription", accessorKey: "transcriptionText" },
        { header: "More Info", accessorKey: "moreInfo" },
        { header: "Deleted", accessorKey: "deleted" },
        { header: "LastModBy", accessorKey: "lastModBy" },
        { header: "Folder", accessorKey: "folder.folder_name" },
        // Define other columns as needed
      ];

      if (props.filesListAndEditorExportExcel) {
     
          // Filter out the item from the array
          columnsForExport = columnsForExport.filter(column => column.accessorKey !== "transcription");
       
      }else{
        columnsForExport = columnsForExport.filter(column => column.accessorKey !== "transcriptionText");
      }
      const tableData = getFilesFullDetailsByIdForExportQueryResult.get_files_full_details_by_id_for_export.map(
        (row) => {
          return columnsForExport.map((col) => {
            if (col.header === "Date")
              return momenttz(row[col.accessorKey])
                .utcOffset(0)
                .format("MM/DD/YYYY");
            if (col.header === "Time")
              return momenttz(row[col.accessorKey])
                .utcOffset(0)
                .format("HH:mm:ss");

            if (col.header === "Folder") {
              const keys = col.accessorKey.split("."); // Split the key
              let value = row;
              for (const k of keys) {
                value = value[k];
              }
              return value;
            }
            if (col.header === "More Info") {
              const moreInfo =
                row[col.accessorKey] !== ""
                  ? JSON.parse(row[col.accessorKey])
                  : "";

              if (moreInfo && moreInfo !== "") {
                const resolveExtensionsObj = new resolveExtensions(); // Assuming you have a class for resolving extensions
                if (resolveExtensionsObj.isPdfExtension(row.extension))
                  return `${moreInfo.numPages} ${
                    moreInfo.numPages > 1 ? "Pages" : "Page"
                  }`;
                if (resolveExtensionsObj.isAudioExtension(row.extension))
                  return resolveExtensionsObj.convertDurationToHMS(
                    moreInfo.durationInSeconds
                  );
                if (resolveExtensionsObj.isVideoExtension(row.extension))
                  return resolveExtensionsObj.convertDurationToHMS(
                    moreInfo.durationInSeconds
                  );
                if (resolveExtensionsObj.isImageExtension(row.extension))
                  return `${moreInfo.size.width}x${moreInfo.size.height}`;
              }
            } else {
              return row[col.accessorKey];
            }
          });
        }
      );
      if (props.filesListAndEditorExportExcel) {
        const ws = XLSX.utils.aoa_to_sheet([
          columnsForExport.map((col) => col.header),
          ...tableData,
        ]);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `files.xlsx`);
      }
      if (props.filesListAndEditorExportPdf) {
        const tempTable = document.createElement("table");
        tempTable.style.borderCollapse = "collapse"; // To collapse borders
        tempTable.style.tableLayout = "fixed";
        tempTable.style.width = "100%";

        const headerRow = tempTable.insertRow();
        columnsForExport.forEach((column) => {
          const headerCell = headerRow.insertCell();
          headerCell.textContent = column.header;
          headerCell.style.backgroundColor = "darkblue";
          headerCell.style.color = "white";
          headerCell.style.border = "1px solid gray";
          headerCell.style.padding = "8px";
          headerCell.style.textAlign = "center";
          if (column.header === "Transcription") {
            headerCell.style.width = `220px`; // Set width for "Filename" column
          }
        });

        const columnIndexForTranscription = 3;
        tableData.forEach((rowData, rowIndex) => {
          const row = tempTable.insertRow();
          rowData.forEach((cellData, columnIndex) => {
            const cell = row.insertCell();
            cell.innerHTML = cellData;
            cell.style.border = "1px solid gray";
            cell.style.padding = "8px";

            if (columnIndex != 3) {
              cell.style.wordBreak = "break-word"; // Set width for "Filename" column
            } else {
   
              cell.style.wordSpacing = "2px";
              cell.style.wordWrap = "break-word";
              cell.style.letterSpacing = 0;
              cell.style.direction = "rtl";
         
            }
          });
        });

        document.body.appendChild(tempTable);

        var opt = {
          image: { type: "jpeg", quality: 0.98 },

          jsPDF: {
            unit: "mm",
            format: "letter",
            orientation: "portrait",
            compress: true,
          },
        };
        html2pdf().set(opt).from(tempTable).save();

        document.body.removeChild(tempTable);
      }
      props.setFilesListAndEditorExportExcel(false);
      props.setFilesListAndEditorExportPdf(false);
    }
  }, [getFilesFullDetailsByIdForExportQueryResult]);
  useEffect(() => {
    if (getFilesFullDetailsByIdForExportQueryError) {
      getFilesFullDetailsByIdForExportQueryError.graphQLErrors.map(
        ({ message }, i) => {
          enqueueSnackbar(message, { variant: "error" });
        }
      );
      props.setFilesListAndEditorExportExcel(false);
      props.setFilesListAndEditorExportPdf(false);
    }
  }, [getFilesFullDetailsByIdForExportQueryError]);
  const getFileIds = () => {
    const isOnArchiveSearch =
      props.filesListAndEditorArchiveFileListItems &&
      props.filesListAndEditorArchiveDateFrom &&
      props.filesListAndEditorArchiveDateTo;

    const isOnAllFolderSearchSearch =
      props.filesListAndEditorAllFolderSearchFileListItems &&
      props.filesListAndEditorAllFolderSearchDateFrom &&
      props.filesListAndEditorAllFolderSearchDateTo;

    var filesToBind = null;
    if (isOnAllFolderSearchSearch) {
      filesToBind = props.filesListAndEditorAllFolderSearchFileListItems;
    } else if (isOnArchiveSearch) {
      filesToBind = props.filesListAndEditorArchiveFileListItems;
    } else {
      filesToBind = props.filesListAndEditorFileListItems;
    }

    let filelistItemWithDeletedFilter = props.filesListAndEditorFileListShowDeletedItems
      ? filesToBind
      : _.filter(filesToBind, (item) => item.deleted != true);

    if (
      props.filesListAndEditorQuickSearchText &&
      props.filesListAndEditorQuickSearchText.length > 0
    ) {
      filelistItemWithDeletedFilter = _.filter(
        filelistItemWithDeletedFilter,
        (item) => {
          // Assuming item.id is the property containing the ID in each object.
          return props.filesListAndEditorQuickSearchIds.includes(item.id);
        }
      );
    }
    filelistItemWithDeletedFilter = _.uniqBy(
      filelistItemWithDeletedFilter,
      "id"
    ).map((item) => item.id);
    return filelistItemWithDeletedFilter;
  };
  const handleMenuClick = (event) => {
    props.setFilesListAndEditorMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    props.setFilesListAndEditorMenuAnchorEl(null);
  };
  const isOnArchiveSearch = props.filesListAndEditorArchiveFileListItems &&
  props.filesListAndEditorArchiveDateFrom &&
  props.filesListAndEditorArchiveDateTo;


const isOnAllFolderSearchSearch = props.filesListAndEditorAllFolderSearchFileListItems &&
  props.filesListAndEditorAllFolderSearchDateFrom &&
  props.filesListAndEditorAllFolderSearchDateTo;
  return (
    <div className={classes.mainContainer}>
      <IconButton onClick={handleMenuClick} className={classes.menuButton}>
        <MoreVertIcon className={classes.menuButtonIcon} />
      </IconButton>

      <Popover
        hideBackdrop={false}
        disableScrollLock={true}
        classes={{ root: classes.popover }}
        disableEnforceFocus={true}
        open={Boolean(props.filesListAndEditorMenuAnchorEl)}
        anchorEl={props.filesListAndEditorMenuAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Paper className={classes.menuPaper}>
          <ClickAwayListener onClickAway={handleMenuClose}>
            <MenuList
              autoFocusItem={Boolean(props.profilePictureMenuAnchorEl)}
              id="menu-list-grow"
              className={classes.editProfileMenu}
            >
              <MenuItem
                className={classes.editProfileMenuItem}
                key={"showdeleted"}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={props.filesListAndEditorFileListShowDeletedItems}
                      onChange={() => {
                        props.setFilesListAndEditorFileListShowDeletedItems(
                          !props.filesListAndEditorFileListShowDeletedItems
                        );
                      }}
                    />
                  }
                  label="Show Deleted"
                />
              </MenuItem>

              <MenuItem
                key={"excelexport"}
                className={classes.excelExportMenuItem}
                disabled={props.filesListAndEditorExportExcel}
                onClick={() => {
                  props.setFilesListAndEditorExportExcel(true);
                  getFilesFullDetailsByIdForExport({
                    variables: {
                      filesIds: getFileIds(),
                    },
                  });
                }}
              >
                {props.filesListAndEditorExportExcel ? (
                  <CircularProgress className={classes.progressExport} />
                ) : (
                  <FileDownloadIcon className={classes.excelExport} />
                )}{" "}
                Export To Excel
              </MenuItem>

              <MenuItem
                className={classes.pdfExportMenuItem}
                key={"pdfexport"}
                disabled={props.filesListAndEditorExportPdf}
                onClick={() => {
                  props.setFilesListAndEditorExportPdf(true);
                  getFilesFullDetailsByIdForExport({
                    variables: {
                      filesIds: getFileIds(),
                    },
                  });
                }}
              >
                <PictureAsPdfIcon className={classes.pdfExport} /> Export To PDF
              </MenuItem>
              {props.filesListAndEditorSelectedFolderId && 
              !isOnArchiveSearch && 
              !isOnAllFolderSearchSearch &&
              <MenuItem
                className={classes.markReadMenuItem}
                key={"markread"}
                disabled={props.filesListAndEditorExportPdf}
                onClick={() => {
                  const unreadFileManager = new UnreadFileManager();
                  unreadFileManager.deleteFolderId(props.filesListAndEditorSelectedFolderId);
                  var clonedFilesList = _.cloneDeep(props.filesListAndEditorFileListItems);
                  clonedFilesList.forEach(item => {

                    if (item.new) {

                        item.new = false;
                    }
                });
                  props.setFilesListAndEditorFileListItems(clonedFilesList);
                handleMenuClose();
                }}
              >
                <span className={classes.markRead} >U</span> Mark Selected Folder All Read
              </MenuItem>
            }
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popover>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { ...state.FilesListAndEditorReducer };
};
export default connect(mapStateToProps, {
  setFilesListAndEditorFileListShowDeletedItems,
  setFilesListAndEditorMenuAnchorEl,
  setFilesListAndEditorExportExcel,
  setFilesListAndEditorExportPdf,
  setFilesListAndEditorFileListItems
})(memo(FileListMenu));
