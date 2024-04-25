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
import ValidationSelectField from "../../otherComponents/ValidationSelectField";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import {
    setCropImageModalImage,
    setCropImageModalToggle,
    setCropImageModalLoading,
} from "../../../store/actions/CropImageModalActions";

import {
    setAddEditUserModalToggle,
    setAddEditUserModalAvatar,
    setAddEditUserModalName,
    setAddEditUserModalEmail,
    setAddEditUserModalDesignationId,
    setAddEditUserModalRole,
    setAddEditUserModalStatus,
    setAddEditUserModalBlockComments,
    setAddEditUserModalAllowEdit,
    setAddEditUserModalAllowDownload,
    setAddEditUserModalUsername,
    setAddEditUserModalCountryRegion,
    setAddEditUserModalContactNumber,
    setAddEditUserModalNewPassword,
    setAddEditUserModalIsLoading,
    setAddEditUserModalReset
} from "../../../store/actions/AddEditUserModalActions";
import ImageCropper from "../../profileEditModal/ImageCropper";
import { useSnackbar } from "notistack";
import ValidationMobileField from "../../otherComponents/ValidationMobileField";
import clsx from "clsx";
import { PhoneNumberUtil } from 'google-libphonenumber';
import PanelType from "../../../auth/PanelType";
import resolvesettings from "../../resolvesettings";
import FoldersList from "./FoldersList";
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
    profilePicAddButton: {
        border: "1px dashed gray",
        borderRadius: "50%",
        padding: "0px!important",
        margin: "auto",
        display: "block",
    },
    profilePicAddButtonContainer: {
        display: "flex!important"
    },
    profilePictureAddImage: {
        width: "100px",
        borderRadius: "50%",
        height: "100px",
        marginRight: 5,
    },
    dialogContent: {
        minWidth: 220,
    },
    newPasswordTextField: {
        background: "#e3ffe5",
    },
    avatar: {
        width: "55px!important",
        height: "55px!important",
        marginRight: "7px"
    },
    checkboxLabel: {

    },
    submitButtonContainer: {
        display: "flex!important",
        alignItems: "center"

    }
}));

const AddEditUserModal = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const nameValidationFieldRef = useRef(null);
    const emailValidationFieldRef = useRef(null);
    const mobileValidationFieldRef = useRef(null);
    const statusValidationFieldRef = useRef(null);
    const roleValidationFieldRef = useRef(null);
    const designationValidationFieldRef = useRef(null);
    const usernameValidationFieldRef = useRef(null);
    const newPasswordValidationFieldRef = useRef(null);



    const profilePicAddButtonRef = useRef(null);
    const handleClose = () => {

        props.setAddEditUserModalReset();
    };
    const getDesignationsQuery = gql`
    query GetDesignations {
        get_designations {
            id
            name
        }
    }
`;

    let [
        getDesignations,
        { loading: getDesignationsQueryLoading, error: getDesignationsQueryError, data: getDesignationsQueryResult },
    ] = useLazyQuery(getDesignationsQuery, {
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        getDesignations();
        const defaultCountryCode = "+92";
        if (props.modalType == "Edit") {
            if (props.addEditUserModalRowData) {
                props.setAddEditUserModalAvatar(props.addEditUserModalRowData.avatar);
                props.setAddEditUserModalName(props.addEditUserModalRowData.name);
                props.setAddEditUserModalEmail(props.addEditUserModalRowData.email);
                props.setAddEditUserModalDesignationId(props.addEditUserModalRowData.designation.id);
                props.setAddEditUserModalRole(props.addEditUserModalRowData.role);
                props.setAddEditUserModalStatus(props.addEditUserModalRowData.status);
                props.setAddEditUserModalBlockComments(props.addEditUserModalRowData.block_comments);

                props.setAddEditUserModalAllowEdit((new resolvesettings().getUserAllowEdit(props.addEditUserModalRowData.settings_json)));
                props.setAddEditUserModalAllowDownload((new resolvesettings().getUserAllowDownload(props.addEditUserModalRowData.settings_json)));

                props.setAddEditUserModalUsername(props.addEditUserModalRowData.username);
           
                const countryCode = props.addEditUserModalRowData.country_code || "";
                const contactNumber = props.addEditUserModalRowData.contact_no || "";


                const formattedContactNumber = (countryCode.toString() + contactNumber) || defaultCountryCode;

                props.setAddEditUserModalContactNumber(formattedContactNumber)

            }

        } else {

            props.setAddEditUserModalContactNumber(defaultCountryCode);
            props.setAddEditUserModalRole("User");
            props.setAddEditUserModalStatus("Active");
        }

    }, []);


    const updateUserMutation = gql`
        mutation UpdateUser(
            $user_id: ID!
            $name: String!
            $avatar: String
            $email: String
            $country_code: String
            $contact_no: String
            $status: StatusType!
            $block_comments: String
            $role: RoleType!
            $username: String!
            $password: String
            $settings_json:String
            $designation_id: Int
        ) {
            update_user(
                user_id: $user_id
            name:$name
            avatar: $avatar
            email: $email
            country_code:  $country_code
            contact_no: $contact_no
            status:  $status
            block_comments: $block_comments
            role: $role
            username:  $username
            password: $password
            settings_json:$settings_json
            designation_id: $designation_id
            ) {
                success
                error
            }
        }
    `;

    const [
        updateUser,
        {
            loading: updateUserMutationLoading,
            error: updateUserMutationError,
            data: updateUserMutationResult,
        },
    ] = useMutation(updateUserMutation);

    useEffect(() => {
        if (updateUserMutationError) {
            updateUserMutationError.graphQLErrors.map(({ message }, i) => {
                enqueueSnackbar(message, { variant: "error" });
            });
        }
    }, [updateUserMutationError]);

    useEffect(() => {
        if (updateUserMutationResult && updateUserMutationResult.update_user) {
            if (updateUserMutationResult.update_user.success) {
                enqueueSnackbar("User updated successfully.", { variant: "success" });

                handleClose();
                props.getUsersCallback();
            } else {
                enqueueSnackbar(updateUserMutationResult.update_user.error, {
                    variant: "error",
                });
            }
        }
    }, [updateUserMutationResult]);


    const addUserMutation = gql`
        mutation AddUser(
            $name: String!
            $avatar: String
            $email: String
            $country_code: String
            $contact_no: String
            $status: StatusType!
            $block_comments: String
            $role: RoleType!
            $username: String!
            $password: String
            $settings_json:String
            $designation_id: Int
        ) {
            add_user(
            name:$name
            avatar: $avatar
            email: $email
            country_code:  $country_code
            contact_no: $contact_no
            status:  $status
            block_comments: $block_comments
            role: $role
            username:  $username
            password: $password
            settings_json:$settings_json
            designation_id: $designation_id
            ) {
                success
                error
            }
        }
    `;

    const [
        addUser,
        {
            loading: addUserMutationLoading,
            error: addUserMutationError,
            data: addUserMutationResult,
        },
    ] = useMutation(addUserMutation);

    useEffect(() => {
        if (addUserMutationError) {
            addUserMutationError.graphQLErrors.map(({ message }, i) => {
                enqueueSnackbar(message, { variant: "error" });
            });
        }
    }, [addUserMutationError]);

    useEffect(() => {
        if (addUserMutationResult && addUserMutationResult.add_user) {
            if (addUserMutationResult.add_user.success) {
                enqueueSnackbar("User added successfully.", { variant: "success" });

                handleClose();
                props.getUsersCallback();
            } else {
                enqueueSnackbar(addUserMutationResult.update_user.error, {
                    variant: "error",
                });
            }
        }
    }, [addUserMutationResult]);


    let isLoading = updateUserMutationLoading || addUserMutationLoading;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLoading) return;

        let isValid = true;

        if (!nameValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!emailValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!mobileValidationFieldRef.current.validatePhoneNumber()) {
            isValid = false;
        }

        if (!statusValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!roleValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!designationValidationFieldRef.current.validateValue()) {
            isValid = false;
        }
        if (!usernameValidationFieldRef.current.validateValue()) {
            isValid = false;
        }

        if (!newPasswordValidationFieldRef.current.validateValue()) {
            isValid = false;
        }

        const phoneUtil = PhoneNumberUtil.getInstance();

        // Replace 'pk' with the ISO 3166-1 alpha-2 country code of your choice
        const country = props.addEditUserModalCountryRegion;


        const countryCode = phoneUtil.getCountryCodeForRegion(country);

        // Prepend '+' to the dial code
        const formattedDialCode = `+${countryCode}`;

        const phoneWithoutCode = props.addEditUserModalContactNumber.replace(/\s/g, '').replace(formattedDialCode, '');

        if (isValid) {
            try {
                if (props.modalType == "Edit") {
                    await updateUser({
                        variables: {
                            user_id: props.addEditUserModalRowData.id,
                            name: props.addEditUserModalName,
                            avatar: props.addEditUserModalAvatar,
                            email: props.addEditUserModalEmail,
                            country_code: phoneWithoutCode.length > 0 ? formattedDialCode : undefined,
                            contact_no: phoneWithoutCode.length > 0 ? phoneWithoutCode : undefined,
                            status: props.addEditUserModalStatus,
                            block_comments:props.addEditUserModalStatus == "Block" ? props.addEditUserModalBlockComments: "",
                            role: props.addEditUserModalRole,
                            username: props.addEditUserModalUsername,
                            password: props.addEditUserModalNewPassword.length > 0 ? props.addEditUserModalNewPassword : undefined,
                            settings_json: JSON.stringify({ 
                                allowEdit: props.addEditUserModalAllowEdit, 
                                allowDownload: props.addEditUserModalAllowDownload, 
                                allowFoldersId: props.addEditUserModalAllowFoldersId, 
                                startupFolder: props.addEditUserModalStartupFolder 
                            }),
                            designation_id: parseInt(props.addEditUserModalDesignationId)
                        },
                    });
                } else {

                    await addUser({
                        variables: {
                            name: props.addEditUserModalName,
                            avatar: props.addEditUserModalAvatar,
                            email: props.addEditUserModalEmail,
                            country_code: phoneWithoutCode.length > 0 ? formattedDialCode : undefined,
                            contact_no: phoneWithoutCode.length > 0 ? phoneWithoutCode : undefined,
                            status: props.addEditUserModalStatus,
                            block_comments:props.addEditUserModalStatus == "Block" ? props.addEditUserModalBlockComments: "",
                            role: props.addEditUserModalRole,
                            username: props.addEditUserModalUsername,
                            password: props.addEditUserModalNewPassword.length > 0 ? props.addEditUserModalNewPassword : undefined,
                            settings_json: JSON.stringify({ 
                                allowEdit: props.addEditUserModalAllowEdit, 
                                allowDownload: props.addEditUserModalAllowDownload, 
                                allowFoldersId: props.addEditUserModalAllowFoldersId, 
                                startupFolder: props.addEditUserModalStartupFolder 
                            }),
                            designation_id: parseInt(props.addEditUserModalDesignationId)
                        },
                    });
                }
            } catch (e) {

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
            open={props.addEditUserModalToggle}
            onClose={handleClose}

        >
            <DialogTitle
                onClose={handleClose}
                id="customized-dialog-title"
                className={classes.dialogTitle}
            >
                <Typography variant="h6" className={classes.dialogTitleText}>
                    {`${props.modalType == "Edit" ? "Edit" : "Add"} User`}
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
                        <Grid item xs={12} md={6}>
                            <Container disableGutters={true} className={classes.profilePicAddButtonContainer}>
                                <input
                                    onChange={(event) => {
                                        if (event.target.files.length > 0) {
                                            let reader = new FileReader();
                                            reader.readAsDataURL(event.target.files[0]);
                                            reader.onload = function () {
                                                props.setCropImageModalImage(reader.result);
                                                props.setCropImageModalToggle(true);
                                            };
                                            reader.onerror = function (error) {
                                                alert("Error: ", error);
                                            };
                                        }
                                    }}
                                    ref={profilePicAddButtonRef}
                                    accept="image/*"
                                    disabled={isLoading}
                                    className={classes.profilePicAddButton}
                                    style={{ display: "none" }}
                                    id="raised-button-file"
                                    name="raised-button-file"
                                    multiple={false}
                                    type="file"
                                />

                                <Button
                                    onClick={() => {
                                        profilePicAddButtonRef.current.click();
                                    }}
                                    className={classes.profilePicAddButton}
                                >
                                    <Avatar
                                        className={classes.avatar}
                                        alt="User Avatar"
                                        src={props.addEditUserModalAvatar ? props.addEditUserModalAvatar : null}
                                    />
                                </Button>
                                <ImageCropper
                                    onImageCropCompleted={(croppedImage) => {

                                        props.setAddEditUserModalAvatar(croppedImage);
                                    }}
                                />

                                <ValidationTextField
                                    type="text"
                                    className={classes.textField}
                                    InputProps={{
                                        classes: {},
                                    }}
                                    ref={nameValidationFieldRef}
                                    value={props.addEditUserModalName}
                                    required
                                    disabled={isLoading}
                                    onInput={(e) =>
                                        props.setAddEditUserModalName(e.target.value)
                                    }
                                    label="Full Name"
                                    variant="outlined"
                                />
                            </Container>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationTextField
                                type="text"
                                emailtext={true}
                                className={classes.textField}
                                value={props.addEditUserModalEmail}
                                InputProps={{
                                    classes: {},
                                }}
                                ref={emailValidationFieldRef}
                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setAddEditUserModalEmail(e.target.value)
                                }
                                label="Email"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationMobileField
                                value={props.addEditUserModalContactNumber}
                                refProp={mobileValidationFieldRef}
                                disabled={isLoading}
                                onChange={(value) => {

                                    props.setAddEditUserModalCountryRegion(value.country);
                                    props.setAddEditUserModalContactNumber(value.phone);
                                }
                                }
                                className={classes.textField}
                                id="mobileTextField"
                                label="Mobile"
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <ValidationSelectField
                                className={classes.textField}
                                value={
                                    props.addEditUserModalStatus
                                }
                                ref={statusValidationFieldRef}
                                values={[
                                    ["Active", "ACTIVE"],
                                    ["Block", "BLOCKED"]
                                ]}
                                disabled={isLoading}
                                onChange={(e) => {

                                    props.setAddEditUserModalStatus(e.target.value);
                                }}
                                label="Select Status *"
                                required
                            />
                        </Grid>
                        { props.addEditUserModalStatus == "Block" &&
                        <Grid item xs={12} md={12}>
                            <ValidationTextField
                              
                                multiline={true}
                                className={clsx(classes.textField, classes.newBlockTextField)}
                                value={props.addEditUserModalBlockComments}
                                InputProps={{
                                    classes: {},
                                }}
                                ref={newPasswordValidationFieldRef}

                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setAddEditUserModalBlockComments(e.target.value)
                                }
                                required={true}
                                label={"Block Comments"}
                                variant="outlined"
                            />
                        </Grid>
}
                        <Grid item xs={12} md={6}>
                            <ValidationSelectField
                                className={classes.textField}
                                value={
                                    props.addEditUserModalRole
                                }
                                ref={roleValidationFieldRef}
                                values={[
                                    ["Admin", "ADMIN"],
                                    ["User", "USER"]
                                ]}
                                disabled={isLoading}
                                onChange={(e) => {
                                    props.setAddEditUserModalRole(e.target.value);
                                }}
                                label="Select Role *"
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ValidationSelectField
                                className={classes.textField}
                                value={
                                    props.addEditUserModalDesignationId
                                }
                                ref={designationValidationFieldRef}
                                disabled={isLoading || getDesignationsQueryLoading}
                                values={getDesignationsQueryResult && getDesignationsQueryResult.get_designations && getDesignationsQueryResult.get_designations.map(designation => [
                                    designation.id,
                                    designation.name
                                ])}
                                placeholder={"Select Designation"}
                                onChange={(e) => {

                                    props.setAddEditUserModalDesignationId(e.target.value);
                                }}
                                label="Select Designation *"
                                required={true}
                            />
                        </Grid>
                        {props.addEditUserModalRole == PanelType.User &&
                            <>
                                <Grid item xs={12} md={6}>
                                    <FormControlLabel
                                        classes={{ label: classes.checkboxLabel }}
                                        control={
                                            <Checkbox
                                                checked={props.addEditUserModalAllowEdit}
                                                onChange={(event) => {
                                                    props.setAddEditUserModalAllowEdit(
                                                        event.target.checked
                                                    );
                                                }}
                                                inputProps={{ "aria-label": "secondary checkbox" }}
                                            />
                                        }
                                        label={"Allow Edit"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControlLabel
                                        classes={{ label: classes.checkboxLabel }}
                                        control={
                                            <Checkbox
                                                checked={props.addEditUserModalAllowDownload}
                                                onChange={(event) => {
                                                    props.setAddEditUserModalAllowDownload(
                                                        event.target.checked
                                                    );
                                                }}
                                                inputProps={{ "aria-label": "secondary checkbox" }}
                                            />
                                        }
                                        label={"Allow Download"}
                                    />
                                </Grid>

                            </>
                        }
                        <Grid item xs={12} md={6}>
                            <ValidationTextField
                                type="text"
                                className={classes.textField}
                                value={props.addEditUserModalUsername}
                                InputProps={{
                                    classes: {},
                                }}
                                ref={usernameValidationFieldRef}
                                required
                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setAddEditUserModalUsername(e.target.value)
                                }
                                label="Username"
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <ValidationTextField
                                type="newpassword"
                                className={clsx(classes.textField, classes.newPasswordTextField)}
                                value={props.addEditUserModalNewPassword}
                                InputProps={{
                                    classes: {},
                                }}
                                ref={newPasswordValidationFieldRef}

                                disabled={isLoading}
                                onInput={(e) =>
                                    props.setAddEditUserModalNewPassword(e.target.value)
                                }
                                required={props.modalType == "Edit" ? false : true}
                                label={`${props.modalType == "Edit" ? "New" : ""} Password`}
                                variant="outlined"
                            />
                        </Grid>
                       
                        <FoldersList modalType={props.modalType} addEditUserModalRowData={props.addEditUserModalRowData}/>
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
                        {!isLoading && props.modalType == "Edit" ? "Save" : "Add"}
                    </Button>
                </Container>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (state) => {
    return { ...state.AddEditUserModalReducer, ...state.AuthUserReducer };
};

export default connect(mapStateToProps, {
    setCropImageModalImage,
    setCropImageModalToggle,
    setCropImageModalLoading,
    setAddEditUserModalToggle,
    setAddEditUserModalAvatar,
    setAddEditUserModalName,
    setAddEditUserModalEmail,
    setAddEditUserModalDesignationId,
    setAddEditUserModalRole,
    setAddEditUserModalStatus,
    setAddEditUserModalBlockComments,
    setAddEditUserModalAllowEdit,
    setAddEditUserModalAllowDownload,
    setAddEditUserModalUsername,
    setAddEditUserModalCountryRegion,
    setAddEditUserModalContactNumber,
    setAddEditUserModalNewPassword,
    setAddEditUserModalIsLoading,
    setAddEditUserModalReset
})(AddEditUserModal);
