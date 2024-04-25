import React, { memo } from "react";

import {
  IconButton,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Paper,
  Popover,
  Avatar,
  Tooltip,
  Typography
} from "@mui/material/";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@mui/styles";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  setProfilePictureMenuAnchorEl,
  setDrawerToggle
} from "../../store/actions/OtherActions";
import {
  setEditProfileModalToggle
} from "../../store/actions/EditProfileModalActions";
import {
  resetAuthUser
} from "../../store/actions/AuthUserActions";
import { useNavigate } from "react-router-dom";

import clsx from "clsx";
import { DialogContext } from "../context/DialogContext";
import useMediaQuery from '@mui/material/useMediaQuery';
import HistoryIcon from '@mui/icons-material/History';
import {
  setFilesDownloadHistoryUserModalToggle
} from "../../store/actions/FileDownloadHistoryActions";
import resolvesettings from "../resolvesettings";
import LocalStorage from "../../auth/LocalStorage";
import UnreadFileManager from '../../auth/UnreadFileManager';

const useStyles = makeStyles((theme) => ({
  settingsIcon: {
    fontSize: 30,
    color: "gray",
  },
  menuPaper: {
    background: "rgb(26 39 51 / 73%)",
    borderRadius: 0,
  },
  editProfileMenuItem: {
    color: "white",
    cursor: "pointer",
    pointerEvents: "auto",
  },
  editProfileMenu: {
    padding: "0px!important"
  },
  popover: {
    pointerEvents: "none",
  },
  avatarTooltip: {

  },
  avatarButton: {
    padding: 0,
    marginRight: 10,
  },
  avatar: {
    width: "45px!important",
    height: "45px!important",
  },
  editProfileIcon: {
    width: "20px!important",
    height: "20px!important",
    marginRight: "10px",
    color: "gray",
  },
  downloadUserHistoryIcon: {
    width: "20px!important",
    height: "20px!important",
    marginRight: "10px",
    color: "gray",
  },
  logoutIcon: {
    width: "20px!important",
    height: "20px!important",
    color: "white!important",
  },
  logouteMenuItem: {
    backgroundColor: "#E14425!important",
    color: "white!important",
    display: "flex!important",
    justifyContent: "space-between!important"
  }
}));

const ProfileMenu = (props) => {
  const unreadFileManager = new UnreadFileManager();

  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    openContextDialog
  } = React.useContext(DialogContext)

  const handleMenuClick = (event) => {
    props.setProfilePictureMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    props.setProfilePictureMenuAnchorEl(null);
  };
  const isMdSmOrXs = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div >

      <IconButton onClick={(event)=>{
       
        if(isMdSmOrXs)
        props.setDrawerToggle(true);
      else handleMenuClick(event);
        }}  className={classes.avatarButton}>
        <Avatar
          className={classes.avatar}
          alt="User Avatar"
          src={props.authUserAvatar}
        />
      </IconButton>


      {!isMdSmOrXs && <Popover
        disableScrollLock={true}
        classes={{ root: classes.popover }}
        disableEnforceFocus={true}
        open={Boolean(props.profilePictureMenuAnchorEl)}
        anchorEl={
          props.profilePictureMenuAnchorEl
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >

        <Paper className={classes.menuPaper}>
          <ClickAwayListener onClickAway={handleMenuClose}>
            <MenuList
              autoFocusItem={Boolean(props.profilePictureMenuAnchorEl)}
              id="menu-list-grow"

              className={classes.editProfileMenu}
            >
              <MenuItem
                className={classes.editProfileMenuItem}
                onClick={async () => {
                  handleMenuClose();
                  props.setEditProfileModalToggle(true);

                }}
              >
                <DriveFileRenameOutlineIcon className={classes.editProfileIcon} />
                Edit Profile
              </MenuItem>
              {(new resolvesettings().getUserAllowDownload(props.authUserSettingsJson)) &&
                <MenuItem
                  className={clsx(classes.editProfileMenuItem, classes.downloadUserHistoryMenuItem)}
                  onClick={async () => {

                    props.setFilesDownloadHistoryUserModalToggle(true);
                  }}
                >


                  <HistoryIcon className={classes.downloadUserHistoryIcon} />
                  <Typography>Download History</Typography>
                </MenuItem>
              }
              <MenuItem
                className={clsx(classes.editProfileMenuItem, classes.logouteMenuItem)}
                onClick={async () => {

                  const contextDialogProps =  openContextDialog("Yes", "No", "Are you sure you want to logout?", "Confirm", () => {
                    handleMenuClose();
                    props.resetAuthUser();
                    LocalStorage.removeUsername();
                    LocalStorage.removePassword();
                    navigate("/login");
                    unreadFileManager.clearGlobalVariable();
                    contextDialogProps.closeAndReset();
                  }, () => {

                  });
                }}
              >

                <Typography>Logout</Typography>
                <ExitToAppIcon className={classes.logoutIcon} />
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>

      </Popover>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return { ...state.OtherReducer, ...state.EditProfileModalReducer, ...state.AuthUserReducer };
};
export default connect(mapStateToProps, {
  setProfilePictureMenuAnchorEl,
  setEditProfileModalToggle,
  resetAuthUser,
  setFilesDownloadHistoryUserModalToggle,
  setDrawerToggle
})(memo(ProfileMenu));
