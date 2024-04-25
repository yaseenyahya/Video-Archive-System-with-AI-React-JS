import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import ResponsiveMenu from '../otherComponents/floatingMenu/ResponsiveMenu';
import { connect } from "react-redux";
import {
  setFoldersMenuBottomHeight
} from "../../store/actions/OtherActions";

const useStyles = makeStyles((theme) => ({
  menuContainer: {
    position: "fixed",
    bottom: 0,
    display: "flex",
    width: "100%",
  }
}));

const FoldersMenuBottomWithHeight = (props) => {
  const classes = useStyles();

  const foldersMenuBottomRef = useRef(null);

  const updateFoldersMenuBottomHeight = () => {
    if (foldersMenuBottomRef.current) {
      props.setFoldersMenuBottomHeight(foldersMenuBottomRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    // Function to update height
    const updateHeight = () => {
      if (foldersMenuBottomRef.current) {
        updateFoldersMenuBottomHeight();
      }
    };

    // Initial height on mount
    updateHeight();

    // Update height on resize
    window.addEventListener('resize', updateHeight);

    // Listen for changes in the content and update height
    const observer = new MutationObserver(updateHeight);
    if (foldersMenuBottomRef.current) {
      observer.observe(foldersMenuBottomRef.current, { childList: true, subtree: true });
    }

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', updateHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={classes.menuContainer} ref={foldersMenuBottomRef}>
      <ResponsiveMenu
      iconMenuColor="white"
        menuWidth={120}
        filesListAndEditorFileListShowDeletedItems={props.filesListAndEditorFileListShowDeletedItems}
        selectedItemId={props.filesListAndEditorSelectedFolderId}
        menuList={props.foldersListMenu} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { ...state.OtherReducer, ...state.FilesListAndEditorReducer };
};

export default connect(mapStateToProps, {
  setFoldersMenuBottomHeight
})(FoldersMenuBottomWithHeight);
