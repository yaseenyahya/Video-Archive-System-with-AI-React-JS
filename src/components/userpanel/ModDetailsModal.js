import React, { useEffect, useRef } from "react";
import {
    Dialog,
    Button,
    DialogContent,
    DialogActions,
    Typography,
    DialogTitle,
    CircularProgress,
    IconButton,
    Container,
    Checkbox
} from "@mui/material";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import {
    setModDetailsModalData,
    setModDetailsModalNextPreviousIndex,
    setModDetailsModalDetailsText,
    setModDetailsModalTitleText,
    setModDetailsModalCorrectionCount,
    setModDetailsModalViewHistoryToggle,
    setModDetailsModalReset
} from "../../store/actions/ModDetailsModalActions";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useSnackbar } from "notistack";
import clsx from "clsx";
import DiffMatchPatch from "diff-match-patch";
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: "absolute!important",
        right: 5,
        top: 6,
        color: "white!important",
    },
    loadingContainer: {
        display: "flex!important",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
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
        padding: "0!important",
    },
    modDetailsTopContainer: {
        borderBottom: "1px solid #909090",
        borderTop: "1px solid #909090",
    },
    arrowPreviousButton: {
        padding: "0!important",
        borderRadius: "0px!important",
        borderRight: "1px solid #b1b1b1!important"
    },
    arrowPreviousButtonDisabled: {
        background: "#bfbdbd",
        color: "white!important",
    },
    arrowPreviousButtonIcon: {
        width: "30px!important",
        height: "30px!important",

    },

    arrowNextButton: {
        padding: "0!important",
        borderRadius: "0px!important",

    },
    arrowNextButtonDisabled: {
        background: "#bfbdbd",
        color: "white!important",
    },
    arrowNextButtonIcon: {
        width: "30px!important",
        height: "30px!important",
    },
    modDetailsTitleText: {
        display: "inline",
        textDecoration: "underline",
        marginLeft: "5px!important",
    },
    modDetailsNoContentText: {
        fontSize: 30,
        fontFamily: "system-ui",
        lineHeight: "37px",
        padding: 5,
    },
    modDetailsContentText: {
        padding: 5,
        fontSize: 30,
        fontFamily: "system-ui",
        lineHeight: "37px",

        "unicode-bidi": "plaintext",
        "-webkit-rtl-ordering": "logical",
        "flex-direction": "column",
        resize: "auto",
        cursor: "text",
        "white-space": "pre-wrap",
        "overflow-wrap": "break-word",
        padding: 5,
        textAlign: "right",
    },
    modDetailsModalCorrectionCount:{
        background: "orange",
        padding: 5,
        color: "white",
        position: "absolute",
        left: 0,
        bottom: 0,
    }
}));

const ModDetailsModal = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {

        props.setModDetailsModalReset();
    };

    useEffect(() => {
     
        if (props.modDetailsModalData.length > 0) {
            const currentIndex = props.modDetailsModalNextPreviousIndex;
            let title = "";
            let contentTextHtml = "";
            let correctionCount = 0;
 
            title =
                (currentIndex == props.modDetailsModalData.length - 1 ? "Created" : "Updated") +
                    ": " + moment(parseInt(props.modDetailsModalData[currentIndex].updatedAt)).format('MM/DD/YYYY')
                    +
                    " " + moment(parseInt(props.modDetailsModalData[currentIndex].updatedAt)).format('HH:mm:ss')
                    +
                    "  By: " +
                    props.modDetailsModalData[currentIndex].username

            if (props.modDetailsModalNextPreviousIndex < props.modDetailsModalData.length - 1) {
                let currentContent = props.modDetailsModalData[currentIndex].transcriptionText;

                let nextContent = props.modDetailsModalData[currentIndex + 1].transcriptionText;
                const DIFF = new DiffMatchPatch();
                let diffs = DIFF.diff_main(nextContent, currentContent);

                DIFF.diff_cleanupSemantic(diffs);
                correctionCount =
                    diffs.filter(function (itm) {
                        return (
                            itm[0] == DiffMatchPatch.DIFF_DELETE ||
                            itm[0] == DiffMatchPatch.DIFF_INSERT
                        );
                    }).length;

                diffs.map((itm) => {
                    if (itm[0] == DiffMatchPatch.DIFF_INSERT) {
                        let color = "#4a924d";
                        let textDecorationLine = "none";
                        contentTextHtml = `${contentTextHtml}<span style="font-weight: bold;${(itm[1].replace(/^\s+|\s+$/gm, '') == ""
                            ? "background:green;"
                            : "color: " + color)}">${itm[1]}</span>`;

                        //PrevnewSpan.ForeColor = Color.Blue;
                        //PrevnewSpan.Tag = "HistoryInserted," + MOD_DetailsList[CurrentIndex].UserName + "," + MOD_DetailsList[CurrentIndex].CreationTime;
                    } else if (itm[0] == DiffMatchPatch.DIFF_DELETE) {
                        let color = "#d23431";
                        let textDecorationLine = "line-through";
                        contentTextHtml = `${contentTextHtml}<span style="color: ${color};text-decoration: ${textDecorationLine};vertical-align: super;">${itm[1]}</span>`;
                    } else {
                        contentTextHtml = `${contentTextHtml}${itm[1]}`;
                    }
                });
                contentTextHtml = `${contentTextHtml}`;
            } else {
                correctionCount = 0;
                contentTextHtml = `${props.modDetailsModalData[currentIndex].transcriptionText
                    }`;
            }
            props.setModDetailsModalDetailsText(contentTextHtml);
            props.setModDetailsModalTitleText(title);
            props.setModDetailsModalCorrectionCount(correctionCount);
        }
    
    }, [props.modDetailsModalNextPreviousIndex, props.modDetailsModalData]);

   

    const getModDetailByFileIdQuery = gql`
    query getModDetailByFileId(
        $fileId: String!
    ) {
        get_mod_detail_by_file_id(
            fileId: $fileId
        ) {
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
        getModDetailByFileId,
        {
            loading: getModDetailByFileIdQueryLoading,
            error: getModDetailByFileIdQueryError,
            data: getModDetailByFileIdQueryResult,
        },
    ] = useLazyQuery(getModDetailByFileIdQuery, {
        fetchPolicy: "network-only"
    });

    useEffect(() => {
        if (getModDetailByFileIdQueryError) {
            getModDetailByFileIdQueryError.graphQLErrors.map(({ message }, i) => {
                enqueueSnackbar(message, { variant: "error" });

            });
        }
    }, [getModDetailByFileIdQueryError]);

    useEffect(() => {

        if (getModDetailByFileIdQueryResult && getModDetailByFileIdQueryResult.get_mod_detail_by_file_id) {

            props.setModDetailsModalData(getModDetailByFileIdQueryResult.get_mod_detail_by_file_id);
        }
    }, [getModDetailByFileIdQueryResult]);

    useEffect(() => {
        getModDetailByFileId({
            variables: {
                fileId: props.fileId

            }
        });
      
    }, [props.fileId])

    const previousDisabled = props.modDetailsModalNextPreviousIndex == 0;
    const nextDisabled = props.modDetailsModalNextPreviousIndex == (props.modDetailsModalData.length - 1);
    return (
        <Dialog
            aria-labelledby="customized-dialog-title"
            open={props.modDetailsModalToggle}
            onClose={handleClose}

            fullScreen
        >
            <DialogTitle
                onClose={handleClose}
                id="customized-dialog-title"
                className={classes.dialogTitle}
            >
                <Typography variant="h6" className={classes.dialogTitleText}>
                    Modification Details
                </Typography>
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers className={classes.dialogContent}>
                {getModDetailByFileIdQueryLoading ?
                    <Container className={classes.loadingContainer}>
                        <CircularProgress />
                    </Container> :
                    <>
                     
                        <Container
                            maxWidth={true}
                            disableGutters={true}
                            className={classes.modDetailsTopContainer}
                        >
                      
                            <Button
                                variant="contained"
                                onClick={() => {
                                    props.setModDetailsModalNextPreviousIndex(props.modDetailsModalNextPreviousIndex - 1);
                                }}
                                className={clsx(classes.arrowPreviousButton, {
                                    [classes.arrowPreviousButtonDisabled]: previousDisabled,
                                })}
                                disabled={previousDisabled}
                            >
                                <ArrowLeftIcon className={classes.arrowPreviousButtonIcon} />
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    props.setModDetailsModalNextPreviousIndex(props.modDetailsModalNextPreviousIndex + 1);
                                }}
                                className={clsx(classes.arrowNextButton, {
                                    [classes.arrowNextButtonDisabled]: nextDisabled,
                                })}
                                disabled={nextDisabled}
                            >
                                <ArrowRightIcon className={classes.arrowNextButtonIcon} />
                            </Button>
                            <Typography className={classes.modDetailsTitleText}>
                                {props.modDetailsModalTitleText}
                            </Typography>

                        </Container>
                        <pre
                            dangerouslySetInnerHTML={{
                                __html: props.modDetailsModalDetailsText,
                            }}
                            className={clsx(classes.modDetailsContentText)}
                        ></pre>
                          <Typography className={classes.modDetailsModalCorrectionCount}>
                  {`${props.modDetailsModalCorrectionCount} correction found`}
                </Typography>
                    </>
                }
            </DialogContent>

        </Dialog>
    );
};

const mapStateToProps = (state) => {
    return { ...state.ModDetailsModalReducer, ...state.AuthUserReducer };
};

export default connect(mapStateToProps, {
    setModDetailsModalData,
    setModDetailsModalNextPreviousIndex,
    setModDetailsModalDetailsText,
    setModDetailsModalTitleText,
    setModDetailsModalCorrectionCount,
    setModDetailsModalViewHistoryToggle,
    setModDetailsModalReset
})(ModDetailsModal);
