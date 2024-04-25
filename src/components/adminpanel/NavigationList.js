import React from "react";
import { connect } from "react-redux";
import { List, ListItem, ListItemIcon, ListItemText, SvgIcon } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import GroupAdd from "@mui/icons-material/GroupAdd";
import Badge from "@mui/icons-material/Badge";
import RuleFolder from "@mui/icons-material/RuleFolder";
import History from "@mui/icons-material/History";
import {
  setDrawerToggle
} from "../../store/actions/OtherActions";
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
  linkBorderTop:{
    borderTop: "1px solid #d5cfcf!important"
  }
}));

const pages = [
  { text: "Users", link: "adminusers", icon: <GroupAdd /> },
  { text: "Designations", link: "admindesignations", icon: <Badge /> },
  { text: "Folders Path", link: "adminfolderspath", icon: <RuleFolder /> },
  { text: "Users History", link: "adminusershistory", icon: <History /> },
];

const NavigationList = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <List className={classes.drawerNavigationList}>
      {pages.map((page, index) => {
     
        return <ListItem key={page.link} 
          className={clsx(classes.linksButton, {
            [classes.linksButtonSelected]:
              ((location.pathname === "/" ||
                location.pathname === "/userpanel" ||
                location.pathname === "/adminusers") &&
                page.link === "adminusers" ||
                (location.pathname === "/admindesignations" &&
                  page.link === "admindesignations") ||
                (location.pathname === "/adminfolderspath" &&
                  page.link === "adminfolderspath") ||
                (location.pathname === "/adminusershistory" &&
                  page.link === "adminusershistory")),
                  [classes.linkBorderTop]:index == 0
          })}
          onClick={() => {
            navigate("/" + page.link);
            props.setDrawerToggle(false);
          }}>
          <ListItemIcon>
            {page.icon}
          </ListItemIcon>
          <ListItemText primary={page.text} />
        </ListItem>
      })}
    </List>
  );
};

export default connect(null,{
  setDrawerToggle
})(NavigationList);
