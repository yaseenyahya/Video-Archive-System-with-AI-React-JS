import React from "react";
import { connect } from "react-redux";
import { List, ListItem, ListItemIcon, ListItemText, SvgIcon } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import {
  setFilesListAndEditorSelectedFolderId
} from "../../store/actions/FilesListAndEditorActions";
import {
  setDrawerToggle
} from "../../store/actions/OtherActions";
import FolderIcon from '@mui/icons-material/Folder';
const useStyles = makeStyles((theme) => ({
  drawerNavigationList: {
    flex: 1
  },
  linksButton: {

    cursor: "pointer",
    borderBottom: "1px solid #d5cfcf!important",

    backgroundColor: "#ebebeb!important",
    fontWeight: "bold!important",
    textTransform: "capitalize!important",

  },
  linksButtonSelected: {
    background: "white!important",
    color: "#505050!important",
    //border: "1px solid #505050!important",
  },
  linkBorderTop: {
    borderTop: "1px solid #d5cfcf!important"
  },
  itemCountStyle: {
    width: "40px",
    height: "40px",
    background: "rgb(223, 68, 38)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: "900",
    borderRadius: "50%",


  }
}));


const NavigationDrawerList = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <List className={classes.drawerNavigationList}>
      {props.menuList.map((menu, index) => {

        return <ListItem key={menu.id}
          className={clsx(classes.linksButton, {
            [classes.linksButtonSelected]:
              (props.filesListAndEditorSelectedFolderId == menu.id),
            [classes.linkBorderTop]: index == 0
          })}
          onClick={() => {
            props.setFilesListAndEditorSelectedFolderId(menu.id);
            props.setDrawerToggle(false);
          }}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={menu.text} />
          {(menu.unDeletedCount + menu.deletedCount) > 0 && props.filesListAndEditorFileListShowDeletedItems &&
            <span className={classes.itemCountStyle}>{menu.unDeletedCount + menu.deletedCount}</span>}
          {(menu.unDeletedCount) > 0 && !props.filesListAndEditorFileListShowDeletedItems &&
            <span className={classes.itemCountStyle}>{menu.unDeletedCount}</span>}
        </ListItem>
      })}
    </List>
  );
};
const mapStateToProps = (state) => {
  return { ...state.FilesListAndEditorReducer };
};
export default connect(mapStateToProps, {
  setFilesListAndEditorSelectedFolderId,
  setDrawerToggle
})(NavigationDrawerList);
