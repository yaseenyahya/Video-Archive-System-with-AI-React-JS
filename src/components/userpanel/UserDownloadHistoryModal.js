import React, { useState,useMemo,useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { connect } from "react-redux";
import Dialog from '@mui/material/Dialog';
import CustomTable from "../otherComponents/CustomTable";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from '@mui/material/DialogContent';
import Tooltip from '@mui/material/Tooltip';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import _ from "lodash";
import {
  setFilesDownloadHistoryItems,
  setFilesDownloadHistoryArchiveDateFrom,
  setFilesDownloadHistoryArchiveDateTo,
  setFilesDownloadHistoryArchiveSearchText,
  setFilesDownloadHistoryUserModalToggle,
  setFilesDownloadHistoryReset
} from "../../store/actions/FileDownloadHistoryActions";
import momenttz from "moment-timezone";
import resolveExtensions from "../userpanel/FilesList/resolveExtensions";
import DateRangeModal from "../otherComponents/DateRangeModal/DateRangeModal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import jspdf from "jspdf";
import 'jspdf-autotable';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import * as XLSX from 'xlsx';
import { gql, useMutation, useLazyQuery } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
   

  },
  closeButton: {
    position: "absolute!important",
    right: 5,
    top: 6,
    color: "white!important",
  },
  dialogTitle: {
    background: "#505050",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "10px!important",
    paddingBottom: "10px!important",
  },
  dialogTitleText: {
    color: "white",
  },
  dialogActions: {
    padding: 0,

  },
  dialogContent: {
    padding: "0!important"
  },
  contentContainer: {
    marginTop: 10,
    display: "flex!important",
    flexDirection: "column"
  },
  addActionButton: {
    color: "#FFFFFF!important",
    [theme.breakpoints.down("md")]: {
      padding: "6px!important"
    }
  },
  toolbarContainer: {
    display: "flex!important",
    justifyContent: "space-between"
  },
  excelButton: {
    marginLeft: "auto"
  },
  archiveSearchDetailsContainer: {
    background: "#373737",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
}, archiveSearchDetails: {
  paddingBottom: "0px!important",
  paddingTop: "10px!important",
  color: "white",
  [theme.breakpoints.down("sm")]: {
      fontSize: "12px!important",
  },
},
}));
const UserDownloadHistoryModal = (props) => {
  const classes = useStyles();



  const handleClosePopup = () => {
    props.setFilesDownloadHistoryUserModalToggle(false);
  };

  const getUsersDownloadHistoryQuery = gql`
    query getUsersDownloadHistory(
      $searchText: String!
      $startDate: String!
      $endDate: String!
  $userId:ID
  ) {
      get_users_download_history(
        searchText: $searchText
        startDate:$startDate
        endDate: $endDate
        userId:$userId
    )  {
      id
    username
    filename
    createdAt
    extension
    folder{
      id
      path
      folder_name
    }
    moreInfo
    deleted
    designation{
      id
      name
    }
      }
    }
  `;

  let [
    getUsersDownloadHistory, // Change variable name from getUsers to getDesignations
    {
      loading: getUsersDownloadHistoryQueryLoading,
      error: getUsersDownloadHistoryQueryError,
      data: getUsersDownloadHistoryQueryResult,
    },
  ] = useLazyQuery(getUsersDownloadHistoryQuery, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
   
    getUsersDownloadHistory({
      variables: {
        searchText: "",
        startDate: momenttz(),
        endDate: momenttz(),
        userId:props.authUserId
      }
    }); // Update the function call
  }, []);
  useEffect(() => {
    if (getUsersDownloadHistoryQueryResult && getUsersDownloadHistoryQueryResult.get_users_download_history) {
      props.setFilesDownloadHistoryItems(getUsersDownloadHistoryQueryResult.get_users_download_history);
    }
  }, [getUsersDownloadHistoryQueryResult])
  const columns = useMemo(
    () => [
      {
        accessorKey: 'createdAt',
        header: 'Date',
        enableColumnOrdering: true,
        searchable:false,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {
          return momenttz(renderedCellValue).utcOffset(0).format('MM/DD/YYYY')
        }
      },
      {
        accessorKey: 'createdAt',
        header: 'Time',
        enableColumnOrdering: true,
        searchable:false,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {
          return momenttz(renderedCellValue).utcOffset(0).format('HH:mm:ss')
        }
      },
      {
        accessorKey: 'username',
        header: 'Username',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
      },

      {
        accessorKey: 'filename',
        header: 'File Name',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: 'moreInfo',
        header: 'File More Info',
        enableColumnOrdering: true,
        searchable:false,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 130,
        Cell: ({ renderedCellValue, row }) => {
          const moreInfo = row.original.moreInfo != "" ? JSON.parse(row.original.moreInfo) : "";

          if (moreInfo && moreInfo != "") {
            const resolveExtensionsObj = new resolveExtensions();
            if (resolveExtensionsObj.isPdfExtension(row.original.extension))
              return <Typography display="block" variant="caption" color="text.secondary" className={classes.videoListItemMoreInfo}>{`${moreInfo.numPages}`} {(moreInfo.numPages > 1) ? "Pages" : "Page"}</Typography>
            if (resolveExtensionsObj.isAudioExtension(row.original.extension))
              return <Typography display="block" variant="caption" color="text.secondary" className={classes.videoListItemMoreInfo}>{`${resolveExtensionsObj.convertDurationToHMS(moreInfo.durationInSeconds)}`}</Typography>
            if (resolveExtensionsObj.isVideoExtension(row.original.extension))
              return <Typography display="block" variant="caption" color="text.secondary" className={classes.videoListItemMoreInfo}>{`${resolveExtensionsObj.convertDurationToHMS(moreInfo.durationInSeconds)}`}</Typography>
            if (resolveExtensionsObj.isImageExtension(row.original.extension))
              return <Typography display="block" variant="caption" color="text.secondary" className={classes.videoListItemMoreInfo}>{`${moreInfo.size.width}x${moreInfo.size.height}`}</Typography>
          }
        }
      },
      {
        accessorKey: 'folder.folder_name',
        header: 'Folder Name',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: 'designation.name',
        header: 'Designation',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
      }
    ]
  );

  const isOnArchiveSearch =
  props.filesDownloadHistoryArchiveDateFrom &&
  props.filesDownloadHistoryArchiveDateTo;
  return (
      <Dialog fullScreen open={props.filesDownloadHistoryUserModalToggle} onClose={handleClosePopup}>
        <DialogTitle
          onClose={handleClosePopup}
          id="customized-dialog-title"
          className={classes.dialogTitle}
        >
          <Typography variant="h6" className={classes.dialogTitleText}>
            User Download History
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClosePopup}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
        <Container
        className={classes.mainContainer}
        maxWidth={false}
        disableGutters={true}
      >
         {isOnArchiveSearch &&
         <Container disableGutters={true} maxWidth={false} className={classes.archiveSearchDetailsContainer}>
                    <Typography className={classes.archiveSearchDetails}>On Archive Search: FROM {momenttz(props.filesDownloadHistoryArchiveDateFrom).format('MM/DD/YYYY')} TO {momenttz(props.filesDownloadHistoryArchiveDateTo).format('MM/DD/YYYY')} {props.filesDownloadHistoryArchiveSearchText && `Search Text: ${props.filesDownloadHistoryArchiveSearchText}`}</Typography>
                </Container>
}
        <CustomTable
          exportFilename={"userdownlaodhistory"}
          renderTopToolbarCustomActions={({ table }) => {
            return <Container disableGutters={true} maxWidth={false} className={classes.toolbarContainer}>
              <>
                {props.filesDownloadHistoryArchiveDateFrom
                  && props.filesDownloadHistoryArchiveDateTo &&
                  <IconButton onClick={() => {
                    props.setFilesDownloadHistoryArchiveDateFrom(null);
                    props.setFilesDownloadHistoryArchiveDateTo(null);
                    props.setFilesDownloadHistoryArchiveSearchText("");
                    getUsersDownloadHistory({
                      variables: {
                        searchText: "",
                        startDate: momenttz(),
                        endDate: momenttz(),
                        userId:props.authUserId
                      }
                    });
                  }}>
                    <ArrowBackIcon className={classes.searchBackIcon} />
                  </IconButton>
                }
                <DateRangeModal
                  searchIconText={"Archive Search"}
                  title={"Archive Search"}
                  onSearch={(startDate, endDate, searchText) => {
                    props.setFilesDownloadHistoryArchiveDateFrom(startDate);
                    props.setFilesDownloadHistoryArchiveDateTo(endDate);
                    props.setFilesDownloadHistoryArchiveSearchText(searchText);

                    getUsersDownloadHistory({
                      variables: {
                        searchText: searchText,
                        startDate: momenttz(startDate),
                        endDate: momenttz(endDate),
                        userId:props.authUserId
                      }
                    });
                  }}

                /></>

              <span className={classes.excelButton}>
                <Tooltip title={"Download Excel"}>
                  <IconButton onClick={() => {
                    const tableData = table.getPrePaginationRowModel().rows.map((row) => {

                      return columns.map((col) => {
                        if (col.header == "Date")
                          return momenttz(row.original[col.accessorKey]).utcOffset(0).format('MM/DD/YYYY');
                        if (col.header == "Time")
                          return momenttz(row.original[col.accessorKey]).utcOffset(0).format('HH:mm:ss');
                        if (col.header == "File More Info") {
                          const moreInfo = row.original[col.accessorKey] != "" ? JSON.parse(row.original[col.accessorKey]) : "";

                          if (moreInfo && moreInfo != "") {
                            const resolveExtensionsObj = new resolveExtensions();
                            if (resolveExtensionsObj.isPdfExtension(row.original.extension))
                              return `${moreInfo.numPages}${(moreInfo.numPages > 1) ? "Pages" : "Page"}`;
                            if (resolveExtensionsObj.isAudioExtension(row.original.extension))
                              return `${resolveExtensionsObj.convertDurationToHMS(moreInfo.durationInSeconds)}`;
                            if (resolveExtensionsObj.isVideoExtension(row.original.extension))
                              return `${resolveExtensionsObj.convertDurationToHMS(moreInfo.durationInSeconds)}`
                            if (resolveExtensionsObj.isImageExtension(row.original.extension))
                              return `${moreInfo.size.width}x${moreInfo.size.height}`;
                          }
                        }
                        else
                          return row.getValue(col.accessorKey)

                      });
                    });

                    const ws = XLSX.utils.aoa_to_sheet([columns.map((col) => col.header), ...tableData]);
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                    XLSX.writeFile(wb, `userdownlaodhistory.xlsx`);
                  }}>
                    <FileDownloadIcon />
                  </IconButton>
                </Tooltip>
              </span>
              <Tooltip title={"Download PDF"}>
                <IconButton onClick={() => {

                  const unit = "pt";
                  const size = "a4"; // use a1, a2, a3 or a4
                  const orientation = "portrait"; // portrait or landscape

                  const marginleft = 40;
                  const doc = new jspdf(orientation, unit, size);

                  const tableData = table.getPrePaginationRowModel().rows.map((row) => {

                    return columns.map((col) => {
                      if (col.header == "Date")
                        return momenttz(row.original[col.accessorKey]).utcOffset(0).format('MM/DD/YYYY');
                      if (col.header == "Time")
                        return momenttz(row.original[col.accessorKey]).utcOffset(0).format('HH:mm:ss');
                      if (col.header == "File More Info") {
                        const moreInfo = row.original[col.accessorKey] != "" ? JSON.parse(row.original[col.accessorKey]) : "";

                        if (moreInfo && moreInfo != "") {
                          const resolveExtensionsObj = new resolveExtensions();
                          if (resolveExtensionsObj.isPdfExtension(row.original.extension))
                          return `${moreInfo.numPages}${(moreInfo.numPages > 1) ? "Pages" : "Page"}`;
                          if (resolveExtensionsObj.isAudioExtension(row.original.extension))
                            return `${resolveExtensionsObj.convertDurationToHMS(moreInfo.durationInSeconds)}`;
                          if (resolveExtensionsObj.isVideoExtension(row.original.extension))
                            return `${resolveExtensionsObj.convertDurationToHMS(moreInfo.durationInSeconds)}`
                          if (resolveExtensionsObj.isImageExtension(row.original.extension))
                            return `${moreInfo.size.width}x${moreInfo.size.height}`;
                        }
                      }
                      else
                        return row.getValue(col.accessorKey)
                    });
                  });

                  doc.autoTable({
                    head: [columns.map((col) => col.header)],
                    body: tableData,
                    theme: 'striped',
                  });

                  doc.save(`userdownlaodhistory.pdf`)
                }}>
                  <PictureAsPdfIcon />
                </IconButton>
              </Tooltip>
            </Container>
          }}

          enableEditing={false}
          muiTablePaginationProps={{
            rowsPerPageOptions: _.sortBy([40, 80, 160, getUsersDownloadHistoryQueryResult && getUsersDownloadHistoryQueryResult.get_users_download_history ? getUsersDownloadHistoryQueryResult.get_users_download_history.length : 250]),
          }}

          enableStickyHeader
          columns={columns}
          enableDensityToggle={false}
          state={{  isLoading: getUsersDownloadHistoryQueryLoading}}
          initialState={{
            density: 'comfortable',
            pagination: { pageSize: 40 },
            isLoading: true,
          }}
          data={getUsersDownloadHistoryQueryResult && getUsersDownloadHistoryQueryResult.get_users_download_history ? getUsersDownloadHistoryQueryResult.get_users_download_history : []}
        />

      </Container>
        </DialogContent>
       
      </Dialog>


  );
};
const mapStateToProps = (state) => {
    return { ...state.AuthUserReducer,...state.FileDownloadHistoryReducer, ...state.OtherReducer };
  };
  
  export default connect(mapStateToProps, {
    setFilesDownloadHistoryItems,
    setFilesDownloadHistoryArchiveDateFrom,
    setFilesDownloadHistoryArchiveDateTo,
    setFilesDownloadHistoryArchiveSearchText,
    setFilesDownloadHistoryUserModalToggle,
    setFilesDownloadHistoryReset
  })(UserDownloadHistoryModal);
  
