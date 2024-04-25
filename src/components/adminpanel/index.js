import React, { useEffect } from "react";
import { connect } from "react-redux";
import Container from "@mui/material/Container";
import AppBarWithHeight from "./AppBarWithHeight";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; // Added CloseIcon
import Box from "@mui/material/Box";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { makeStyles, useTheme } from "@mui/styles";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import { motion } from "framer-motion/dist/framer-motion";
import Navigation from "./Navigation";
import NavigationList from "./NavigationList";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {
  setDrawerToggle,
  setProfilePictureMenuAnchorEl
} from "../../store/actions/OtherActions";
import {
  resetAuthUser
} from "../../store/actions/AuthUserActions";
import {
  setEditProfileModalToggle
} from "../../store/actions/EditProfileModalActions";
import ProfileMenu from "./ProfileMenu";
import useMediaQuery from '@mui/material/useMediaQuery';
import ProfileEditModal from "../profileEditModal";
import { DialogContext } from "../context/DialogContext";
import PagesContainer from "./PagesContainer";
const useStyles = makeStyles((theme) => ({
  container: {},
  drawerContainer: {
    display: "flex!important",
    flex: 1,
    flexDirection: "column"
  },
  appBar: {
    background: "white!important",
    boxShadow:
      "0px 2px 4px -1px rgb(135 132 132 / 20%), 0px 4px 5px 0px rgb(173 169 169 / 14%), 0px 1px 10px 0px rgb(143 135 135 / 12%)!important",
  },
  logo: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  logoContainer: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "center",
      flex: 1
    },
  },
  toolbar: {
    minHeight: "50px!important",
    height: "61px !important",
  },
  menuButtonContainer: {

    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      width: 66,
    },
  },
  drawerAvatar: {
    width: "55px!important",
    height: "55px!important"
  },
  avatarContainer: {

    [theme.breakpoints.down("md")]: {
      width: 66,
      flex: "0!important"
    },
  },

  drawerNavigationList: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  drawerCloseButtonContainer: {
    position: "absolute",
    right: 0,
  },
  drawerCloseButtonIcon: {
    width: "20px!important",
    height: "20px!important"
  },
  drawerCloseButton: {
    paddingTop: "10px!important",
    paddingBottom: "10px!important",
    paddingRight: "10px!important",
    paddingLeft: "10px!important",
  },
  logoutButton: {
    width: "100%",
    backgroundColor: "#E14425!important",
    borderRadius: "0!important",
    color: "white!important",
    display: "flex!important",
    justifyContent: "space-between!important",
    paddingTop: "6px!important",
    paddingBottom: "6px!important"
  },
  editProfileDrawerButton: {
    textTransform: "capitalize"
  },
  editProfileDrawerIcon: {
    width: "15px!important",
    height: "15px!important",
    marginRight: "5px"
  },
  menuButtonIcon:{
    color:"black"
  }
}));

const Adminpanel = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    openContextDialog
  } = React.useContext(DialogContext)



  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {isSmall &&
        <Drawer
          variant="temporary"
          style={{ width: 260 }}
          anchor={"left"}
          open={props.drawerToggle}
          onClose={() => {
            props.setDrawerToggle(false); // Close the drawer when clicking backdrop
          }}
        >
          <Container disableGutters={true} className={classes.drawerContainer}>
            <Box className={classes.drawerCloseButtonContainer}>
              <IconButton
                className={classes.drawerCloseButton}
                size="large"
                color="inherit"
                onClick={() => {
                  props.setDrawerToggle(false); // Close the drawer when clicking close button
                }}
              >
                <CloseIcon className={classes.drawerCloseButtonIcon} />
              </IconButton>
            </Box>
            <Box p={2} display={"flex"} alignItems={"center"} flexDirection={"column"}>
              <Avatar
                className={classes.drawerAvatar}
                alt="User Avatar"
                src={props.authUserAvatar}
              />
              <IconButton className={classes.editProfileDrawerButton} onClick={() => {
                props.setEditProfileModalToggle(true);
              }}>
                <DriveFileRenameOutlineIcon className={classes.editProfileDrawerIcon} />
                {props.authUserName}
              </IconButton>
            </Box>
            <NavigationList />
            <Box mt="auto" textAlign="center">
              <Tooltip title="Logout">
                <IconButton className={classes.logoutButton} onClick={() => {
                  openContextDialog("Yes", "No", "Are you sure you want to logout?", "Confirm", () => {
                    props.resetAuthUser();
                    navigate("/login");
                  }, () => {

                  });


                }}>
                  <Typography variant="h6">Logout</Typography>
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Container>
        </Drawer>
      }
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxWidth={"lg"} disableGutters={true}>
          <AppBarWithHeight
         
          >
            <Toolbar className={clsx(classes.toolbar)} disableGutters={true}>
              <Box className={classes.menuButtonContainer}>
                <IconButton
                
                  size="large"
                  color="inherit"
                  onClick={() => {
                    props.setDrawerToggle(!props.drawerToggle)
                  }}
                >
                  <MenuIcon className={classes.menuButtonIcon}/>
                </IconButton>
              </Box>
              <Box className={classes.logoContainer}>
                <img
                  src={`${process.env.PUBLIC_URL}/axonlogosmall.png`}
                  alt="Logo"
                  className={classes.logo}
                />
              </Box>
              <Box className={classes.avatarContainer}
                flex={1}
                display={"flex"}
                justifyContent={"flex-end"}
                alignItems={"center"}
              >
                <Navigation />
                <ProfileMenu />
                {props.editProfileModalToggle && <ProfileEditModal />}
              </Box>
            </Toolbar>
          </AppBarWithHeight>
        </Container>
        <PagesContainer />
      </motion.div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { ...state.AuthUserReducer, ...state.OtherReducer, ...state.EditProfileModalReducer };
};

export default connect(mapStateToProps, {
  setDrawerToggle,
  setProfilePictureMenuAnchorEl,
  setEditProfileModalToggle,
  resetAuthUser
})(Adminpanel);
