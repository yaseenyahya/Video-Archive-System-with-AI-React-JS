import React, { useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { Container, Button, Tooltip, Skeleton, Typography } from '@mui/material';
import { connect } from 'react-redux';
import PrintIcon from '@mui/icons-material/Print';
import DownloadButton from '../../otherComponents/DownloadButton';
import resolvesettings from "../../resolvesettings";
import ModDetailsModal from "../ModDetailsModal";
import {
    setModDetailsModalToggle,
    setModDetailsModalViewHistoryToggle,
} from "../../../store/actions/ModDetailsModalActions";
import Visibility from "@mui/icons-material/Visibility";
import ModDetailsViewHistoryModal from "../ModDetailsViewHistoryModal";
import { useMutation, gql } from "@apollo/client";
const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: "flex!important",
        borderTop: "1px solid gray",
        borderBottom: "1px solid gray",
    },
    printButton: {
        backgroundColor: "#504e4e!important",
        borderRadius: "0!important",
        width: "auto!important",
        minWidth: "auto!important",
        paddingRight: "5px!important",
        paddingLeft: "5px!important"
    },
    lastModBy: {
        display: "flex!important",
        justifyContent: "center",
        alignItems: "center",
     
   
        height:"36px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    lastModBySkeleton: {
        width: "50%",
        marginRight: 10
    },
    lastModByText: {
        fontStyle: "italic",
        textDecoration: "underline",
        cursor: "pointer",
        overflow: "hidden",
        textOverflow: "ellipsis",
        '@media (max-width:600px)': {
            fontSize: "13px!important", // Font size for xs
          },
          '@media (min-width:600px) and (max-width:960px)': {
            fontSize: "16px!important", // Font size for sm
          },
    },
    savingText: {
        color: "green"
    }, 
    viewHistoryButtonIcon:{
        color:"black"
    },
    viewHistoryButton:{
        borderRadius: "0!important",
        width: "auto!important",
        minWidth: "auto!important",
        paddingRight: "5px!important",
        paddingLeft: "5px!important"
    }
}));

const EditorTopHeader = (props) => {

    const classes = useStyles();

    const addDownloadHistoryMutation = gql`
    mutation addDownloadHistory(
        $userId: ID!
        $fileId: ID!
    ) {
        add_download_history(
        userId: $userId
        fileId:   $fileId
      ) {
        success
        error
      }
    }
  `;

    const [
        addDownloadHistory,
        {
            loading: addDownloadHistoryMutationLoading,
            error: addDownloadHistoryMutationError,
            data: addDownloadHistoryMutationResult,
        },
    ] = useMutation(addDownloadHistoryMutation);



    const serverAddress = `${props.configData.serverip}${props.configData.port !== '' ? ':' + props.configData.port : ''}`;
    const folderPathSegments = props.filesListAndEditorSelectedFileItem.folder.path.split('\\');
    const lastFolderSegment = folderPathSegments[folderPathSegments.length - 1];
    return (
        <Container disableGutters={true} maxWidth={false} className={classes.mainContainer}>
            <Button variant={"contained"} className={classes.printButton}
                onClick={() => {
                    props.onPrint();
                }
                }>
                <Tooltip title="Print">
                    <PrintIcon />
                </Tooltip>
            </Button>
   
                 <Button
                  onClick={() => {
                    props.setModDetailsModalViewHistoryToggle(
                      !props.modDetailsModalViewHistoryToggle
                    );
                  }}
                  className={classes.viewHistoryButton}
                >
                  <Visibility className={classes.viewHistoryButtonIcon} />
                </Button>
                <ModDetailsViewHistoryModal fileId={props.filesListAndEditorSelectedFileItem.id}/>
            <Container className={classes.lastModBy}>
                {props.isSavingTranscription ? <Typography className={classes.savingText}>Saving...</Typography> :
                    props.lastModDetailLoading ? <><Skeleton className={classes.lastModBySkeleton} /><Skeleton className={classes.lastModBySkeleton} /></> : <Typography onClick={() => {

                        props.setModDetailsModalToggle(true);

                    }} className={classes.lastModByText}>{props.lastModDetail}</Typography>}
            </Container>
            {(new resolvesettings().getUserAllowDownload(props.authUserSettingsJson)) && <DownloadButton
                filename={props.filesListAndEditorSelectedFileItem.filename}
                onFileDownloadedComplete={() => {
                    try {
                        addDownloadHistory({
                            variables: {
                                userId: props.authUserId,
                                fileId: props.filesListAndEditorSelectedFileItem.id
                            }
                        });
                    } catch (e) {
                        console.log("Download history error", e);
                    }
                }}
                fileUrl={`${serverAddress}/${lastFolderSegment}/${props.filesListAndEditorSelectedFileItem.filename}`}
                disabled={
                    props.filesListAndEditorSelectedFileItem.deleted} >

            </DownloadButton>
            }
            {props.modDetailsModalToggle && <ModDetailsModal fileId={props.filesListAndEditorSelectedFileItem.id} />}
        </Container>
    );
};

const mapStateToProps = (state) => {
    return { ...state.ModDetailsModalReducer, ...state.OtherReducer, ...state.FilesListAndEditorReducer, ...state.AuthUserReducer };
};

export default connect(mapStateToProps, {
    setModDetailsModalToggle,
    setModDetailsModalViewHistoryToggle
})(EditorTopHeader);
