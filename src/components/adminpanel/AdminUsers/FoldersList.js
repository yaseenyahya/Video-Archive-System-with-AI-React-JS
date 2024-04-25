import React, { useEffect, useRef } from "react";
import {
    Tooltip, FormControl, Grid, FormControlLabel, Checkbox, FormLabel, RadioGroup, Radio
} from "@mui/material";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { gql, useLazyQuery } from "@apollo/client";
import {
    setAddEditUserModalAllowFoldersId,
    setAddEditUserModalStartupFolder
} from "../../../store/actions/AddEditUserModalActions";
import { useSnackbar } from "notistack";
import clsx from "clsx";
import _ from "lodash";
import resolvesettings from "../../resolvesettings";

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: "absolute!important",
        right: 5,
        top: 6,
        color: "white!important",
    },
    checkboxLabel: {

    },
    formControl: {
        width: "100%",
        paddingLeft: "16px!important",
        marginTop: "16px!important"
    },
    headingGridItem: {
        textDecoration: "underline",
        fontWeight: 800,
        paddingBottom: 20
    }
}));

const FoldersList = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

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


        if (props.modalType == "Edit") {
            if (props.addEditUserModalRowData) {
                props.setAddEditUserModalAllowFoldersId(new resolvesettings().getUserAllowFoldersId(props.addEditUserModalRowData.settings_json));
                props.setAddEditUserModalStartupFolder(new resolvesettings().getUserStartupFolder(props.addEditUserModalRowData.settings_json));

            }

        } else {


        }
        getFoldersPath();
    }, []);

    let isLoading = getFoldersPathQueryLoading;

    return (
        <FormControl component="fieldset" className={classes.formControl}>

            {getFoldersPathQueryResult &&
                getFoldersPathQueryResult.get_folders_path &&
                getFoldersPathQueryResult.get_folders_path.length > 0 &&
                <Grid container>
                    <Grid item xs={6} md={6} lg={6} className={classes.headingGridItem}>
                        Startup Folder
                    </Grid>
                    <Grid item xs={6} md={6} lg={6} className={classes.headingGridItem}>
                        Allow Folders
                    </Grid>
                    <RadioGroup style={{ display: "contents" }}
                        onChange={(event) => {
                            props.setAddEditUserModalStartupFolder(event.target.value)
                        }}
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={props.addEditUserModalStartupFolder}
                        name="radio-buttons-group"
                    >
                        {getFoldersPathQueryResult &&
                            getFoldersPathQueryResult.get_folders_path ?
                            getFoldersPathQueryResult.get_folders_path.map((folderData) => {
                                return <>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <Tooltip title="Select Startup Folder">
                                            <FormControlLabel value={folderData.id} control={<Radio />} />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <FormControlLabel
                                            classes={{ label: classes.checkboxLabel }}
                                            control={
                                                <Checkbox
                                                    checked={props.addEditUserModalAllowFoldersId.includes(folderData.id)}
                                                    onChange={(event) => {
                                                        const isChecked = event.target.checked;
                                                        const updatedFoldersId = [...props.addEditUserModalAllowFoldersId];

                                                        if (isChecked && !updatedFoldersId.includes(folderData.id)) {

                                                            updatedFoldersId.push(folderData.id);
                                                        } else if (!isChecked) {

                                                            const index = updatedFoldersId.indexOf(folderData.id);
                                                            if (index !== -1) {
                                                                updatedFoldersId.splice(index, 1);
                                                            }
                                                        }


                                                        props.setAddEditUserModalAllowFoldersId(updatedFoldersId);
                                                    }}
                                                    name={folderData.folder_name.split(" ").join("_")}
                                                    inputProps={{ "aria-label": "secondary checkbox" }}
                                                />

                                            }
                                            label={folderData.folder_name}
                                        />
                                    </Grid>
                                </>
                            })
                            : <></>
                        }
                    </RadioGroup>
                </Grid>
            }
        </FormControl>
    );
};

const mapStateToProps = (state) => {
    return { ...state.AddEditUserModalReducer };
};

export default connect(mapStateToProps, {
    setAddEditUserModalAllowFoldersId,
    setAddEditUserModalStartupFolder
})(FoldersList);
