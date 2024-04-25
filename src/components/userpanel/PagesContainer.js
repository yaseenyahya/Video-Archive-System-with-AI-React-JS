import React, { useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  CssBaseline,
  Drawer,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import { connect } from "react-redux";
import { makeStyles, useTheme } from "@mui/styles";
import FilesList from "./FilesList/FilesList";
import clsx from "clsx";
import {
  setFilesListAndEditorModalToggle,
  setFilesListAndEditorSelectedFileItem,
  setFilesListAndEditorSelectedFolderId,
} from "../../store/actions/FilesListAndEditorActions";
import {
  setFoldersListMenu,
  setAllFoldersDetails,
} from "../../store/actions/OtherActions";
import FilePreviewAndEditorContainer from "./FilePreviewAndEditorContainer/FilePreviewAndEditorContainer";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavigationDrawer from "./NavigationDrawer";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import FoldersMenuBottomWithHeight from "./FoldersMenuBottomWithHeight";
import { DialogContext } from "../context/DialogContext";
import resolvesettings from "../resolvesettings";
import { useSnackbar } from "notistack";
const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: (state) => state.appBarHeight,
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawer: {
    width: "100%",
    flexShrink: 0,
    height: (state) => `calc(100% - ${state.appBarHeight}px)!important`,
    marginTop: (state) => state.appBarHeight,
  },
  drawerPaper: {
    width: "100%",
    height: (state) => `calc(100% - ${state.appBarHeight}px)!important`,
    marginTop: (state) => state.appBarHeight,
  },
  contentDrawerOpen: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("sm")]: {
      marginRight: (state) => state.drawerWidth,
    },
  },
  drawerCloseButton: {
    position: "absolute!important",
    backgroundColor: "white!important",
    zIndex: 10000,
    marginTop: "5px!important",
    marginLeft: "5px!important",
  },
  filePreviewAndEditorDialogTitle: {
    background: "#505050",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "10px!important",
    paddingBottom: "10px!important",
  },
  filePreviewAndEditorDialogTitleText: {
    color: "white",
  },
  filePreviewAndEditorDialogContent: {
    padding: "0!important",
    border: "0!important",
    overflow: "hidden!important",
  },
  filePreviewAndEditorDialogCloseButton: {
    color: "white!important",
    position: "absolute!important",
    right: 5,
    top: 6,
  },
}));

const PagesContainer = (props) => {
  const { openContextDialog } = React.useContext(DialogContext);
  const theme = useTheme();
  
  const contextDialogProps = React.useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles({
    appBarHeight: props.appBarHeight,
    drawerWidth: props.filesListAndEditorDrawerWidth,
  });

  const FilePreviewAndEditorContainerRef = useRef(null);

  const getFoldersPathQuery = gql`
    query GetFoldersPath {
      get_folders_path {
        id
        path
        folder_name
      }
    }
  `;

  let [
    getFoldersPath,
    {
      loading: getFoldersPathQueryLoading,
      error: getFoldersPathQueryError,
      data: getFoldersPathQueryResult,
    },
  ] = useLazyQuery(getFoldersPathQuery, {
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if (
      getFoldersPathQueryResult &&
      getFoldersPathQueryResult.get_folders_path
    ) {
      let navMenus = [];
      const folderIds = new resolvesettings().getUserAllowFoldersId(
        props.authUserSettingsJson
      );
      props.setAllFoldersDetails(getFoldersPathQueryResult.get_folders_path);
      getFoldersPathQueryResult.get_folders_path.map((folderDetails, i) => {
        if (folderIds.includes(folderDetails.id)) {
          navMenus.push({
            text: folderDetails.folder_name,
            id: folderDetails.id,
            onClick: () => {
              props.setFilesListAndEditorSelectedFolderId(folderDetails.id);
            },
          });
        }
      });
      props.setFoldersListMenu(navMenus);
    }
  }, [getFoldersPathQueryResult]);
  useEffect(() => {
    getFoldersPath();
  }, []);

  const updateTranscriptionMutation = gql`
  mutation UpdateTranscription(
    $folderId: ID!
    $fileId: ID!
    $userId: ID!
    $username: String!
    $transcriptionHTML: String!
  ) {
    update_transcription(
      folderId: $folderId
      fileId: $fileId
      userId: $userId
      username: $username
      transcriptionHTML: $transcriptionHTML
    ) {
      success
      error
      result
    }
  }
`;

const [
  updateTranscription,
  {
    loading: updateTranscriptionMutationLoading,
    error: updateTranscriptionMutationError,
    data: updateTranscriptionMutationResult,
  },
] = useMutation(updateTranscriptionMutation);

useEffect(() => {
  if (updateTranscriptionMutationError) {
    updateTranscriptionMutationError.graphQLErrors.map(({ message }, i) => {
      enqueueSnackbar(message, { variant: "error" });
    });
    contextDialogProps.current.closeAndReset();
  }
}, [updateTranscriptionMutationError]);

useEffect(() => {
  if (
    updateTranscriptionMutationResult &&
    updateTranscriptionMutationResult.update_transcription
  ) {
    if (updateTranscriptionMutationResult.update_transcription.success) {
      enqueueSnackbar("Transaction update successfully.", {
        variant: "success",
      });
      contextDialogProps.current.closeAndReset();
      FilePreviewAndEditorContainerRef.current.pauseVideoPlaying(true);
      props.setFilesListAndEditorModalToggle(false);
    }
  }
}, [updateTranscriptionMutationResult]);

  const isSmOrXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdSmOrXs = useMediaQuery(theme.breakpoints.down("md"));

  const closeFilePreviewAndEditorModal = () => {
    // Close the drawer when clicking close button
    if (FilePreviewAndEditorContainerRef.current) {
      if (
        !FilePreviewAndEditorContainerRef.current.detectChanges(
          props.filesListAndEditorInitValueEditor
        )
      ) {
        FilePreviewAndEditorContainerRef.current.pauseVideoPlaying(true);
        props.setFilesListAndEditorModalToggle(false);
      } else {
        contextDialogProps.current =  openContextDialog(
          "Save",
          "Don't save",
          "Do You want to save changes?",
          "",
          () => {
            contextDialogProps.current.showLoadingAndDisabled(true);
            try {
              updateTranscription({
                variables: {
                  folderId:
                    props.filesListAndEditorSelectedFileItem.folder.id,
                  fileId: props.filesListAndEditorSelectedFileItem.id,
                  userId: props.authUserId,
                  username: props.authUserName,
                  transcriptionHTML: FilePreviewAndEditorContainerRef.current.getContentOfEditorAndRemoveSearchSpan(),
                },
              });
            } catch (e) {}
          },
          () => {
            FilePreviewAndEditorContainerRef.current.pauseVideoPlaying(true);
            props.setFilesListAndEditorModalToggle(false);
          },
          true,
          true
        );
      }
    }
  };
  return (
    <Box className={classes.root}>
      <CssBaseline />

      {isMdSmOrXs && <NavigationDrawer menuList={props.foldersListMenu} />}
      {
        <Dialog
          style={{ padding: 10 }}
          fullScreen
          aria-labelledby="transcription-dialog-title"
          open={props.filesListAndEditorModalToggle}
          onClose={closeFilePreviewAndEditorModal}
        >
          <DialogTitle
            id="transcription-dialog-title"
            className={classes.filePreviewAndEditorDialogTitle}
          >
            <Typography
              variant="h6"
              className={classes.filePreviewAndEditorDialogTitleText}
            >
              Add/Edit Transcription
            </Typography>
            <IconButton
              aria-label="close"
              className={classes.filePreviewAndEditorDialogCloseButton}
              onClick={() => {
                closeFilePreviewAndEditorModal();
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            dividers
            className={classes.filePreviewAndEditorDialogContent}
          >
            <FilePreviewAndEditorContainer
              closeFilePreviewAndEditorModal={closeFilePreviewAndEditorModal}
              ref={FilePreviewAndEditorContainerRef}
            />
          </DialogContent>
        </Dialog>
      }
      <main className={clsx(classes.content)}>
        <div className={classes.contentContainer}>
          <FilesList />
        </div>
      </main>
      {!isMdSmOrXs && <FoldersMenuBottomWithHeight />}
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.AuthUserReducer,
    ...state.OtherReducer,
    ...state.FilesListAndEditorReducer,
  };
};

export default connect(mapStateToProps, {
  setFilesListAndEditorModalToggle,
  setFilesListAndEditorSelectedFileItem,
  setFilesListAndEditorSelectedFolderId,
  setFoldersListMenu,
  setAllFoldersDetails,
})(PagesContainer);
