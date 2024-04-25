import React, { useEffect, useMemo } from "react";
import { IconButton, Tooltip, Container, Box } from "@mui/material/";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import CustomTable from "../../otherComponents/CustomTable";
import { useSnackbar } from "notistack";
import _ from "lodash";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { DialogContext } from "../../context/DialogContext";
import { Delete, Edit } from '@mui/icons-material';
import AddEditFoldersPathModal from "./AddEditFoldersPathModal";
import {
  setAddEditFoldersPathModalToggle,
  setAddEditFoldersPathModalType,
  setAddEditFoldersPathModalRowData,
} from "../../../store/actions/AddEditFoldersPathModalActions";


const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop:  (state) => state.appBarHeight + 15
  }
}));

const AdminFoldersPath = (props) => {
  const classes = useStyles({appBarHeight :props.appBarHeight});
  const { enqueueSnackbar } = useSnackbar();

  const {
    openContextDialog
  } = React.useContext(DialogContext);

  const deleteFolderPathMutation = gql`
    mutation DeleteFolderPath(
      $folder_path_id: ID!
    ) {
      delete_folder_path(
        folder_path_id: $folder_path_id
      ) {
        success
        error
      }
    }
  `;

  const [
    deleteFolderPath,
    {
      loading: deleteFolderPathMutationLoading,
      error: deleteFolderPathMutationError,
      data: deleteFolderPathMutationResult,
    },
  ] = useMutation(deleteFolderPathMutation);

  useEffect(() => {
    if (deleteFolderPathMutationError) {
      deleteFolderPathMutationError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [deleteFolderPathMutationError]);

  useEffect(() => {
    if (deleteFolderPathMutationResult && deleteFolderPathMutationResult.delete_folder_path) {
      if (deleteFolderPathMutationResult.delete_folder_path.success) {
        getFoldersPath();
        enqueueSnackbar("Folder Path deleted successfully.", { variant: "success" });
      } else {
        enqueueSnackbar(deleteFolderPathMutationResult.delete_folder_path.error, {
          variant: "error",
        });
      }
    }
  }, [deleteFolderPathMutationResult]);

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
   
    getFoldersPath();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'path',
        header: 'Path',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: 'folder_name',
        header: 'Folder Name',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
      }
    ]
  );

  return (
    <Container
      className={classes.mainContainer}
      maxWidth={false}
      disableGutters={false}
    >
      <CustomTable
      exportFilename={"folderspath"}
        addDataText={"Add Folder Path"}
        addDataAction={() => {
          props.setAddEditFoldersPathModalType("Add");
          props.setAddEditFoldersPathModalToggle(true);
        }}
        muiTablePaginationProps={{
          rowsPerPageOptions: _.sortBy([40, 80, 160, getFoldersPathQueryResult && getFoldersPathQueryResult.get_folders_path ? getFoldersPathQueryResult.get_folders_path.length : 250]),
        }}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => {
                props.setAddEditFoldersPathModalRowData(row.original);
                props.setAddEditFoldersPathModalType("Edit");
                props.setAddEditFoldersPathModalToggle(true);
              }} >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => {
                openContextDialog("Yes", "No", `Are you sure you want to delete ${row.original.path}?`, "Confirm", () => {
                  try {
                    deleteFolderPath({
                      variables: {
                        folder_path_id: row.original.id,
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
          isLoading: getFoldersPathQueryLoading,
        }}
        initialState={{
          density: 'comfortable',
          pagination: { pageSize: 40 },
          isLoading: true,
        }}
        data={getFoldersPathQueryResult && getFoldersPathQueryResult.get_folders_path ? getFoldersPathQueryResult.get_folders_path : []}
      />
      {props.addEditFoldersPathModalToggle && <AddEditFoldersPathModal getFoldersPathCallback={getFoldersPath} modalType={props.addEditFoldersPathModalType} />}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { ...state.AuthUserReducer,...state.OtherReducer, ...state.AddEditFoldersPathModalReducer };
};

export default connect(mapStateToProps, {
  setAddEditFoldersPathModalToggle,
  setAddEditFoldersPathModalType,
  setAddEditFoldersPathModalRowData,
})(AdminFoldersPath);
