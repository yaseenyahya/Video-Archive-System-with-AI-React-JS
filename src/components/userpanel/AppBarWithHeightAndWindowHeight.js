import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from "@mui/material/AppBar";
import { connect } from "react-redux";
import {
 setAppBarHeight,
 setWindowHeight
} from "../../store/actions/OtherActions";
const useStyles = makeStyles((theme) => ({
    appBar: {
        background: "#ead437!important",
        boxShadow:
          "0px 2px 4px -1px rgb(135 132 132 / 20%), 0px 4px 5px 0px rgb(173 169 169 / 14%), 0px 1px 10px 0px rgb(143 135 135 / 12%)!important",
      },
}));


 const AppBarWithHeightAndWindowHeight = (props) => {
  const classes = useStyles();

  const appBarRef = useRef(null);

  const updateAppBarHeightAndWindowHeight = () => {
    props.setWindowHeight(window.innerHeight);
    if (appBarRef.current) {
      props.setAppBarHeight(appBarRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    updateAppBarHeightAndWindowHeight(); // Initial height on mount

    // Update height on resize
    window.addEventListener('resize', updateAppBarHeightAndWindowHeight);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', updateAppBarHeightAndWindowHeight);
    };
  }, []);

  return (
      <AppBar
        position="fixed"
        ref={appBarRef}
        className={classes.appBar}
      >
        {props.children}
      </AppBar>
  );
};
const mapStateToProps = (state) => {
  return { };
};

export default connect(mapStateToProps, {
 setAppBarHeight,
 setWindowHeight
})(AppBarWithHeightAndWindowHeight);
