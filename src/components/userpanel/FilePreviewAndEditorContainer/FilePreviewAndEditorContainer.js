import React, { useRef, useEffect, forwardRef } from "react";
import { createRoot } from "react-dom/client";
import { makeStyles, useTheme } from "@mui/styles";
import { Container, CircularProgress, Typography } from "@mui/material";
import { connect } from "react-redux";
import {
  setFilesListAndEditorDrawerLastDownX,
  setFilesListAndEditorDrawerIsResizing,
  setFilesListAndEditorDrawerWidth,
  setFilesListAndEditorModDetails,
  setFilesListAndEditorFileListItems,
  setFilesListAndEditorArchiveFileListItems,
  setFilesListAndEditorInitValueEditor,
  setFilesListAndEditorAllFolderSearchFileListItems,
  setFilesListAndEditorHTMLEditorScrollAppears,
} from "../../../store/actions/FilesListAndEditorActions";
import {
  gql,
  useMutation,
  useLazyQuery,
  useSubscription,
} from "@apollo/client";
import PreviewFile from "../PreviewFile/PreviewFile";
import { Editor } from "@tinymce/tinymce-react";
import EditorTopHeader from "./EditorTopHeader";
import resolvesettings from "../../resolvesettings";
import { useSnackbar } from "notistack";
import _ from "lodash";
import "./style.css";
import momenttz from "moment-timezone";
import Mark from "mark.js";
import CopyButton from "../../otherComponents/CopyButton";
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    flex: "1 0 50%",
  },
  progressContainer: {
    display: "flex!important",
    justifyContent: "center",
    alignItems: "center",
  },
  progressTranscription: {},
  deletedFileTextContainer: {
    display: "flex!important",
    justifyContent: "center",
    alignItems: "center",
  },
  printTopContainer: {
    fontSize: 25,
    textDecoration: "underline",
  },
  printContentContainer: {
    fontSize: 30,
    "unicode-bidi": "plaintext",
    "-webkit-rtl-ordering": "logical",
  },
  CopyButton: {
    position: "relative",
    top: "-64px",
  },
}));

const FilePreviewAndEditorContainer = forwardRef((props, refProp) => {
  const editorRef = useRef(null);
  const classes = useStyles();
  const modalTitleHeight = 51;
  const modalTotalpadding = 20;
  const printSaveToolbarHeight = 36;
  const totalAvailableHeight = props.windowHeight;

  const PreviewFileRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (editorRef.current) {
    }
    //editorRef.current.theme.resizeTo(null, `${totalAvailableHeight/2}px` );
  }, [props.windowHeight]);
  const TranscriptionChangedCallbackallSubscription = gql`
    subscription TranscriptionChangedCallbackall {
      transcriptionchangedcallbackall {
        folderId
        fileId
        userId
        username
        transcriptionHTML
        truncatedTranscriptionText
      }
    }
  `;

  const {
    data: transcriptionChangedCallbackallSubscriptionResult,
  } = useSubscription(TranscriptionChangedCallbackallSubscription);

  useEffect(() => {
    if (
      transcriptionChangedCallbackallSubscriptionResult &&
      transcriptionChangedCallbackallSubscriptionResult.transcriptionchangedcallbackall
    ) {
      const transcriptionCallbackResult =
        transcriptionChangedCallbackallSubscriptionResult.transcriptionchangedcallbackall;
      if (
        transcriptionCallbackResult.fileId ==
        props.filesListAndEditorSelectedFileItem.id
      ) {
        if (transcriptionCallbackResult.userId != props.authUserId) {
          editorRef.current.setContent(
            transcriptionCallbackResult.transcriptionHTML
          );
        }
        getLastModDetail({
          variables: {
            fileId: props.filesListAndEditorSelectedFileItem.id,
          },
        });
      }
      if (
        transcriptionCallbackResult.folderId ==
        props.filesListAndEditorSelectedFileItem.folder.id
      ) {
        let cloneItems = _.cloneDeep(props.filesListAndEditorFileListItems);
        let fileFound = _.find(
          cloneItems,
          (file) => file.id == transcriptionCallbackResult.fileId
        );
        if (fileFound) {
          fileFound.truncatedTranscriptionText =
            transcriptionCallbackResult.truncatedTranscriptionText;
          props.setFilesListAndEditorFileListItems(cloneItems);
        }
        const isOnArchiveSearch =
          props.filesListAndEditorArchiveFileListItems &&
          props.filesListAndEditorArchiveDateFrom &&
          props.filesListAndEditorArchiveDateTo;

        if (isOnArchiveSearch) {
          let cloneItemsArchive = _.cloneDeep(
            props.filesListAndEditorArchiveFileListItems
          );
          let fileFoundArchive = _.find(
            cloneItemsArchive,
            (file) => file.id == transcriptionCallbackResult.fileId
          );
          if (fileFoundArchive) {
            fileFoundArchive.truncatedTranscriptionText =
              transcriptionCallbackResult.truncatedTranscriptionText;
            props.setFilesListAndEditorArchiveFileListItems(cloneItemsArchive);
          }
        }
      }

      const isOnAllFolderSearchSearch =
        props.filesListAndEditorAllFolderSearchFileListItems &&
        props.filesListAndEditorAllFolderSearchDateFrom &&
        props.filesListAndEditorAllFolderSearchDateTo;

      if (isOnAllFolderSearchSearch) {
        let cloneItems = _.cloneDeep(
          props.filesListAndEditorAllFolderSearchFileListItems
        );
        let fileFound = _.find(
          cloneItems,
          (file) => file.id == transcriptionCallbackResult.fileId
        );

        if (fileFound) {
          fileFound.truncatedTranscriptionText =
            transcriptionCallbackResult.truncatedTranscriptionText;
          props.setFilesListAndEditorAllFolderSearchFileListItems(cloneItems);
        }
      }
    }
  }, [transcriptionChangedCallbackallSubscriptionResult]);

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
      }
    }
  }, [updateTranscriptionMutationResult]);

  const addOrUpdateViewHistoryMutation = gql`
    mutation addOrUpdateViewHistory($userId: ID!, $fileId: ID!) {
      add_or_update_view_history(userId: $userId, fileId: $fileId) {
        success
        error
        result
      }
    }
  `;

  let [
    addOrUpdateViewHistory,
    {
      loading: addOrUpdateViewHistoryMutationLoading,
      error: addOrUpdateViewHistoryMutationError,
      data: addOrUpdateViewHistoryMutationResult,
    },
  ] = useMutation(addOrUpdateViewHistoryMutation);

  const getTranscriptionQuery = gql`
    query GetTranscription($fileId: String!) {
      get_transcription(fileId: $fileId) {
        success
        error
        result
      }
    }
  `;

  let [
    getTranscription,
    {
      loading: getTranscriptionQueryLoading,
      error: getTranscriptionQueryError,
      data: getTranscriptionQueryResult,
    },
  ] = useLazyQuery(getTranscriptionQuery, {
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if ( getTranscriptionQueryResult &&
        getTranscriptionQueryResult.get_transcription) {
          
      props.setFilesListAndEditorInitValueEditor(getTranscriptionQueryResult.get_transcription.result)
       
    }
  }, [getTranscriptionQueryResult]);
  const getLastModDetailQuery = gql`
    query GetLastModDetail($fileId: String!) {
      get_last_mod_detail(fileId: $fileId) {
        id
        fileId
        userId
        username
        transcriptionText
        updatedAt
      }
    }
  `;

  let [
    getLastModDetail,
    {
      loading: getLastModDetailQueryLoading,
      error: getLastModDetailQueryError,
      data: getLastModDetailQueryResult,
    },
  ] = useLazyQuery(getLastModDetailQuery, {
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if (getLastModDetailQueryResult) {
      if (getLastModDetailQueryResult.get_last_mod_detail)
        props.setFilesListAndEditorModDetails(
          `Last Mod By ${
            getLastModDetailQueryResult.get_last_mod_detail.username
          } At ${momenttz(
            parseInt(getLastModDetailQueryResult.get_last_mod_detail.updatedAt)
          ).format("DD/MM/YYYY HH:mm:ss")}`
        );
      else props.setFilesListAndEditorModDetails("");
    }
  }, [getLastModDetailQueryResult]);
  useEffect(() => {
    if (
      props.filesListAndEditorQuickSearchText == null ||
      props.filesListAndEditorQuickSearchText == ""
    ) {
      if (editorRef.current) {
        editorRef.current.setContent(
          removeHighlightSpans(editorRef.current.getContent())
        );
      }
    } else {
      if (editorRef.current) {
        editorRef.current.setContent(
          highlightLetter(
            editorRef.current.getContent(),
            props.filesListAndEditorQuickSearchText,
            "yellow"
          )
        );
      }
    }
  }, [props.filesListAndEditorQuickSearchText]);

  useEffect(() => {
    if (
      props.filesListAndEditorArchiveSearchText == "" ||
      props.filesListAndEditorArchiveSearchText == null
    ) {
      if (editorRef.current) {
        editorRef.current.setContent(
          removeHighlightSpans(editorRef.current.getContent())
        );
      }
    } else {
      if (editorRef.current) {
        editorRef.current.setContent(
          highlightLetter(
            editorRef.current.getContent(),
            props.filesListAndEditorArchiveSearchText,
            "yellow"
          )
        );
      }
    }
  }, [props.filesListAndEditorArchiveSearchText]);

  useEffect(() => {
    if (
      props.filesListAndEditorAllFolderSearchSearchText == "" ||
      props.filesListAndEditorAllFolderSearchSearchText == null
    ) {
      if (editorRef.current) {
        editorRef.current.setContent(
          removeHighlightSpans(editorRef.current.getContent())
        );
      }
    } else {
      if (editorRef.current) {
        editorRef.current.setContent(
          highlightLetter(
            editorRef.current.getContent(),
            props.filesListAndEditorAllFolderSearchSearchText,
            "yellow"
          )
        );
      }
    }
  }, [props.filesListAndEditorAllFolderSearchSearchText]);

  const getFileFullDetailsByIdQuery = gql`
    query getFileFullDetailsById($fileId: String) {
      get_file_full_details_by_id(fileId: $fileId) {
        id
        preview
        filename
        createdAt
        extension
        truncatedTranscriptionText
        folder {
          id
          path
          folder_name
        }
        moreInfo
        deleted
        size
      }
    }
  `;
  let [
    getFileFullDetailsById,
    {
      loading: getFileFullDetailsByIdQueryLoading,
      error: getFileFullDetailsByIdQueryError,
      data: getFileFullDetailsByIdQueryResult,
    },
  ] = useLazyQuery(getFileFullDetailsByIdQuery, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (
      getFileFullDetailsByIdQueryResult &&
      getFileFullDetailsByIdQueryResult.get_file_full_details_by_id
    ) {
      const editor = editorRef.current;
      if (editor) {
        // Set your content here

        // Create an iframe
        const iframe = document.createElement("iframe");
        iframe.style.position = "absolute";
        iframe.style.top = `-${document.documentElement.clientHeight + 100}px`;
        iframe.style.left = `-${document.documentElement.clientWidth + 100}px`;
        iframe.id = "printWindow";
        iframe.srcdoc = "<!DOCTYPE html>";
        document.body.appendChild(iframe);

        // Wait for the iframe to be ready
        iframe.onload = () => {
          const iframeWindow = iframe.contentWindow;
          const printDocument = iframeWindow.document;
          const appContainer = printDocument.createElement("div");
          printDocument.body.appendChild(appContainer);

          // Wait for the content to be loaded inside the iframe
          const checkContentReady = () => {
            if (printDocument.readyState === "complete") {
              const pageStyle = `
                    @page {
                        /* Remove browser default header (title) and footer (url) */
                        margin: 0;
                    }
                    @media print {
                        body {
                            /* Tell browsers to print background colors */
                            -webkit-print-color-adjust: exact; /* Chrome/Safari/Edge/Opera */
                            color-adjust: exact; /* Firefox */
                        }
                    }
                `;
              const root = createRoot(appContainer);
              const htmlContent = removeHighlightSpans(
                editorRef.current.getContent()
              );
              root.render(
                <div
                  className={classes.printContainer}
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 30,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      marginBottom: 10,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>{momenttz().format("MM/DD/YYYY HH:mm:ss")}</div>
                    <div>{props.authUserName}</div>
                  </div>
                  <div
                    style={{
                      fontSize: 25,
                      fontWeight: 800,
                      textDecoration: "underline",
                    }}
                  >
                    {
                      getFileFullDetailsByIdQueryResult
                        .get_file_full_details_by_id.filename
                    }
                  </div>

                  <div
                    style={{
                      fontSize: 15,
                      marginTop: 20,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: "bold" }}>Created At: </span>{" "}
                      {momenttz(
                        getFileFullDetailsByIdQueryResult
                          .get_file_full_details_by_id.createdAt
                      )
                        .utcOffset(0)
                        .format("MM/DD/YYYY HH:mm:ss")}
                    </div>
                    <div>
                      {
                        getFileFullDetailsByIdQueryResult
                          .get_file_full_details_by_id.folder.folder_name
                      }
                    </div>
                  </div>
                  <div
                    style={{ fontSize: 30, marginTop: 20, fontWeight: 800 }}
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  ></div>
                </div>
              );
              iframe.ownerDocument.title = " ";
              if (iframe.contentDocument) {
                iframe.contentDocument.title = " ";
                const styleEl = iframe.contentDocument.createElement("style");

                styleEl.appendChild(
                  iframe.contentDocument.createTextNode(pageStyle)
                );
                iframe.contentDocument.head.appendChild(styleEl);
              }

              iframeWindow.focus();
              setTimeout(function () {
                iframeWindow.print();
              }, 200);
              setTimeout(function () {
                document.body.removeChild(iframe);
              }, 200);
            } else {
              setTimeout(checkContentReady, 100);
            }
          };

          checkContentReady();
        };

        // Wait for the iframe to load the content before printing
      }
    }
  }, [getFileFullDetailsByIdQueryResult]);

  useEffect(() => {
    if (props.filesListAndEditorSelectedFileItem) {
      initEditor();
    }
  }, [props.filesListAndEditorSelectedFileItem]);

  const initEditor = async () => {
    try {
      await getTranscription({
        variables: {
          fileId: props.filesListAndEditorSelectedFileItem.id,
        },
      });
    } catch (ex) {}

    addOrUpdateViewHistory({
      variables: {
        userId: props.authUserId,
        fileId: props.filesListAndEditorSelectedFileItem.id,
      },
    });

    getLastModDetail({
      variables: {
        fileId: props.filesListAndEditorSelectedFileItem.id,
      },
    });
  };
  const removeHighlightSpans = (htmlContent) => {
    const container = document.createElement("div");
    container.innerHTML = htmlContent;

    // Use Mark.js to unmark text with the specified color
    const instances = new Mark(container);
    instances.unmark();

    // Get the modified HTML content
    const modifiedHtmlContent = container.innerHTML;

    return modifiedHtmlContent;
  };

  const highlightLetter = (htmlContent, targetText, color) => {
    const container = document.createElement("div");
    container.innerHTML = htmlContent;

    // Use querySelectorAll to select all spans within the container

    const instance = new Mark(container);
    instance.mark(targetText);

    // Get the modified HTML content
    const modifiedHtmlContent = container.innerHTML;

    return modifiedHtmlContent;
  };

  useEffect(() => {
    if (refProp) {
      refProp.current = {
        detectChanges: (initValue) => detectChanges_(initValue),
        getContentOfEditorAndRemoveSearchSpan:getContentOfEditorAndRemoveSearchSpan_,
        pauseVideoPlaying: (value) => {
          if (PreviewFileRef.current) {
            PreviewFileRef.current.pauseVideoPlaying(value);
          }
        },
      };
    }
  }, [refProp]);

  const detectChanges_ = (initValue) => {
    
    if (
      !getTranscriptionQueryLoading &&
      editorRef.current
    ) {
      
      if (
        editorRef.current.getContent() !=
        initValue
      ) {
        return true;
      }
    }
    return false;
  };
  const getContentOfEditorAndRemoveSearchSpan_ = () => {
    
    return removeHighlightSpans(
      editorRef.current.getContent()
    )
  };

  return props.filesListAndEditorSelectedFileItem ? (
    <Container
      maxWidth={false}
      disableGutters={true}
      className={classes.mainContainer}
    >
      {props.filesListAndEditorSelectedFileItem.deleted ? (
        <Container
          className={classes.deletedFileTextContainer}
          style={{
            height:
              totalAvailableHeight / 2 -
              modalTitleHeight -
              modalTotalpadding -
              printSaveToolbarHeight,
          }}
        >
          <Typography>File is Deleted</Typography>
        </Container>
      ) : (
        <PreviewFile
          ref={PreviewFileRef}
          height={
            totalAvailableHeight / 2 -
            modalTitleHeight -
            modalTotalpadding -
            printSaveToolbarHeight
          }
        />
      )}

      <EditorTopHeader
        isSavingTranscription={updateTranscriptionMutationLoading}
        lastModDetailLoading={getLastModDetailQueryLoading}
        lastModDetail={props.filesListAndEditorModDetails}
        onPrint={async () => {
          getFileFullDetailsById({
            variables: {
              fileId: props.filesListAndEditorSelectedFileItem.id,
            },
          });
        }}
      />
      {getTranscriptionQueryLoading ? (
        <Container
          style={{ height: totalAvailableHeight / 2 }}
          className={classes.progressContainer}
        >
          <CircularProgress className={classes.progressTranscription} />
        </Container>
      ) : (
        <div style={{ height: totalAvailableHeight / 2, width: "100%" }}>
          <Editor
            tinymceScriptSrc={
              process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
            }
            onInit={(evt, editor) => {
              editorRef.current = editor;
            }}
            initialValue={
            props.filesListAndEditorInitValueEditor
            }
            init={{
              promotion: false,
              print_title: "red",
              init_instance_callback: function (editor) {
                editor.on("NodeChange", function (e) {
                  props.setFilesListAndEditorHTMLEditorScrollAppears(
                    editor.getBody().clientHeight + 13 >
                      editor.iframeElement.clientHeight
                  );
                });

                if (
                  !new resolvesettings().getUserAllowEdit(
                    props.authUserSettingsJson
                  )
                )
                  editor.getBody().setAttribute("contenteditable", false);

                editor.addShortcut("ctrl+s", "Custom Ctrl+S", "custom_ctrl_s");
                editor.on("keyup", function (e) {
                  if (e.key === "Escape") {
                    props.closeFilePreviewAndEditorModal();
                  }
                });
                editor.addCommand("custom_ctrl_s", () => {
                  try {
                    updateTranscription({
                      variables: {
                        folderId:
                          props.filesListAndEditorSelectedFileItem.folder.id,
                        fileId: props.filesListAndEditorSelectedFileItem.id,
                        userId: props.authUserId,
                        username: props.authUserName,
                        transcriptionHTML: removeHighlightSpans(
                          editorRef.current.getContent()
                        ),
                      },
                    });
                  } catch (e) {}
                });
                if (
                  props.filesListAndEditorArchiveSearchText &&
                  props.filesListAndEditorArchiveSearchText.length > 0
                ) {
                  editor.setContent(
                    highlightLetter(
                      editor.getContent(),
                      props.filesListAndEditorArchiveSearchText,
                      "yellow"
                    )
                  );
                } else if (
                  props.filesListAndEditorAllFolderSearchSearchText &&
                  props.filesListAndEditorAllFolderSearchSearchText.length > 0
                ) {
                  editor.setContent(
                    highlightLetter(
                      editor.getContent(),
                      props.filesListAndEditorAllFolderSearchSearchText,
                      "yellow"
                    )
                  );
                } else if (
                  props.filesListAndEditorQuickSearchText &&
                  props.filesListAndEditorQuickSearchText.length > 0
                ) {
                  editor.setContent(
                    highlightLetter(
                      editor.getContent(),
                      props.filesListAndEditorQuickSearchText,
                      "yellow"
                    )
                  );
                }
              },
              readonly: new resolvesettings().getUserAllowEdit(
                props.authUserSettingsJson
              ),
              resize: false,

              skin: "oxide-dark",
              width: "100%",
              height: "100%",
              menubar: "edit insert view format table tools",
              setup: function (ed) {
                ed.ui.registry.addToggleButton("customsave", {
                  text: "Save",
                  enabled: new resolvesettings().getUserAllowEdit(
                    props.authUserSettingsJson
                  ),
                  onAction: function (api) {
                    try {
                      updateTranscription({
                        variables: {
                          folderId:
                            props.filesListAndEditorSelectedFileItem.folder.id,
                          fileId: props.filesListAndEditorSelectedFileItem.id,
                          userId: props.authUserId,
                          username: props.authUserName,
                          transcriptionHTML: removeHighlightSpans(
                            editorRef.current.getContent()
                          ),
                        },
                      });
                    } catch (e) {}
                  },
                  icon: "save",
                  onSetup: function (api) {},
                });

                ed.on("init", function () {
                  props.setFilesListAndEditorHTMLEditorScrollAppears(
                    ed.getBody().clientHeight + 13 >
                      ed.iframeElement.clientHeight
                  );
                  this.execCommand("fontSize", false, "18pt");
                });
              },
              branding: false,
              plugins: ["fullscreen", "wordcount", "directionality"],
              directionality: "rtl",
              toolbar:
                "customsave fontsize | " +
                "bold italic | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "fullscreen",
            }}
          />
          <CopyButton
            onClick={() => {
              if (editorRef.current)
                navigator.clipboard.writeText(
                  editorRef.current.getContent({ format: "text" })
                );
            }}
            containerClassName={classes.CopyButton}
            style={{
              left: props.filesListAndEditorHTMLEditorScrollAppears ? 18 : 2,
            }}
          />
        </div>
      )}
    </Container>
  ) : (
    <></>
  );
});

const mapStateToProps = (state) => {
  return {
    ...state.OtherReducer,
    ...state.FilesListAndEditorReducer,
    ...state.AuthUserReducer,
  };
};

export default connect(
  mapStateToProps,
  {
    setFilesListAndEditorDrawerLastDownX,
    setFilesListAndEditorDrawerIsResizing,
    setFilesListAndEditorDrawerWidth,
    setFilesListAndEditorModDetails,
    setFilesListAndEditorFileListItems,
    setFilesListAndEditorArchiveFileListItems,
    setFilesListAndEditorInitValueEditor,
    setFilesListAndEditorAllFolderSearchFileListItems,
    setFilesListAndEditorHTMLEditorScrollAppears,
  },
  null,
  { forwardRef: true }
)(FilePreviewAndEditorContainer);
