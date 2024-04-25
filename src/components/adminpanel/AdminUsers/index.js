import React, { Component, useEffect, useRef, useMemo } from "react";
import { IconButton, Tooltip, Container, Box, Avatar } from "@mui/material/";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import CustomTable from "../../otherComponents/CustomTable";
import { useSnackbar } from "notistack";
import _ from "lodash";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { DialogContext } from "../../context/DialogContext";
import { Delete, Edit } from '@mui/icons-material';
import AddEditUserModal from "./AddEditUserModal";
import {
  setAddEditUserModalToggle,
  setAddEditUserModalType,
  setAddEditUserModalRowData,

} from "../../../store/actions/AddEditUserModalActions";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop:  (state) => state.appBarHeight + 15
  }
}));

const AddUsers = (props) => {
  const classes = useStyles({appBarHeight :props.appBarHeight});
  const { enqueueSnackbar } = useSnackbar();

  const {
    openContextDialog
  } = React.useContext(DialogContext)

  const deleteUserMutation = gql`
  mutation DeleteUser(
    $user_id: ID!
  ) {
      delete_user(
        user_id: $user_id
      ) {
          success
          error
      }
  }
`;

  const [
    deleteUser,
    {
      loading: deleteUserLoading,
      error: deleteUserMutationError,
      data: deleteUserMutationResult,
    },
  ] = useMutation(deleteUserMutation);

  useEffect(() => {
    if (deleteUserMutationError) {
      deleteUserMutationError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [deleteUserMutationError]);

  useEffect(() => {
    if (deleteUserMutationResult && deleteUserMutationResult.delete_user) {
      if (deleteUserMutationResult.delete_user.success) {
        getUsers();
        enqueueSnackbar("User deleted successfully.", { variant: "success" });
      } else {
        enqueueSnackbar(deleteUserMutationResult.delete_user.error, {
          variant: "error",
        });
      }
    }
  }, [deleteUserMutationResult]);

  const getUsersQuery = gql`
    query GetUsers {
      get_users {
        id
    name
    avatar
    email
    country_code
    contact_no
    status
    block_comments
    role
    username
    password
    settings_json
    designation{
      id
      name
    }
      }
    }
  `;

  let [
    getUsers,
    {
      loading: getUsersQueryLoading,
      error: getUsersQueryError,
      data: getUsersQueryResult,
    },
  ] = useLazyQuery(getUsersQuery, {
    fetchPolicy: "network-only",
  });
  useEffect(() => {
   
    getUsers();

  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {

          return <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Avatar
              alt="avatar"
              height={30}
              src={row.original.avatar}
              loading="lazy"
              style={{ borderRadius: '50%' }}
            />
            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            <span>{renderedCellValue}</span>
          </Box>
        },
      },
      {
        accessorKey: 'username',
        header: 'Username',
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: 'contact_no',
        header: 'Contact no',
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {
          return <span>{`${row.original.country_code || ""}${renderedCellValue || ""}`}</span>
        }
      },
      {
        accessorKey: 'designation.name',
        header: 'Designation',
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: 'password',
        header: 'Password',
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        size: 80,
      } ,
      {
        accessorKey: 'role',
        header: 'Role',
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {
          return <span style={{color:row.original.status == "Block" ? "red" : "green"}}>{`${row.original.status}`}</span>
        }
      },
      {
        
        accessorKey: 'block_comments',
        header: 'Block Comments',
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {
          return <span style={{color:row.original.status == "Block" ? "red" : "black"}}>{`${row.original.block_comments ? row.original.block_comments : ""}`}</span>
        }
      }
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
         exportFilename={"users"}
          addDataText={"Add Users"}
          
          addDataAction={() => {

            props.setAddEditUserModalType("Add");
            props.setAddEditUserModalToggle(true);

          }}

          muiTablePaginationProps={{
            rowsPerPageOptions: _.sortBy([40, 80, 160, getUsersQueryResult && getUsersQueryResult.get_users ? getUsersQueryResult.get_users.length : 250]),
          }}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex' }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton disabled={row.original.id == props.authUserId} onClick={() => {
                  props.setAddEditUserModalRowData(row.original);
                  props.setAddEditUserModalType("Edit");
                  props.setAddEditUserModalToggle(true);
                }} >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton disabled={row.original.id == props.authUserId} color="error" onClick={() => {
                  openContextDialog("Yes", "No", `Are you sure you want to delete ${row.original.name}?`, "Confirm", () => {
                    try {
                      deleteUser({
                        variables: {
                          user_id: row.original.id,

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
            isLoading: getUsersQueryLoading,
          }}
          initialState={{
            density: 'comfortable',
            pagination: { pageSize: 40 },
            isLoading: true,
          }}
          data={getUsersQueryResult && getUsersQueryResult.get_users ? getUsersQueryResult.get_users : []}
        />
        {props.addEditUserModalToggle && <AddEditUserModal getUsersCallback={getUsers} modalType={props.addEditUserModalType} />}
      </Container>

    </>
  );
};
const mapStateToProps = (state) => {
  return { ...state.AuthUserReducer,...state.OtherReducer, ...state.AddEditUserModalReducer };
};
export default connect(mapStateToProps, {
  setAddEditUserModalToggle,
  setAddEditUserModalType,
  setAddEditUserModalRowData,
})(AddUsers);
