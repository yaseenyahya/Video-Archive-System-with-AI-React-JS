import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip
} from "@mui/material/";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Folder from "@mui/icons-material/Folder";
import { withStyles, makeStyles } from "@mui/styles";

const useStyles = (theme) => ({
  menuPaper: {
    backgroundColor: "#505050!important",
    padding: 0,

  },
});
class ListMenu extends Component {
  state = {
    anchorEl: null,
  };
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  menuItemStyles = {
    minWidth: 200,
    textAlign: "center",
    backgroundColor: "#e14425",
    borderBottom: "1px solid #505050",
    color: "white"
  };

  containerStyles = {
    display: "flex",
    backgroundColor: "#505050",
  };
  ItemCountStyle = {
    width: "40px",
    height: "40px",
    background: "rgb(223, 68, 38)",
    border: "1px solid #bb4242",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: "900",
    borderRadius: "50%",


  }
  render() {
    const { items, iconMenuColor, filesListAndEditorFileListShowDeletedItems } = this.props;
    const { classes, selectedItemId } = this.props;
    return (
      <div style={this.containerStyles}>
        <IconButton
          onClick={this.handleClick}
          style={{
            ...(iconMenuColor !== undefined ? { color: iconMenuColor } : null),
            margin: "auto",
            padding: 0,
          }}
        >
          <MoreVertIcon
            color={iconMenuColor !== undefined ? iconMenuColor : undefined}
          />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          classes={{ paper: classes.menuPaper }}
          onClose={this.handleClose}
        >
          {items.map((item, i) => (
            <MenuItem
              style={{
                ...this.menuItemStyles,
                ...(selectedItemId == item.id
                  ? this.props.selectedItemStyle
                  : null),
              }}
              key={i}
              disabled={item.disabled}
              onClick={item.onClick}
            >
              <Folder style={{
                width: 15,
                color: "white",
                height: 15,
                marginRight: 5
              }} />
              {item.text}
              {(item.unDeletedCount + item.deletedCount) > 0 && filesListAndEditorFileListShowDeletedItems &&
                <span style={this.ItemCountStyle}>{item.unDeletedCount + item.deletedCount}</span>}
              {(item.unDeletedCount) > 0 && !filesListAndEditorFileListShowDeletedItems &&
                <span style={this.ItemCountStyle}>{item.unDeletedCount}</span>}

            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

ListMenu.propTypes = {
  items: PropTypes.array.isRequired,
  iconMenuColor: PropTypes.string,
};

export default withStyles(useStyles)(ListMenu);
