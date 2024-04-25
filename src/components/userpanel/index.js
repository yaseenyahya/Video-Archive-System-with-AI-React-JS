import React, { useEffect } from "react";
import { connect } from "react-redux";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { makeStyles, useTheme } from "@mui/styles";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import { motion } from "framer-motion/dist/framer-motion";
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
import AppBarWithHeightAndWindowHeight from "./AppBarWithHeightAndWindowHeight"
import PagesContainer from "./PagesContainer";
import { Typography } from "@mui/material";
import UserDownloadHistoryModal from "./UserDownloadHistoryModal";
const useStyles = makeStyles((theme) => ({
  container: {},
  drawerContainer: {
    display: "flex!important",
    flex: 1,
    flexDirection: "column"
  },

  logo: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  logoContainer: {

    display: "flex",
    justifyContent: "center",
    flex: 1

  },
  toolbar: {
    minHeight: "50px!important",
    height: "61px !important",
  },
  menuButtonContainer: {


    [theme.breakpoints.down("md")]: {
      width: 66,
    },
  },
  menuButtonIcon: {
    color: "black"
  },
  drawerAvatar: {
    width: "55px!important",
    height: "55px!important"
  },
  avatarContainer: {
    width: 66,
    flex: "0!important"

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
  usernameText:{
    fontSize: "20px!important",
    color:"#595959",
    fontWeight: "700!important",
    textTransform: "capitalize!important",
    marginLeft: "20px!important"
  }
}));

const Userpanel = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    openContextDialog
  } = React.useContext(DialogContext)



  const isMdSmOrXs = useMediaQuery(theme.breakpoints.down('md'));
  return (


    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >

      <Container maxWidth={"lg"} disableGutters={true}>
        <AppBarWithHeightAndWindowHeight

        >

          <Toolbar className={clsx(classes.toolbar)} disableGutters={true}>
            {isMdSmOrXs ?
              <Box className={classes.menuButtonContainer}>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => {
                    props.setDrawerToggle(!props.drawerToggle)
                  }}
                >
                  <MenuIcon className={classes.menuButtonIcon} />
                </IconButton>
              </Box> : <Typography className={classes.usernameText}> {props.authUserName}</Typography>
            }
           
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
              <ProfileMenu />
              {props.editProfileModalToggle && <ProfileEditModal />}
              {props.filesDownloadHistoryUserModalToggle && <UserDownloadHistoryModal/>}
            </Box>
          </Toolbar>
        </AppBarWithHeightAndWindowHeight>
      </Container>
      <PagesContainer />

    </motion.div >

  );
};

const mapStateToProps = (state) => {
  return { ...state.AuthUserReducer,...state.FileDownloadHistoryReducer, ...state.OtherReducer, ...state.EditProfileModalReducer };
};

export default connect(mapStateToProps, {
  setDrawerToggle,
  setProfilePictureMenuAnchorEl,
  setEditProfileModalToggle,
  resetAuthUser
})(Userpanel);
