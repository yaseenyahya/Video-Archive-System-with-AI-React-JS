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
import { gql, useMutation } from "@apollo/client";
import {
    setCropImageModalImage,
    setCropImageModalToggle,
    setCropImageModalLoading,
} from "../../../store/actions/CropImageModalActions";

import {
    setAddEditDesignationModalToggle,
    setAddEditDesignationModalType,
    setAddEditDesignationModalRowData,
    setAddEditDesignationModalDesignationName,
    setAddEditDesignationModalIsLoading,
    setAddEditDesignationModalReset
} from "../../../store/actions/AddEditDesignationModalActions";

import { useSnackbar } from "notistack";

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
    submitButtonContainer:{
        display: "flex!important",
        alignItems: "center"
   
    }
}));

const AddEditDesignationModal = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const designationNameValidationFieldRef = useRef(null);

    const handleClose = () => {
       
        props.setAddEditDesignationModalReset();
    };

    useEffect(() => {
        console.log(props.addEditDesignationModalRowData)
        if (props.modalType === "Edit") {
            if (props.addEditDesignationModalRowData) {
                props.setAddEditDesignationModalDesignationName(props.addEditDesignationModalRowData.name);
            }
        }
    }, []);

    const updateDesignationMutation = gql`
        mutation UpdateDesignation(
            $designation_id: ID!
            $name: String!
            ) {
            update_designation(
                designation_id: $designation_id
                name: $name
                ) {
                success
                error
            }
        }
    `;

    const [updateDesignation, 
        { loading: updateDesignationMutationLoading, 
            error: updateDesignationMutationError, 
            data: updateDesignationMutationResult}] = useMutation(updateDesignationMutation);

    useEffect(() => {
        if (updateDesignationMutationError) {
            updateDesignationMutationError.graphQLErrors.map(({ message }, i) => {
                enqueueSnackbar(message, { variant: "error" });
            });
        }
    }, [updateDesignationMutationError]);

    useEffect(() => {
        if (updateDesignationMutationResult && updateDesignationMutationResult.update_designation) {
            if (updateDesignationMutationResult.update_designation.success) {
                enqueueSnackbar("Designation updated successfully.", { variant: "success" });
                handleClose();
                props.getDesignationsCallback();
            } else {
                enqueueSnackbar(updateDesignationMutationResult.update_designation.error, {
                    variant: "error",
                });
            }
        }
    }, [updateDesignationMutationResult]);

    const addDesignationMutation = gql`
        mutation AddDesignation($name: String!) {
            add_designation(name: $name) {
                success
                error
            }
        }
    `;

    const [addDesignation, { 
        loading: addDesignationMutationLoading,
         error: addDesignationMutationError,
         data: addDesignationMutationResult }] = useMutation(addDesignationMutation);

    useEffect(() => {
        if (addDesignationMutationError) {
            addDesignationMutationError.graphQLErrors.map(({ message }, i) => {
                enqueueSnackbar(message, { variant: "error" });
            });
        }
    }, [addDesignationMutationError]);

    useEffect(() => {
        if (addDesignationMutationResult && addDesignationMutationResult.add_designation) {
            if (addDesignationMutationResult.add_designation.success) {
                enqueueSnackbar("Designation added successfully.", { variant: "success" });
                handleClose();
                props.getDesignationsCallback();
            } else {
                enqueueSnackbar(addDesignationMutationResult.add_designation.error, {
                    variant: "error",
                });
            }
        }
    }, [addDesignationMutationResult]);

    const isLoading = updateDesignationMutationLoading || addDesignationMutationLoading;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLoading) return;

        let isValid = true;

        if (!designationNameValidationFieldRef.current.validateValue()) {
            isValid = false;
        }

        if (isValid) {
            try {
                if (props.modalType === "Edit") {
                    await updateDesignation({
                        variables: {
                            designation_id: props.addEditDesignationModalRowData.id,
                            name:  props.addEditDesignationModalDesignationName
                        },
                    });
                } else {
                    await addDesignation({
                        variables: {
                            name: props.addEditDesignationModalDesignationName,
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
            aria-labelledby="customized-dialog-title"
            open={props.addEditDesignationModalToggle}
            onClose={handleClose}
            onKeyDown={(e)=>{
                if (e.key === 'Enter' && !e.ctrlKey) {
                  
                   handleSubmit(e);
                  }
               }}
        >
            <DialogTitle
                onClose={handleClose}
                id="customized-dialog-title"
                className={classes.dialogTitle}
            >
                <Typography variant="h6" className={classes.dialogTitleText}>
                    {`${props.modalType === "Edit" ? "Edit" : "Add"} Designation`}
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
                        <Grid item xs={12} md={12}>
                            <ValidationTextField
                                type="text"
                                className={classes.textField}
                                InputProps={{
                                    classes: {},
                                }}
                                ref={designationNameValidationFieldRef}
                                value={props.addEditDesignationModalDesignationName}
                                required
                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setAddEditDesignationModalDesignationName(e.target.value)
                                }
                                label="Designation Name"
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
    return { ...state.AddEditDesignationModalReducer, ...state.AuthUserReducer };
};

export default connect(mapStateToProps, {
    setCropImageModalImage,
    setCropImageModalToggle,
    setCropImageModalLoading,
    setAddEditDesignationModalToggle,
    setAddEditDesignationModalType,
    setAddEditDesignationModalRowData,
    setAddEditDesignationModalDesignationName,
    setAddEditDesignationModalIsLoading,
    setAddEditDesignationModalReset
})(AddEditDesignationModal);
