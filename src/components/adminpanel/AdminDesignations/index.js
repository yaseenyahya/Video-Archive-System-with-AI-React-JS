import React, { useEffect, useMemo } from "react";
import { IconButton, Tooltip, Container, Box, Avatar } from "@mui/material/";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import CustomTable from "../../otherComponents/CustomTable";
import { useSnackbar } from "notistack";
import _ from "lodash";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { DialogContext } from "../../context/DialogContext";
import { Delete, Edit } from '@mui/icons-material';
import AddEditDesignationModal from "./AddEditDesignationModal";
import {
  setAddEditDesignationModalToggle,
  setAddEditDesignationModalType,
  setAddEditDesignationModalRowData,
} from "../../../store/actions/AddEditDesignationModalActions";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop:  (state) => state.appBarHeight + 15
  }
}));

const AdminDesignations = (props) => {
  const classes = useStyles({appBarHeight :props.appBarHeight});
  const { enqueueSnackbar } = useSnackbar();

  const {
    openContextDialog
  } = React.useContext(DialogContext)

  const deleteDesignationMutation = gql`
    mutation DeleteDesignation(
      $designation_id: ID!
    ) {
      delete_designation(
        designation_id: $designation_id
      ) {
        success
        error
      }
    }
  `;

  const [
    deleteDesignation,
    {
      loading: deleteDesignationLoading,
      error: deleteDesignationMutationError,
      data: deleteDesignationMutationResult,
    },
  ] = useMutation(deleteDesignationMutation);

  useEffect(() => {
    if (deleteDesignationMutationError) {
      deleteDesignationMutationError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [deleteDesignationMutationError]);

  useEffect(() => {
    if (deleteDesignationMutationResult && deleteDesignationMutationResult.delete_designation) {
      if (deleteDesignationMutationResult.delete_designation.success) {
        getDesignations();
        enqueueSnackbar("Designation deleted successfully.", { variant: "success" });
      } else {
        enqueueSnackbar(deleteDesignationMutationResult.delete_designation.error, {
          variant: "error",
        });
      }
    }
  }, [deleteDesignationMutationResult]);

  const getDesignationsQuery = gql`
    query GetDesignations {
      get_designations {
        id
        name
      }
    }
  `;

  let [
    getDesignations, // Change variable name from getUsers to getDesignations
    {
      loading: getDesignationsQueryLoading,
      error: getDesignationsQueryError,
      data: getDesignationsQueryResult,
    },
  ] = useLazyQuery(getDesignationsQuery, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
   
    getDesignations(); // Update the function call
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
      },
    ]
  );

  return (
    <>
      <Container
        className={classes.mainContainer}
        maxWidth={false}
        disableGutters={false}
      >
        <CustomTable
         exportFilename={"designations"}
          addDataText={"Add Designation"} // Update the text
          addDataAction={() => {
            props.setAddEditDesignationModalType("Add"); // Update the action
            props.setAddEditDesignationModalToggle(true); // Update the action
          }}
          muiTablePaginationProps={{
            rowsPerPageOptions: _.sortBy([40, 80, 160, getDesignationsQueryResult && getDesignationsQueryResult.get_designations ? getDesignationsQueryResult.get_designations.length : 250]),
          }}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex' }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => {
                  props.setAddEditDesignationModalRowData(row.original);
                  props.setAddEditDesignationModalType("Edit");
                  props.setAddEditDesignationModalToggle(true);
                }} >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => {
                  openContextDialog("Yes", "No", `Are you sure you want to delete ${row.original.name}?`, "Confirm", () => {
                    try {
                      deleteDesignation({
                        variables: {
                          designation_id: row.original.id,
                        },
                      });
                    } catch (e) {

                    }
                  }, () => {

                  });
                }}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          enableStickyHeader
          columns={columns}
          enableDensityToggle={false}
          state={{
            isLoading: getDesignationsQueryLoading,
          }}
          initialState={{
            density: 'comfortable',
            pagination: { pageSize: 40 },
            isLoading: true,
          }}
          data={getDesignationsQueryResult && getDesignationsQueryResult.get_designations ? getDesignationsQueryResult.get_designations : []}
        />
        {props.addEditDesignationModalToggle && <AddEditDesignationModal getDesignationsCallback={getDesignations} modalType={props.addEditDesignationModalType} />}
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return { ...state.AuthUserReducer,...state.OtherReducer, ...state.AddEditDesignationModalReducer };
};

export default connect(mapStateToProps, {
  setAddEditDesignationModalToggle,
  setAddEditDesignationModalType,
  setAddEditDesignationModalRowData,
})(AdminDesignations);
