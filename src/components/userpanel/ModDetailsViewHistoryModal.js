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

    setModDetailsModalViewHistoryToggle,
    setModDetailsModalReset
} from "../../store/actions/ModDetailsModalActions";
import { useSnackbar } from "notistack";

import momenttz from "moment-timezone";
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
        minWidth:200,
        minHeight:"150px"
    },
   
     modDetailsModalReadDetailsText: {
        borderBottom: "1px solid #cccccc",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
      },
}));

const ModDetailsViewHistoryModal = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {

        props.setModDetailsModalViewHistoryToggle(false);
    };

   
    const getUsersViewHistoryQuery = gql`
    query getUsersViewHistory(
        $userId: ID!
        $fileId: ID!
    ) {
        get_users_view_history(
            userId: $userId
            fileId: $fileId
        ) {
            id
            user{
                username
                name
               }
    createdAt
      }
    }
  `;

    let [
        getUsersViewHistory,
        {
            loading: getUsersViewHistoryQueryLoading,
            error: getUsersViewHistoryQueryError,
            data: getUsersViewHistoryQueryResult,
        },
    ] = useLazyQuery(getUsersViewHistoryQuery, {
        fetchPolicy: "network-only"
    });

 

  
    useEffect(() => {
      if(props.modDetailsModalViewHistoryToggle){
       
        getUsersViewHistory({
            variables: {
                userId:props.authUserId,
                fileId: props.fileId

            }
        });
    }
    }, [props.modDetailsModalViewHistoryToggle])

  
    return (
        <Dialog
            aria-labelledby="customized-dialog-title"
            open={props.modDetailsModalViewHistoryToggle}
            onClose={handleClose}
            maxWidth={120}
       
        >
            <DialogTitle
                onClose={handleClose}
                id="customized-dialog-title"
                className={classes.dialogTitle}
            >
                <Typography variant="h6" className={classes.dialogTitleText}>
                    View History
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
                {getUsersViewHistoryQueryLoading ?
                    <Container className={classes.loadingContainer}>
                        <CircularProgress />
                    </Container> :
                    <>
                     {props.modDetailsModalViewHistoryToggle && (
                <Container disableGutters={true} maxWidth={true}>
                  {getUsersViewHistoryQueryResult && getUsersViewHistoryQueryResult.get_users_view_history.length > 0 ?
                  
                   getUsersViewHistoryQueryResult.get_users_view_history.map((item, index) => (
                    <Typography
                      className={classes.modDetailsModalReadDetailsText}
                      key={index}
                    >
                      {item.user.username + " on " + momenttz(item.createdAt).utcOffset(0).format('MM/DD/YYYY') + " " + momenttz(item.createdAt).utcOffset(0).format('hh:mm:ss A')}
                    </Typography>
                  )) : <Typography
                  className={classes.modDetailsModalReadDetailsText}
                  
                >
                  "No history available."
                </Typography>}
                </Container>
              )}
                       
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

    setModDetailsModalViewHistoryToggle,
    setModDetailsModalReset
})(ModDetailsViewHistoryModal);
