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
    Grid,
    Avatar,
    FormControlLabel,
    Checkbox
} from "@mui/material";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import ValidationTextField from "../../otherComponents/ValidationTextField";
import { gql, useMutation,useLazyQuery } from "@apollo/client";
import {
    setCropImageModalImage,
    setCropImageModalToggle,
    setCropImageModalLoading,
} from "../../../store/actions/CropImageModalActions";
import {
    setFolderFilesModalToggle,
    setFolderFilesModalData
} from "../../../store/actions/FolderFilesModalActions";
import {
    setAddEditFoldersPathModalToggle,
    setAddEditFoldersPathModalType,
    setAddEditFoldersPathModalRowData,
    setAddEditFoldersPathModalPath,
    setAddEditFoldersPathModalFolderName,
    setAddEditFoldersPathModalIsLoading,
    setAddEditFoldersPathModalReset
} from "../../../store/actions/AddEditFoldersPathModalActions";
import { useSnackbar } from "notistack";
import FolderFilesModal from "./FolderFilesModal";

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: "absolute!important",
        right: 5,
        top: 6,
        color: "white!important",
    },
    textField: {
        width: "100%",
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

    checkboxLabel: {

    },
    submitButtonContainer: {
        display: "flex!important",
        alignItems: "center"

    }
}));

const AddEditFoldersPathModal = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const pathValidationFieldRef = useRef(null);
    const folderNameValidationFieldRef = useRef(null);

    const handleClose = () => {

        props.setAddEditFoldersPathModalReset();
    };

    useEffect(() => {
    
        if (props.modalType === "Edit") {
            if (props.addEditFoldersPathModalRowData) {
                props.setAddEditFoldersPathModalPath(props.addEditFoldersPathModalRowData.path);
                props.setAddEditFoldersPathModalFolderName(props.addEditFoldersPathModalRowData.folder_name);
            }
        }
    }, []);
    const getFoldersFilesFromPathQuery = gql`
    query getFoldersFilesFromPath(
        $folderPath: String!
    ) {
        get_folders_files_from_path(
            folderPath: $folderPath
        ) {
            id
            preview
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
      }
    }
  `;

    let [
        getFoldersFilesFromPath,
        {
            loading: getFoldersFilesFromPathQueryLoading,
            error: getFoldersFilesFromPathQueryError,
            data: getFoldersFilesFromPathQueryResult,
        },
    ] = useLazyQuery(getFoldersFilesFromPathQuery, {
        fetchPolicy: "network-only"
    });

    useEffect(() => {
        if (getFoldersFilesFromPathQueryError) {
            getFoldersFilesFromPathQueryError.graphQLErrors.map(({ message }, i) => {
                enqueueSnackbar(message, { variant: "error" });
              
            });
        }
    }, [getFoldersFilesFromPathQueryError]);

    useEffect(() => {
        if (getFoldersFilesFromPathQueryResult && getFoldersFilesFromPathQueryResult.get_folders_files_from_path) {
      
            props.setFolderFilesModalToggle(true);
            props.setFolderFilesModalData(getFoldersFilesFromPathQueryResult.get_folders_files_from_path);
        }
    }, [getFoldersFilesFromPathQueryResult]);

    const updateFolderPathMutation = gql`
        mutation updateFolderPath(
            $folder_path_id: ID!
            $path: String!
            $folder_name: String!
            ) {
                update_folder_path(
                    folder_path_id: $folder_path_id
                    path: $path
                    folder_name:$folder_name
                ) {
                success
                error
            }
        }
    `;

    const [updateFolderPath,
        { loading: updateFolderPathMutationLoading,
            error: updateFolderPathMutationError,
            data: updateFolderPathMutationResult }] = useMutation(updateFolderPathMutation);

    useEffect(() => {
        if (updateFolderPathMutationError) {
            updateFolderPathMutationError.graphQLErrors.map(({ message }, i) => {
                enqueueSnackbar(message, { variant: "error" });
            });
        }
    }, [updateFolderPathMutationError]);

    useEffect(() => {
        if (updateFolderPathMutationResult && updateFolderPathMutationResult.update_folder_path) {
            if (updateFolderPathMutationResult.update_folder_path.success) {
                enqueueSnackbar("Folder path updated successfully.", { variant: "success" });
                handleClose();
                props.getFoldersPathCallback();
            } else {
                enqueueSnackbar(updateFolderPathMutationResult.update_folder_path.error, {
                    variant: "error",
                });
            }
        }
    }, [updateFolderPathMutationResult]);

    const addFolderPathMutation = gql`
        mutation AddFolderPath(
            $path: String!
            $folder_name: String!) {
            add_folder_path(
                path: $path
                folder_name:$folder_name
                ) {
                success
                error
            }
        }
    `;

    const [addFolderPath, {
        loading: addFolderPathMutationLoading,
        error: addFolderPathMutationError,
        data: addFolderPathMutationResult }] = useMutation(addFolderPathMutation);

    useEffect(() => {
        if (addFolderPathMutationError) {
            addFolderPathMutationError.graphQLErrors.map(({ message }, i) => {
                enqueueSnackbar(message, { variant: "error" });
            });
        }
    }, [addFolderPathMutationError]);

    useEffect(() => {
        if (addFolderPathMutationResult && addFolderPathMutationResult.add_folder_path) {
            if (addFolderPathMutationResult.add_folder_path.success) {
                enqueueSnackbar("Folder Path added successfully.", { variant: "success" });
                handleClose();
                props.getFoldersPathCallback();
            } else {
                enqueueSnackbar(addFolderPathMutationResult.add_folder_path.error, {
                    variant: "error",
                });
            }
        }
    }, [addFolderPathMutationResult]);

    const isLoading = updateFolderPathMutationLoading || addFolderPathMutationLoading;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLoading) return;

        let isValid = true;

        if (!pathValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!folderNameValidationFieldRef.current.validateValue()) {
            isValid = false;
        }

        if (isValid) {
            try {
                if (props.modalType === "Edit") {
                    await updateFolderPath({
                        variables: {
                            folder_path_id: props.addEditFoldersPathModalRowData.id,
                            path: props.addEditFoldersPathModalPath,
                            folder_name: props.addEditFoldersPathModalFolderName,
                        },
                    });
                } else {
                    await addFolderPath({
                        variables: {
                            path: props.addEditFoldersPathModalPath,
                            folder_name: props.addEditFoldersPathModalFolderName,
                        },
                    });
                }
            } catch (e) {
                // Handle any errors here
            }
        }
    };

    return (
        <Dialog
        onKeyDown={(e)=>{
            if (e.key === 'Enter' && !e.ctrlKey) {
              
               handleSubmit(e);
              }
           }}
            aria-labelledby="customized-dialog-title"
            open={props.addEditFoldersPathModalToggle}
            onClose={handleClose}
        >
            <DialogTitle
                onClose={handleClose}
                id="customized-dialog-title"
                className={classes.dialogTitle}
            >
                <Typography variant="h6" className={classes.dialogTitleText}>
                    {`${props.modalType === "Edit" ? "Edit" : "Add"} Folder Path`}
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
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} ><Typography>Note: Directory must be available in server.</Typography></Grid>
                        <Grid item xs={12} md={6}>

                            <ValidationTextField
                                dirInput={true}
                                dirInputDisabled={getFoldersFilesFromPathQueryLoading}
                                handleDirInput={async () => {
                                    if (props.addEditFoldersPathModalPath != "") {
                                        try {
                                            await getFoldersFilesFromPath({
                                                variables: {
                                                    folderPath: props.addEditFoldersPathModalPath

                                                }
                                            });
                                        } catch (e) {

                                        }
                                    }
                                }}
                                type="text"
                                className={classes.textField}
                                InputProps={{
                                    classes: {},
                                }}
                                ref={pathValidationFieldRef}
                                value={props.addEditFoldersPathModalPath}
                                required
                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setAddEditFoldersPathModalPath(e.target.value)
                                }
                                label="Folder Path"
                                variant="outlined"
                            />
                           {props.folderFilesModalToggle && <FolderFilesModal/>}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationTextField
                                type="text"
                                className={classes.textField}
                                InputProps={{
                                    classes: {},
                                }}
                                ref={folderNameValidationFieldRef}
                                value={props.addEditFoldersPathModalFolderName}
                                required
                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setAddEditFoldersPathModalFolderName(e.target.value)
                                }
                                label="Folder Name"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions disableSpacing={true} className={classes.dialogActions}>
                <Container disableGutters={true} className={classes.submitButtonContainer}>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                        className={classes.submitButton}
                    >
                        {isLoading && <CircularProgress size={25} />}
                        {!isLoading && props.modalType === "Edit" ? "Save" : "Add"}
                    </Button>
                </Container>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (state) => {
    return { ...state.AddEditFoldersPathModalReducer, ...state.AuthUserReducer,...state.FolderFilesModalReducer  };
};

export default connect(mapStateToProps, {
    setCropImageModalImage,
    setCropImageModalToggle,
    setCropImageModalLoading,
    setAddEditFoldersPathModalToggle,
    setAddEditFoldersPathModalType,
    setAddEditFoldersPathModalRowData,
    setAddEditFoldersPathModalPath,
    setAddEditFoldersPathModalFolderName,
    setAddEditFoldersPathModalIsLoading,
    setAddEditFoldersPathModalReset,
    setFolderFilesModalToggle,
    setFolderFilesModalData
})(AddEditFoldersPathModal);
