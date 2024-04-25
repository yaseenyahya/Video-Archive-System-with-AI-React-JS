import React from 'react';
import {
  Drawer,

} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import { connect } from 'react-redux';
import {
  setFilesListAndEditorDrawerLastDownX,
  setFilesListAndEditorDrawerIsResizing,
  setFilesListAndEditorDrawerWidth,
} from '../../store/actions/FilesListAndEditorActions';
import LocalStorage from "../../auth/LocalStorage";



const useStyles = makeStyles((theme) => ({
  drawer: {
    width: (state) => state.drawerWidth,
    flexShrink: 0,
    height:  (state) => `calc(100% - ${state.appBarHeight + state.foldersMenuBottomHeight + 1}px)!important`,
    marginTop: (state) => state.appBarHeight,

  },
  drawerPaper: {
    width: (state) => state.drawerWidth,
    height: (state) => `calc(100% - ${state.appBarHeight +state.foldersMenuBottomHeight + 1}px)!important`,
    marginTop: (state) => state.appBarHeight,
  },
  dragger: {
    width: '15px',
    cursor: 'ew-resize',
    position: 'absolute',
    borderLeft: '1px solid white',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: '100',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  draggerMark: {
    width: '5px',
    height: '50px',
    display: 'block',
    backgroundColor: '#8d8d8d',
  },
}));

const ResizableDrawer = (props) => {
 
  const filesListAndEditorDrawerIsResizingRef =  React.useRef(props.filesListAndEditorDrawerIsResizing);
  const classes = useStyles({
    appBarHeight: props.appBarHeight,
    drawerWidth: props.filesListAndEditorDrawerWidth,
    foldersMenuBottomHeight:props.foldersMenuBottomHeight
  });

  const handleMousedown = (e) => {
    props.setFilesListAndEditorDrawerIsResizing(true);
    filesListAndEditorDrawerIsResizingRef.current = true;

    props.setFilesListAndEditorDrawerLastDownX(e.clientX);
  };

  const handleMousemove = (e) => {
    if (!filesListAndEditorDrawerIsResizingRef.current) {
      return;
    }

    const offsetRight =
      document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
    const minWidth = 50;
    const maxWidth = window.innerWidth - (window.innerWidth / 3);

    if (offsetRight > minWidth && offsetRight < maxWidth) {
      props.setFilesListAndEditorDrawerWidth(offsetRight);
      LocalStorage.setFilesEditorDrawerWidth(offsetRight);
    }
  };

  const handleMouseup = () => {
    props.setFilesListAndEditorDrawerIsResizing(false);
    filesListAndEditorDrawerIsResizingRef.current = false;
  };

  React.useEffect(() => {
   const drwaerWidthFromLocalStorage = parseInt(LocalStorage.getFilesEditorDrawerWidth());
    props.setFilesListAndEditorDrawerWidth(drwaerWidthFromLocalStorage ? drwaerWidthFromLocalStorage : window.innerWidth / 2);

    document.addEventListener('mousemove', handleMousemove);
    document.addEventListener('mouseup', handleMouseup);

    return () => {
      document.removeEventListener('mousemove', handleMousemove);
      document.removeEventListener('mouseup', handleMouseup);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={props.filesListAndEditorDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          id="dragger"
          onMouseDown={handleMousedown}
          className={classes.dragger}
        >
          <span className={classes.draggerMark} onMouseDown={handleMousedown}></span>
        </div>
        {props.children}
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { ...state.OtherReducer, ...state.FilesListAndEditorReducer };
};

export default connect(mapStateToProps, {
  setFilesListAndEditorDrawerLastDownX,
  setFilesListAndEditorDrawerIsResizing,
  setFilesListAndEditorDrawerWidth,
})(ResizableDrawer);
