import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from "@mui/material/AppBar";
import { connect } from "react-redux";
import {
 setAppBarHeight
} from "../../store/actions/OtherActions";
const useStyles = makeStyles((theme) => ({
    appBar: {
        background: "white!important",
        boxShadow:
          "0px 2px 4px -1px rgb(135 132 132 / 20%), 0px 4px 5px 0px rgb(173 169 169 / 14%), 0px 1px 10px 0px rgb(143 135 135 / 12%)!important",
      },
}));


 const AppBarWithHeight = (props) => {
  const classes = useStyles();

  const appBarRef = useRef(null);

  const updateAppBarHeight = () => {
    if (appBarRef.current) {
      props.setAppBarHeight(appBarRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    updateAppBarHeight(); // Initial height on mount

    // Update height on resize
    window.addEventListener('resize', updateAppBarHeight);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', updateAppBarHeight);
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
 setAppBarHeight
})(AppBarWithHeight);
