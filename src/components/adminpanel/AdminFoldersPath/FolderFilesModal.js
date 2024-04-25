import React, { useEffect, useRef } from "react";
import {
    Dialog,
    Button,
    DialogContent,
    DialogActions,
    Typography,
    DialogTitle,
    IconButton,
    Container,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import {
    setFolderFilesModalToggle,
    setFolderFilesModalData,
    setFolderFilesModalReset
} from "../../../store/actions/FolderFilesModalActions";

const useStyles = makeStyles((theme) => ({
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
    filesListItem:{
        display: 'list-item!important',
        background: "#fbfbfb",
    marginBottom: 12
    },
    submitButton: {
        fontSize: 17,
        width: "200px",
        borderRadius: 0,
        margin: "auto!important",
        color: "white!important",
    },

    dialogContent: {
        minWidth: 220,
    },


    submitButtonContainer: {
        display: "flex!important",
        alignItems: "center"

    }
}));

const AddEditFoldersPathModal = (props) => {
    const classes = useStyles();


    const handleClose = () => {

        props.setFolderFilesModalReset();
    };




    return (
        <Dialog
            aria-labelledby="customized-dialog-title"
            open={props.folderFilesModalToggle}
            onKeyDown={(e)=>{
                if (e.key === 'Enter' && !e.ctrlKey) {
                  
                    handleClose();
                  }
               }}
            onClose={handleClose}
        >
            <DialogTitle
                onClose={handleClose}
                id="customized-dialog-title"
                className={classes.dialogTitle}
            >
                <Typography variant="h6" className={classes.dialogTitleText}>
                    Files List
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
                {
                    props.folderFilesModalData.length > 0 ?
                        <List component="ol"  
                        >

                            {props.folderFilesModalData.map((item) => {
                                return (
                                    <ListItem className={classes.filesListItem} key={item.filename}>
                                        <ListItemText primary={item.filename} />
                                    </ListItem>
                                );
                            })}




                        </List> : <Typography>No files are available in this folder.</Typography>
                }
            </DialogContent>
            <DialogActions disableSpacing={true} className={classes.dialogActions}>
                <Container disableGutters={true} className={classes.submitButtonContainer}>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        type="submit"

                        className={classes.submitButton}
                    >
                        OK
                    </Button>
                </Container>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (state) => {
    return { ...state.FolderFilesModalReducer };
};

export default connect(mapStateToProps, {
    setFolderFilesModalToggle,
    setFolderFilesModalData,
    setFolderFilesModalReset
})(AddEditFoldersPathModal);
